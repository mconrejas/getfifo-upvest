// Import API base URL and version.
const { API_BASE_URL, API_VERSION } = require("../../config");
// Import timestamp-generating function.
const { generateTimestamp } = require("../generateTimestamp");
// Import signature-generating function.
const { generateSignature } = require("../generateSignature");
// Import tenant-message-headers function.
const {
    generateTenantMessageHeaders
} = require("../generateTenantMessageHeaders");
// Import HTTP client adapter.
const { axiosAdapter } = require("../axiosAdapter");

const DEREGISTER_USER_PATH = `/${API_VERSION}/tenancy/users/`;
const RESOURCE_URL = `${API_BASE_URL}${DEREGISTER_USER_PATH}`;
const REQUEST_METHOD = "DELETE";

async function deregisterUser({ username }) {
    // Request path
    const path = `${DEREGISTER_USER_PATH}${username}`;
    // Generate a timestamp to make the API call.
    const timestamp = generateTimestamp();
    // Concatenate pre-hashed message string.
    const preHashedMessage = `${timestamp}${REQUEST_METHOD}${path}`;
    // Generate signature from the pre-hashed message.
    const signature = generateSignature(preHashedMessage);
    // Generate the request headers list.
    const headers = generateTenantMessageHeaders({
        timestamp,
        signature,
        path: path
    });

    // Assemble configuration for axios.
    const axiosConfig = {
        method: REQUEST_METHOD,
        url: `${RESOURCE_URL}${username}`,
        headers,
        // data: messageBody
    };

    // Asynchronously return the result of the call to the API.
    return await axiosAdapter(axiosConfig).then(response => {
        return response;
    });
}

// Expose the `deregisterUser` function.
exports.deregisterUser = deregisterUser;