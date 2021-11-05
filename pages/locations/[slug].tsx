import React from 'react'
import { DocumentRenderer, DocumentRendererProps } from '@keystone-next/document-renderer';
import { GetStaticPathsResult, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import Head from 'next/head'
import { InferRenderersForComponentBlocks } from '@keystone-next/fields-document/component-blocks';
import { componentBlocks } from '../../component-blocks';
import { fetchGraphQL, gql} from '../../utils'
import { ParsedUrlQuery } from 'querystring'

interface IParams extends ParsedUrlQuery {
  slug: string
}
const componentBlockRenderers: InferRenderersForComponentBlocks<typeof componentBlocks> = {
    hero: props => {
      // props will be inferred from your component blocks
      return (
        <div style={{ minHeight: '440px', textAlign: 'center', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(${props.imageSrc})`}}><h1>{props.title}</h1><p>{props.content}</p></div>
      )
      
    },
    infoBanner: props => {

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
        <>
        <Head>
            <link rel="stylesheet" href="https://hootswings.com/_assets/css/styles.css?v=1632236872" />
        </Head>

        <DocumentRenderer document={post.masthead.document} renderers={renderers} componentBlocks={componentBlockRenderers} />;

        <section className="c-feature">
            <div className="c-feature__interior-container">
                <h1>{post.title}</h1>
            <DocumentRenderer document={post.content.document} renderers={renderers} componentBlocks={componentBlockRenderers} />;

            </div>
        </section>

        </>
    )
}

export async function getStaticProps(){
    const query = `query {
      posts {
        content {
          document
        }
      }
    }`
    const res = (await axios({
      url: "https://hoots-backend.herokuapp.com/api/graphql",
      method: "POST",
      data: {
        query: query,
      },
    })) || []
    console.log(res.data.data.posts[0])
    return {
      props: { 
        post: res.data.data.posts[0].content,
        
       },
    }
  }
  
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const data = await fetchGraphQL(gql`
    query {
        posts {
            slug
        }
    }
  `);
    return {
    paths: data.posts.map((post: any) => ({ params: { slug: post.slug } })),
    fallback: 'blocking',
  };
}
// export async function getStaticProps({ params }: GetStaticPropsContext) {
//   // We use (hydrateRelationships: true) to ensure we have the data we need
//   // to render the inline relationships.
//   const data = await fetchGraphQL(
//     gql`
//       query ($slug: String!) {
//         posts(where: { slug: {equals: $slug} }) {
//           id
//           content {
//             document
//           }
//           masthead {
//               document
//           }
//         }
//       }
//     `,
//     { slug: params!.slug }
//   );
//   console.log('slug', data.posts[0])

//   return { props: { post: data.posts[0] }, revalidate: 60 };
// }