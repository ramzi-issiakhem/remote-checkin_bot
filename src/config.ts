import dotenv from "dotenv";

dotenv.config();

let {
  DISCORD_TOKEN,
  AUTHORIZED_ROLE_NAMES: ROLE_NAMES,
  CREATED_ROLE_NAME,
  DISCORD_CLIENT_ID,
  GUILD_ID,
  PURGE_AFTER_BOOT: PURGE,
  DEBUG: DEBUG_STR,
  DB_CONNECTION,
  DB_HOST,
  DB_USER_NAME,
  DB_USER_PASSWORD,
  DB_DATABASE_NAME,
  DB_STORAGE_FILE
} = process.env;



if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error("Missing environment variables");
}

if (DB_CONNECTION === 'mysql' && (!DB_HOST || !DB_USER_NAME || !DB_USER_PASSWORD || !DB_DATABASE_NAME)) {
  throw new Error("Missing environment variables for a mysql connection");
}



const isTrue = (value: any) => value === "true" || value === "1"; // Helper function
const PURGE_AFTER_BOOT = isTrue(PURGE);
const DEBUG = isTrue(DEBUG_STR);
const AUTHORIZED_ROLE_NAMES = ROLE_NAMES?.split(',') ?? [CREATED_ROLE_NAME];

export const config = {
  DISCORD_TOKEN,
  DEBUG,
  DISCORD_CLIENT_ID,
  GUILD_ID,
  PURGE_AFTER_BOOT,
  CREATED_ROLE_NAME,
  AUTHORIZED_ROLE_NAMES,
  DB_CONNECTION,
  DB_HOST,
  DB_USER_NAME,
  DB_USER_PASSWORD,
  DB_DATABASE_NAME,
  DB_STORAGE_FILE
};


