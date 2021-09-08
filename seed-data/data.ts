const axios = require("axios");
const yextFields =
  "address,description,mainPhone,c_shortDescription,description,c_locationName,c_locationShortName";
async function getYextLocations() {
  const res = await axios.get(query);
  return res;
}

console.log(getYextLocations());
