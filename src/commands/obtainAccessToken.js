const {
    API_BASE_URL,
    API_VERSION,
    OAUTH2_CLIENT_ID,
    OAUTH2_CLIENT_SECRET
} = require("../../config");
const { axiosAdapter } = require("../axiosAdapter");

const OAUTH2_GRANT_TYPE = "password";
const OAUTH2_SCOPE = "read write echo wallet transaction";
const MESSAGE_HEADER_CONTENT_TYPE = "application/x-www-form-urlencoded";
const OBTAIN_ACCESS_TOKEN_PATH = `/${API_VERSION}/clientele/oauth2/token`;
const RESOURCE_URL = `${API_BASE_URL}${OBTAIN_ACCESS_TOKEN_PATH}`;
const REQUEST_METHOD = "POST";

async function obtainAccessToken({ username, password }) {
    // Assign payload body with username and password.
    const payloadBody = {
        grant_type: OAUTH2_GRANT_TYPE,
        scope: OAUTH2_SCOPE,
        client_id: OAUTH2_CLIENT_ID,
        client_secret: OAUTH2_CLIENT_SECRET,
        username,
        password
    };
    // Write payload body as URL encoded string.
    const messageBody = new URLSearchParams(payloadBody).toString();
    // Generate the request headers list.
    const headers = {
        "Content-Type": MESSAGE_HEADER_CONTENT_TYPE
    };
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

exports.obtainAccessToken = obtainAccessToken;