// Import Node.js’s crypto library.
const crypto = require("crypto");
// Import the API secret.
const { API_SECRET } = require("../config");

const ALGORITHM = "sha512";
const ENCODING = "hex";

function generateSignature(message) {
    // Create the HMAC.
    const hmac = crypto.createHmac(ALGORITHM, API_SECRET);
    // Update HMAC with our message.
    hmac.update(message);

    // Return the encoded HMAC.
    return hmac.digest(ENCODING);
}

// Expose the generateSignature function.
exports.generateSignature = generateSignature;