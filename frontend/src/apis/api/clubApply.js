import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();

const url = '/club/applies';

// 클럽 신청 조회 o
const getClubApplies = async (clubId, success, fail) => {
    return await server.get(`${url}/${clubId}`).then(success).catch(fail);
};

// 클럽 신청 o
const postClubApply = async (clubId, content, success, fail) => {
    return await server.post(`${url}/${clubId}`, content).then(success).catch(fail);
};

// 클럽 신청 승인 o
const postClubApplyPermit = async (clubId, applyId, success, fail) => {
    return await server.post(`${url}/${clubId}/${applyId}/permit`).then(success).catch(fail);
};

// 클럽 신청 거절 o
const postClubApplyDeny = async (clubId, applyId, success, fail) => {
    return await server.post(`${url}/${clubId}/${applyId}/deny`).then(success).catch(fail);
};

export { getClubApplies, postClubApply, postClubApplyPermit, postClubApplyDeny };
