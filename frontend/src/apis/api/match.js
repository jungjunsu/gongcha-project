import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();

const url = '/matching';

// 매칭 생성
const postMatchingCreate = async (content, success, fail) => {
    return await server.post(`${url}/create`, content).then(success).catch(fail);
};

// 매칭 목록 조회
const getMatchingList = async (success, fail) => {
    return await server.get(`${url}`).then(success).catch(fail);
};

// 매칭 상세 조회
const getMatchingDetail = async (matchingId, success, fail) => {
    return await server.get(`${url}/${matchingId}`).then(success).catch(fail);
};

// 매칭 정보 수정
const patchMatching = async (matchingId, data) => {
    return await server
        .patch(`${url}/${matchingId}`, data)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 매칭 정보 삭제
const deleteMatching = async (matchingId, success, fail) => {
    return await server.delete(`${url}/${matchingId}`).then(success).catch(fail);
};

// 승인된 매칭 목록 조회
async function getMatchingApproveList(success, fail) {
    await server.get(`${url}/matchList`).then(success).catch(fail);
}

export { 
    postMatchingCreate, 
    getMatchingList, 
    getMatchingDetail, 
    patchMatching, 
    deleteMatching, 
    getMatchingApproveList
};
