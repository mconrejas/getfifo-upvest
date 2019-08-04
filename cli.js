
const minimist = require("minimist");

const INTERPRETER_AND_FILE_ARGS_LENGTH = 2;

const ECHO_MESSAGE_CMD = "echo";
const LIST_USERS_CMD = "users";
const REGISTER_USER_CMD = "user:register";
const DEREGISTER_USER_CMD = "user:deregister";
const OBTAIN_ACCESS_TOKEN_CMD = "auth:token";
const LIST_ASSETS_CMD = "assets";
const GET_ASSETS_CMD = "asset";
const ADD_WALLET_CMD = "wallet:add";
const LIST_WALLETS_CMD = "wallets";
const GET_WALLET_WITH_ID_CMD = "wallet";
const CONDUCT_TRANSACTION_CMD = "tx:conduct";

/* List of conduct transaction arguments to be always treated as strings.
 * This is to prevent minimist converting number-looking arguments to numbers.
 */
const conductTransactionStringArgs = ['access_token', 'password', 'wallet_id', 'asset_id', 'amount', 'fee', 'recipient']

module.exports = () => {
    /* Remove the first arguments because the first argument will always be the
     * interpreter followed by the name of the file being interpreted. We only
     * care about the arguments after that.
     */
    const args = minimist(process.argv.slice(INTERPRETER_AND_FILE_ARGS_LENGTH), { string: conductTransactionStringArgs });
    // Our first argument is now our command.
    const command = args._[0];

    // Act on the command issued.
    switch (command) {
        case ECHO_MESSAGE_CMD: {
            // Lazily import echo message function.
            const { echoMessageUsingGet } = require("./src/commands/echoMessageUsingGet");
            // Get the message from the arguments passed.
            const message = args._[1];
            // Log the result to the console.
            echoMessageUsingGet(message).then(console.log);
            break;
        }
        case LIST_USERS_CMD: {
            // Lazily import the listing users function.
            const { listUsers } = require("./src/commands/listUsers");
            // Get the cursor and page size from the arguments passed.
            const { cursor, page_size: pageSize } = args;
            // Log the result to the console.
            listUsers({ cursor, pageSize }).then(console.log);
            break;
        }
        case REGISTER_USER_CMD: {
            // Lazily import user registration function.
            const { registerUser } = require("./src/commands/registerUser");
            // Extract username and password from the passed arguments.
            const { username, password } = args;
            // Log the result to the console.
            registerUser({ username, password }).then(console.log);
            break;
        }
        case DEREGISTER_USER_CMD: {
            // Lazily import user deregistration function.
            const { deregisterUser } = require("./src/commands/deregisterUser");
            // Get username from the passed arguments.
            const username = args._[1];
            // Log the result to the console.
            deregisterUser({ username }).then(console.log);
            break;
        }
        case OBTAIN_ACCESS_TOKEN_CMD: {
            // Lazily import access token acquisition function.
            const { obtainAccessToken } = require("./src/commands/obtainAccessToken");
            // Extract username and password from the passed arguments.
            const { username, password } = args;
            // Log the result to the console.
            obtainAccessToken({ username, password }).then(console.log);
            break;
        }
        case LIST_ASSETS_CMD: {
            // Lazily import the assets-listing function.
            const { listAssets } = require("./src/commands/listAssets");
            // Get the cursor and page size from the arguments passed.
            const { cursor, page_size: pageSize } = args;
            // Log the result to the console.
            listAssets({ cursor, pageSize }).then(console.log);
            break;
        }
        case GET_ASSETS_CMD: {
            // Lazily import the assets-listing function.
            const { getAsset } = require("./src/commands/getAsset");
            // Get the cursor and page size from the arguments passed.
            const { asset_id: assetId } = args;
            // Log the result to the console.
            getAsset({ assetId }).then(console.log);
            break;
        }
        case ADD_WALLET_CMD: {
            // Lazily import the wallet adding function.
            const { addWallet } = require("./src/commands/addWallet");
            // Get the access token, password, and asset ID from the arguments passed.
            const { access_token: accessToken, password, asset_id: assetId } = args;
            // Log the result to the console.
            addWallet({ accessToken, password, assetId }).then(console.log);
            break;
        }
        case LIST_WALLETS_CMD: {
            // Get the access token, cursor, and page size from the arguments passed.
            const { access_token: accessToken, cursor, page_size: pageSize } = args;

            // Lazily import the wallet-for-user-listing function.
            const { listWallets } = require("./src/commands/listWallets");
            // Log the result to the console.
            listWallets({ accessToken, cursor, pageSize }).then(console.log);

            break;
        }
        case GET_WALLET_WITH_ID_CMD: {
            // Lazily import the wallet-with-id function.
            const { getWallet } = require("./src/commands/getWallet");
            // Get the cursor and page size from the arguments passed.
            const { access_token: accessToken, id } = args;
            // Log the result to the console.
            getWallet({ accessToken, id }).then(console.log);
            break;
        }
        case CONDUCT_TRANSACTION_CMD: {
            // Lazily import the wallet adding function.
            const { conductTransaction } = require("./src/commands/conductTransaction");
            // Get the access token, password, and asset ID from the arguments passed.
            const {
                access_token: accessToken,
                password,
                wallet_id: walletId,
                asset_id: assetId,
                amount,
                fee,
                recipient
            } = args;
            // Log the result to the console.
            conductTransaction({
                accessToken,
                password,
                walletId,
                assetId,
                amount,
                fee,
                recipient
            }).then(console.log);
            break;
        }
        default: {
            console.error(`"${command}" is not a valid command!`);
            break;
        }
    }
};
