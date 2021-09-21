import { config } from "@keystone-next/keystone/schema";
import { statelessSessions } from "@keystone-next/keystone/session";
import { createAuth } from "@keystone-next/auth";
import { insertSeedData } from "./seed-data";
import { DATABASE_URL, SESSION_SECRET } from "./config";

import { lists } from "./schema";

let sessionSecret = SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("The SESSION_SECRET environment variable must be set in production");
  } else {
    sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
  }
}

let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "name",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export default withAuth(
  config({
    images: {
      upload: "local",
      local: {
        storagePath: "public/images",
        baseUrl: "/images",
      },
    },
    db: {
      adapter: "prisma_postgresql",
      url: process.env.DATABASE_URL || "postgres://omzwbounlpiqtd:a81d11f0433e8a7189a3d4373ff68ec112e6c6a07af865b408ccf1a80a59c616@ec2-3-225-204-194.compute-1.amazonaws.com:5432/dej8uspfuibv0l",
      async onConnect(context) {
        console.log("Connected to the database!");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(context);
        }
      },
    },
    graphql: {
      apolloConfig: {
        playground: true,
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
