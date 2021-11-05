import { createSchema, list } from "@keystone-next/keystone/schema";
import { text, relationship, password, timestamp, select, checkbox, image, json } from "@keystone-next/fields";
import { document } from "@keystone-next/fields-document";
import { componentBlocks } from "./component-blocks";

export const lists = createSchema({
  User: list({
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password({ isRequired: true }),
    },
    ui: {
      listView: {
        initialColumns: ["name", "email"],
      },
    },
  }),
  Location: list({
    ui: {
      listView: {
        initialColumns: ["c_locationName", "c_oloId", "isVisible", "is_comingSoon", "promo"],
      },
    },
    fields: {
      isVisible: checkbox({ defaultValue: true, label: "Visible on site" }),
      is_comingSoon: checkbox({ defaultValue: false, label: "Coming Soon" }),
      c_comingSoonText: text({ label: "Coming soon text" }),
      c_locationName: text({ isRequired: true, label: "Location Name" }),
      c_locationShortName: text({ label: "Shortened store name" }),
      address: text({ isRequired: true, label: "Street Address" }),
      addressLine2: text({ label: "Line 2" }),
      city: text({ isRequired: true }),
      region: text({ isRequired: true, label: "State" }),
      postalCode: text({ label: "Zip Code" }),
      mainPhone: text({ label: "Phone Number" }),
      c_shortDescription: text({
        label: "Short Description",
        ui: {
          displayMode: "textarea",
        },
      }),
      description: text({
        label: "Description",
        ui: {
          displayMode: "textarea",
        },
      }),
      c_cateringUrl: text({ label: "Catering URL" }),
      orderUrl: text({ label: "Order Online URL" }),
      c_oloId: text({ label: "Olo ID" }),
      c_yextId: text({ label: "Yext ID" }),
      c_masthead: image({ label: "Masthead Image" }),
      promo: relationship({
        ref: "Promo",
        many: false,
      }),
      geocodedCoordinate: json({}),
      timezone: text({}),
      c_locationSlug: text({ label: "Slug" }),
      c_mapUrl: text({ label: "Google Maps URL" }),
      meta: json({}),
      last_modified: timestamp({}),
    },
  }),
  Promo: list({
    ui: {
      listView: {
        initialColumns: ["name", "description", "locations"],
      },
    },
    fields: {
      name: text({ label: "Promotion Name", isRequired: true }),
      description: text({ label: "Promotion Description" }),
      url: text({ label: "Promotion URL" }),
      image: image({ label: "Promotion Image" }),
      alt: text({ label: "Promo Image Alt Text" }),
      locations: relationship({
        ref: "Location",
        many: true,
      }),
    },
  }),
  MenuItem: list({
    fields: {
      image: image({}),
      title: text({}),
      description: text({
        ui: {
          displayMode: "textarea",
        },
      }),
      ctaText: text({}),
      ctaUrl: text({}),
      category: relationship({
        ref: "MenuItemCategory",
        many: false,
      }),
      locationAvailability: relationship({
        ref: "Location",
        many: true,
      }),
    },
  }),
  MenuItemCategory: list({
    fields: {
      name: text({}),
      image: image({}),
      items: relationship({
        ref: "MenuItem",
        many: true,
      }),
    },
  }),
  CalloutTile: list({
    fields: {
      imageLeft: image({}),
      imageRight: image({}),
      headlineLeft: text({}),
      headlineRight: text({}),
      descriptionLeft: text({}),
      descriptionRight: text({}),
      ctaTextLeft: text({}),
      ctaTextRight: text({}),
      ctaUrlLeft: text({}),
      ctaUrlRight: text({}),
    },
  }),
  InfoBanner: list({
    fields: {
      desktopTitle: text({}),
      mobileTitle: text({}),
      location: text({}),
      ctaOne: text({}),
    },
  }),
  Post: list({
    ui: {
      listView: {
        initialColumns: ["title", "slug"],
      },
    },
    fields: {
      masthead: document({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
        ui: {
          views: require.resolve("./component-blocks"),
        },
        componentBlocks,
      }),
      content: document({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [1, 1, 1, 1],
        ],
        ui: {
          views: require.resolve("./component-blocks"),
        },
        componentBlocks,
      }),
      slug: text({}),
      title: text({}),
    },
  }),
  Banner: list({
    fields: {
      title: text({}),
      subTitle: text({}),
      ctas: document({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
      }),
    },
  }),
  // Post: list({
  //   fields: {
  //     name: text({ isRequired: true })
  //   }
  // })
  // Masthead: list({
  //   ui: {
  //     listView: {
  //       initialColumns: ['name', 'description', 'locations'],
  //     },
  //   },
  //   fields: {
  //     name: text({ label: 'Promotion Name', isRequired: true}),
  //     description: text({ label: 'Promotion Description'}),
  //     url: text({ label: 'Promotion URL' }),
  //     image: image({ label: 'Promotion Image' }),
  //     alt: text({ label: 'Promo Image Alt Text' }),
  //     locations: relationship({
  //       ref: 'Location',
  //       many: true
  //     })
  //   }
  // })
});
