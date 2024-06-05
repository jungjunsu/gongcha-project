import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();
const url = '/notification';

async function setToken(data, success, fail) {
    await server.patch(`${url}/token`, data).then(success).catch(fail);
}

async function pushAlarm(data, success, fail) {
    await server.post(`${url}`, data).then(success).catch(fail);
}

export {
    setToken,
    pushAlarm,
};
