import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();
const url = '/transfer';

async function getTransfer(success, fail) {
    await server.get(`${url}`).then(success).catch(fail);
}

export {
    getTransfer,
};
