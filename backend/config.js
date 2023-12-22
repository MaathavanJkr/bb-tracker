const assert = require("assert");
const dotenv = require("dotenv");

// read in the .env file
dotenv.config();

// capture the environment variables the application needs
const { PORT,
    HOST,
    HOST_URL,
    JWT_SECRET,
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_USER,
    DB_PASS
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");
assert(JWT_SECRET, "JWT_SECRET configuration is required.");

// export the configuration information
module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    jwtSecret: JWT_SECRET,
    sql: {
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS,
        port: DB_PORT
    }
};