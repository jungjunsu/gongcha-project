import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();
const url = '/auth';

async function getAPIforAuthUserInfo(success, fail) {
    await server.get(`${url}/userInfo`).then(success).catch(fail);
}

async function getAPIforAuthUserInfoById(userId, success, fail) {
    await server.get(`${url}/userInfo/${userId}`).then(success).catch(fail);
}

export {
    getAPIforAuthUserInfo,
    getAPIforAuthUserInfoById,
};
