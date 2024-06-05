import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();

const url = '/club';

// 클럽 생성 o
const postClubCreate = async (data, success, fail) => {
    return await server.post(`${url}/create`, data).then(success).catch(fail);
};

// 클럽 로고 등록 및 변경
const patchClubLogo = async (clubId, file) => {
    return await server
        .post(`${url}/${clubId}/logo`, file)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 클럽 상세 조회 o
const getClubDetail = async (clubId, success, fail) => {
    return await server.get(`${url}/${clubId}`).then(success).catch(fail);
};

// 나의 클럽 조회 o
const getMyClub = async (success, fail) => {
    return await server.get(`${url}/myClub`).then(success).catch(fail);
};

// 클럽의 클럽원 조회 o
const getClubUsers = async (clubId, success, fail) => {
    return await server.get(`${url}/${clubId}/clubUsers`).then(success).catch(fail);
};

// 클럽 전체 조회 o
const getClubLists = async (success, fail) => {
    return await server.get(`${url}/clubs`).then(success).catch(fail);
};

// 클럽 삭제 o
const deleteClub = async (clubId, success, fail) => {
    return await server.delete(`${url}/delete/${clubId}`).then(success).catch(fail);
};

export { postClubCreate, patchClubLogo, getClubDetail, getClubUsers, getClubLists, deleteClub, getMyClub };
