import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();

const url = '/team';

async function getMyTeam(success, fail) {
    await server.get(`${url}/myTeam`).then(success).catch(fail);
}

async function createTeam(data, success, fail) {
    await server.post(`${url}`, data).then(success).catch(fail);
}

async function getTeamList(success, fail) {
    await server.get(`${url}`).then(success).catch(fail);
}

async function getTeamInfo(teamId, success, fail) {
    await server.get(`${url}/${teamId}`).then(success).catch(fail);
}

async function getMyTeamInfo(success, fail) {
    await server.get(`${url}`).then(success).catch(fail);
}

async function updateTeamInfo(teamId, data, success, fail) {
    await server.patch(`${url}/${teamId}`, data).then(success).catch(fail);
}

async function deleteTeamInfo(teamId, success, fail) {
    await server.delete(`${url}/${teamId}`).then(success).catch(fail);
}

async function reqPlayerToTeam(teamId, userId, success, fail) {
    await server.post(`${url}/${teamId}/${userId}`).then(success).catch(fail);
}

async function getPlayerToTeamRequest(teamId, success, fail) {
    await server.get(`${url}/request/${teamId}`).then(success).catch(fail);
}

async function acceptPlayerToTeam(teamId, userId, success, fail) {
    await server.patch(`${url}/${teamId}/${userId}`).then(success).catch(fail);
}

async function denyPlayerToTeamRequest(teamId, userId, success, fail) {
    await server.delete(`${url}/${teamId}/${userId}`).then(success).catch(fail);
}

async function endTeamRecruit(teamId, success, fail) {
    await server.patch(`${url}/close/${teamId}`).then(success).catch(fail);
}

async function getPlayerList(teamId, success, fail) {
    await server.get(`${url}/${teamId}/teammates`).then(success).catch(fail);
}

async function getPlayerCardList(teamId, success, fail) {
    await server.get(`${url}/${teamId}/teammates/cards`).then(success).catch(fail);
}

export {
    createTeam,
    getTeamList,
    getTeamInfo,
    getMyTeamInfo,
    updateTeamInfo,
    deleteTeamInfo,
    reqPlayerToTeam,
    getPlayerToTeamRequest,
    acceptPlayerToTeam,
    denyPlayerToTeamRequest,
    endTeamRecruit,
    getPlayerList,
    getPlayerCardList,
    getMyTeam,
};
