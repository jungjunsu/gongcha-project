import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();

const url = '/matching/request';

// 매칭 신청
const postMatchingRequest = async (matchingId, success, fail) => {
    return await server.post(`${url}/${matchingId}`).then(success).catch(fail);
};

// 매칭 게시글 신청 목록
const getMatchingRequestLists = async (matchingTeamId) => {
    return await server
        .get(`${url}/${matchingTeamId}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 로그인 팀장이 받은 신청 목록
const getMatchingClubMasterRequestLists = async () => {
    return await server
        .get(`${url}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 매칭 신청 승인
const patchMatchingRequestPermit = async (matchingTeamId, versusTeamId) => {
    return await server
        .patch(`${url}/${matchingTeamId}/${versusTeamId}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 매칭 신청 거절
const patchMatchingRequestDeny = async (matchingTeamId, versusTeamId) => {
    return await server
        .delete(`${url}/${matchingTeamId}/${versusTeamId}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export {
    postMatchingRequest,
    getMatchingRequestLists,
    getMatchingClubMasterRequestLists,
    patchMatchingRequestPermit,
    patchMatchingRequestDeny,
};
