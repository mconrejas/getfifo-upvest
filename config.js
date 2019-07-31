const dotenv = require("dotenv");

// Read environment variables from the `.env` file.
dotenv.config();

// Expose consolidated environment variables.
module.exports = {
    API_BASE_URL: process.env.API_BASE_URL,
    API_VERSION: process.env.API_VERSION,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    API_PASSPHRASE: process.env.API_PASSPHRASE,
    OAUTH2_CLIENT_ID: process.env.OAUTH2_CLIENT_ID,
    OAUTH2_CLIENT_SECRET: process.env.OAUTH2_CLIENT_SECRET
};