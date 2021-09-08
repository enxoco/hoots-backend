import { KeystoneContext } from "@keystone-next/types";
// import { locations } from "./data";
import axios from "axios";
const yextFields =
  "address,description,mainPhone,c_shortDescription,description,c_locationName,c_locationShortName,geocodedCoordinate";
const query = `https://api.yext.com/v2/accounts/me/entities?api_key=bc275d4d9487c19916b70ef74134cf5d&v=20210503&filter=%7B%22name%22%3A%7B%22%24contains%22%3A%22Hoots%22%7D%7D`;
export async function insertSeedData({ prisma }: KeystoneContext) {
  const res = await axios.get(query);
  //   console.log(res.data.response.entities);
  const locations = res.data.response.entities;
  console.log(`🌱 Inserting Seed Data: ${locations.length} Locations`);

  for (const location of locations) {
    console.log(`  🛍️ Adding Location: ${location.c_locationName}`);
    // Map yext fields
    const {
      c_locationName,
      mainPhone,
      description,
      c_locationShortName,
      geocodedCoordinate,
      locationSlug,
      mapUrl,
    } = location;
    let locationData = {
      c_locationName,
      address: location.address.line1,
      city: location.address.city,
      region: location.address.region,
      mainPhone,
      description,
      c_locationShortName,
      geocodedCoordinate,
      locationSlug,
      mapUrl,
      postalCode: location.address.postalCode,
      orderUrl: location.orderUrl ? location.orderUrl.url : null,
    };
    await prisma.location.create({ data: locationData });
  }
  console.log(`✅ Seed Data Inserted: ${locations.length} Locations`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
