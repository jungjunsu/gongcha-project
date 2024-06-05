import { serverAxios } from '@/apis/util/commons';

export const setProfileImageAPI = async (file, successCallback, errorCallback) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const axiosInstance = serverAxios();
        const response = await axiosInstance.patch('users/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        successCallback(response.data);
    } catch (error) {
        errorCallback(error);
    }
};
