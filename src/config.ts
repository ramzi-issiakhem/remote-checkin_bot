import dotenv from "dotenv";

dotenv.config();

let { DISCORD_TOKEN, DISCORD_CLIENT_ID, GUILD_ID, PURGE_AFTER_BOOT: PURGE} = process.env;


if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error("Missing environment variables");
}

const isTrue = (value : any) => value === "true" || value === "1"; // Helper function
const PURGE_AFTER_BOOT  = isTrue(PURGE);

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  GUILD_ID,
  PURGE_AFTER_BOOT
};


