export const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  require("crypto")
    .randomBytes(32)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]+/g, "");

export const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.USER}@localhost/keystone-6-example`;
