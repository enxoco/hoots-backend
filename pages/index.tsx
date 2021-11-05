import React from 'react'
import { DocumentRenderer, DocumentRendererProps } from '@keystone-next/document-renderer';
import { GetStaticPathsResult, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { InferRenderersForComponentBlocks } from '@keystone-next/fields-document/component-blocks';
import { componentBlocks } from '../component-blocks';
import { fetchGraphQL, gql} from '../utils'
const componentBlockRenderers: InferRenderersForComponentBlocks<typeof componentBlocks> = {
    hero: props => {
      // props will be inferred from your component blocks
      return (
        <div style={{ minHeight: '300px', textAlign: 'center', backgroundImage: `url(${props.imageSrc})`}}><h1>{props.title}</h1><p>{props.content}</p></div>
      )
    },
    infoBanner: props => {
      return (
        <div className="c-feature__promo-banner-container">
          <div className="c-feature__promo-banner">
              <h2 className="c-feature__promo-banner-title show--desktop text-color--blue">
                {props.titleDesktop}
              </h2>
              <h2 className="c-feature__promo-banner-title show--mobile text-color--blue">
              {props.titleMobile}
            </h2>
              
              <p className="c-feature__promo-banner-description text-color--brown">{props.location}</p>
              <div className="c-feature__promo-banner_cta__wrapper">
                <a href={props.ctaOne.value?.href} className="c-feature__promo-banner-cta c-cta c-cta--shadow">{props.ctaOne.value?.text}</a>
                <a href={props.ctaTwo.value?.href} className="c-feature__promo-banner-cta c-cta c-cta--shadow">{props.ctaTwo.value?.text}</a>
              </div>
          </div>
        </div>
      )

    }
  };

  const renderers: DocumentRendererProps['renderers'] = {
    // Render heading blocks
    block: {
      heading({ level, children, textAlign }) {
        const Comp = `h${level}` as const;
        return <Comp style={{ textAlign, textTransform: 'uppercase' }}>{children}</Comp>;
      },
    },
    // Render inline relationships
    inline: {
      relationship({ relationship, data }) {
        // If there is more than one inline relationship defined on the document
        // field we need to handle each of them separately by checking the `relationship` argument.
        // It is good practice to include this check even if you only have a single inline relationship.
        if (relationship === 'mention') {
          if (data === null || data.data === undefined) {
            // data can be null if the content writer inserted a mention but didn't select an author to mention.
            // data.data can be undefined if the logged in user does not have permission to read the linked item
            // or if the linked item no longer exists.
            return <span>[unknown author]</span>;
          } else {
            // If the data exists then we render the mention as a link to the author's bio.
            // We have access to `id` an `name` fields here because we named them in the
            // `selection` config argument.
            return <Link href={`/author/${data.data.id}`}>{data.data.name}</Link>;
          }
        }
        return null;
      },
    },
  };
  
export default function Index({post}: any) {
    return (
        <div>
            <DocumentRenderer document={post.content.document} renderers={renderers} componentBlocks={componentBlockRenderers} />;
        </div>
    )
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  // We use (hydrateRelationships: true) to ensure we have the data we need
  // to render the inline relationships.
  const data = await fetchGraphQL(
    gql`
      query {
        posts(where: { slug: {equals: "home-page"} }) {
          id
          content {
            document
          }
        }
      }
    `,
    
  );
  console.log('slug', data.posts[0])

  return { props: { post: data.posts[0] }, revalidate: 60 };
}