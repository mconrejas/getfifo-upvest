const { API_BASE_URL, API_VERSION } = require("../../config");
const { generateTimestamp } = require("../generateTimestamp");
const { generateSignature } = require("../generateSignature");
const { generateTenantMessageHeaders } = require("../generateTenantMessageHeaders");
const { axiosAdapter } = require("../axiosAdapter");

const GET_ASSETS_PATH = `/${API_VERSION}/assets/`;
const REQUEST_METHOD = "GET";

async function getAsset({ assetId }) {
    // Generate a timestamp to make the API call.
    const timestamp = generateTimestamp();

    // Assemble path with uri-encoded query parameters.
    const path = `${GET_ASSETS_PATH}${assetId}`;
    
    // Concatenate pre-hashed message string.
    const preHashedMessage = `${timestamp}${REQUEST_METHOD}${path}`;
    
    // Generate signature from the pre-hashed message.
    const signature = generateSignature(preHashedMessage);
    
    // Generate the request headers list.
    const headers = generateTenantMessageHeaders({
        timestamp,
        signature,
        path
    });
    
    // Assemble resource URL.
    const resourceUrl = `${API_BASE_URL}${path}`;
    
    // Assemble configuration for axios.
    const axiosConfig = {
        method: REQUEST_METHOD,
        url: resourceUrl,
        headers
    };

    // Asynchronously return the result of the call to the API.
    return await axiosAdapter(axiosConfig).then(response => {
        return response;
    });
}

exports.getAsset = getAsset;