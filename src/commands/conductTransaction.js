const { API_BASE_URL, API_VERSION } = require("../../config");
const { axiosAdapter } = require("../axiosAdapter");

const MESSAGE_HEADER_CONTENT_TYPE = "application/json";
const REQUEST_METHOD = "POST";

async function conductTransaction({
    accessToken,
    password,
    walletId,
    assetId,
    amount,
    fee,
    recipient
}) {
    // Assign payload body with username and password.
    const payloadBody = {
        password: password,
        asset_id: assetId,
        quantity: `${amount}`, // 0.1 ETH * 10^18 = 1000000000000000000
        fee: `${fee}`, // 0.0013 ETH * 10^18 = 1300000000000000
        recipient: recipient
    };

    //1500000000000000000

    // Write payload body as string.
    const messageBody = JSON.stringify(payloadBody);
    // Generate the request headers list.
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": MESSAGE_HEADER_CONTENT_TYPE
    };
    // Assemble configuration for axios.
    const TX_PATH = `kms/wallets/${walletId}/transactions/`;
    const RESOURCE_URL = `${API_BASE_URL}/${API_VERSION}/${TX_PATH}`;
    const axiosConfig = {
        method: REQUEST_METHOD,
        url: RESOURCE_URL,
        headers,
        data: messageBody
    };

    console.log(axiosConfig);

    // Asynchronously return the result of the call to the API.
    return await axiosAdapter(axiosConfig).then(response => {
        return response;
    });
}

exports.conductTransaction = conductTransaction;
