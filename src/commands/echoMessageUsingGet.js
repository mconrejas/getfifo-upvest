// Import API base URL and version.
const { API_BASE_URL, API_VERSION } = require("../../config");
// Import timestamp-generating function.
const { generateTimestamp } = require("../generateTimestamp");
// Import signature-generating function.
const { generateSignature } = require("../generateSignature");
// Import tenant-message-headers-generating function.
const {
    generateTenantMessageHeaders
} = require("../generateTenantMessageHeaders");
// Import HTTP client adapter.
const { axiosAdapter } = require("../axiosAdapter");

const ECHO_MESSAGE_PATH = `/${API_VERSION}/tenancy/echo-signed`;
const RESOURCE_URL = `${API_BASE_URL}${ECHO_MESSAGE_PATH}`;
const REQUEST_METHOD = "GET";

async function echoMessageUsingGet(message) {
    // Generate a timestamp to make the API call.
    const timestamp = generateTimestamp();
    // Assemble URI encoded query parameters.
    const queryParams = `echo=${encodeURIComponent(message)}`;
    // Assemble path with query parameters.
    const path = `${ECHO_MESSAGE_PATH}?${queryParams}`;
    // Concatenate pre-hashed message string.
    const preHashedMessage = `${timestamp}${REQUEST_METHOD}${path}`;
    // Generate signature from the pre-hashed message.
    const signature = generateSignature(preHashedMessage);
    // Generate the request headers list.
    const headers = generateTenantMessageHeaders({ timestamp, signature, path });
    // Assemble configuration for axios.
    const axiosConfig = {
        method: REQUEST_METHOD,
        url: `${RESOURCE_URL}?${queryParams}`,
        headers
    };

    // Asynchronously return the result of the call to the API.
    return await axiosAdapter(axiosConfig).then(response => {
        return response;
    });
}

// Expose the `echoMessageUsingGet` function.
exports.echoMessageUsingGet = echoMessageUsingGet;
