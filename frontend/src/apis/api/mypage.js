import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();
const url = '/users';

async function setProfileNickName(data, success, fail) {
    await server.patch(`${url}/nickname`, data).then(success).catch(fail);
}

async function getProfileImage(success, fail) {
    await server.get(`${url}/profile`).then(success).catch(fail);
}

async function getProfileImage2(userId, success, fail) {
    await server.get(`${url}/profile/${userId}`).then(success).catch(fail);
}

async function getManner(userId, success, fail) {
    await server.get(`${url}/manner/${userId}`).then(success).catch(fail);
}

async function getPlayScheduleList(userId, success, fail) {
    await server.get(`${url}/${userId}/group`).then(success).catch(fail);
}

async function getNotice(success, fail) {
    await server.get(`${url}/notice`).then(success).catch(fail);
}

async function setRating(data, success, fail) {
    await server.patch(`${url}/card/$`, data).then(success).catch(fail);
}

async function getMyCard(success, fail) {
    await server.get(`${url}/card`).then(success).catch(fail);
}

async function getPlayerCard(userId, success, fail) {
    await server.get(`${url}/card/${userId}`).then(success).catch(fail);
}

async function setReport(userId, success, fail) {
    await server.patch(`${url}/report/${userId}`).then(success).catch(fail);
}

async function setEvaluation(data, success, fail) {
    await server.put(`${url}/card`, data).then(success).catch(fail);
}

export {
    setProfileNickName,
    getProfileImage,
    getProfileImage2,
    getManner,
    getPlayScheduleList,
    getNotice,
    setRating,
    getMyCard,
    getPlayerCard,
    setReport,
    setEvaluation,
};
