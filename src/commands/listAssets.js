const { API_BASE_URL, API_VERSION } = require("../../config");
const { generateTimestamp } = require("../generateTimestamp");
const { generateSignature } = require("../generateSignature");
const { generateTenantMessageHeaders } = require("../generateTenantMessageHeaders");
const { axiosAdapter } = require("../axiosAdapter");

const LIST_ASSETS_PATH = `/${API_VERSION}/assets/`;
const REQUEST_METHOD = "GET";

async function listAssets({ cursor, pageSize }) {
    // Generate a timestamp to make the API call.
    const timestamp = generateTimestamp();
    // URI encode cursor query parameter.
    const cursorQueryParam = cursor ? `cursor=${encodeURIComponent(cursor)}` : "";
    // URI encode page size query parameter.
    const pageSizeQueryParam = pageSize
        ? `page_size=${encodeURIComponent(pageSize)}`
        : "";
    // Assemble query parameters.
    const queryParams = `${cursorQueryParam}&${pageSizeQueryParam}`;
    // Assemble path with uri-encoded query parameters.
    const path = `${LIST_ASSETS_PATH}?${queryParams}`;
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

exports.listAssets = listAssets;