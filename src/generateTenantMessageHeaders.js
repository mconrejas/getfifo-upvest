// Import API key and passphrase.
const { API_KEY, API_PASSPHRASE } = require("../config");

function generateTenantMessageHeaders({ timestamp, signature, path }) {
    // Create the message headers list.
    const headers = {
        "Content-Type": "application/json",
        "X-UP-API-Key": API_KEY,
        "X-UP-API-Passphrase": API_PASSPHRASE,
        "X-UP-API-Timestamp": timestamp,
        "X-UP-API-Signature": signature,
        "X-UP-API-Signed-Path": path
    };

    // Return the message headers list.
    return headers;
}

// Expose the `generateTenantMessageHeaders` function.
exports.generateTenantMessageHeaders = generateTenantMessageHeaders;