const { API_BASE_URL, API_VERSION } = require("../../config");
const { axiosAdapter } = require("../axiosAdapter");

const MESSAGE_HEADER_CONTENT_TYPE = "application/json";
const ADD_WALLET_PATH = `/${API_VERSION}/kms/wallets/`;
const RESOURCE_URL = `${API_BASE_URL}${ADD_WALLET_PATH}`;
const REQUEST_METHOD = "POST";

async function addWallet({ accessToken, password, assetId }) {
    // Assign payload body with username and password.
    const payloadBody = {
        password,
        asset_id: assetId
    };
    // Write payload body as string.
    const messageBody = JSON.stringify(payloadBody);
    // Generate the request headers list.
    const headers = {
        Authorization: `Bearer ${accessToken}`,
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

exports.addWallet = addWallet;