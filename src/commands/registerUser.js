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

const REGISTER_USER_PATH = `/${API_VERSION}/tenancy/users/`;
const RESOURCE_URL = `${API_BASE_URL}${REGISTER_USER_PATH}`;
const REQUEST_METHOD = "POST";

async function registerUser({ username, password }) {
    // Generate a timestamp to make the API call.
    const timestamp = generateTimestamp();
    // Assign payload body with username and password.
    const payloadBody = { username, password };
    // Write payload body as string.
    const messageBody = JSON.stringify(payloadBody);
    // Concatenate pre-hashed message string.
    const preHashedMessage = `${timestamp}${REQUEST_METHOD}${REGISTER_USER_PATH}${messageBody}`;
    // Generate signature from the pre-hashed message.
    const signature = generateSignature(preHashedMessage);
    // Generate the request headers list.
    const headers = generateTenantMessageHeaders({
        timestamp,
        signature,
        path: REGISTER_USER_PATH
    });
    // Assemble configuration for axios.
    const axiosConfig = {
        method: REQUEST_METHOD,
        url: RESOURCE_URL,
        headers,
        data: messageBody
    };

    // Asynchronously return the result of the call to the API.
    return await axiosAdapter(axiosConfig).then(response => {
        return response;
    });
}

// Expose the `registerUser` function.
exports.registerUser = registerUser;