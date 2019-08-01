const { API_BASE_URL, API_VERSION } = require("../../config");
const { axiosAdapter } = require("../axiosAdapter");

const MESSAGE_HEADER_CONTENT_TYPE = "application/json";
const GET_WALLETS_PATH = `/${API_VERSION}/kms/wallets/`;
const RESOURCE_URL = `${API_BASE_URL}${GET_WALLETS_PATH}`;
const REQUEST_METHOD = "GET";

async function listWallets({ accessToken }) {
    // Generate the request headers list.
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": MESSAGE_HEADER_CONTENT_TYPE
    };
    // Assemble configuration for axios.
    const axiosConfig = {
        method: REQUEST_METHOD,
        url: RESOURCE_URL,
        headers
    };

    // Asynchronously return the result of the call to the API.
    return await axiosAdapter(axiosConfig).then(response => {
        return response;
    });
}

exports.listWallets = listWallets;