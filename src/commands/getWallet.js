const { API_BASE_URL, API_VERSION } = require("../../config");
const { axiosAdapter } = require("../axiosAdapter");

const MESSAGE_HEADER_CONTENT_TYPE = "application/json";
const GET_WALLET_PATH = `/${API_VERSION}/kms/wallets/`;
const RESOURCE_URL = `${API_BASE_URL}${GET_WALLET_PATH}`;
const REQUEST_METHOD = "GET";

async function getWallet({ accessToken, walletId }) {
    // Assemble path with uri-encoded query parameters.
    const resourceUrl = `${RESOURCE_URL}${walletId}`;

    // Generate the request headers list.
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": MESSAGE_HEADER_CONTENT_TYPE
    };
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

exports.getWallet = getWallet;