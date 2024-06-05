import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Page_Url } from '../../router/Page_Url';
import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();
const url = '/auth/regenerate';

export function getCookie(name) {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(name))
        ?.split('=')[1];

    return cookieValue ? decodeURIComponent(cookieValue) : null;
}

const refreshValue = getCookie('refresh');
const config = {
    headers: {
        Cookie: `refresh=${refreshValue}`,
    },
};

const regenerate = async (config, success, fail) => {
    return await server.post(`${url}`).then(success).catch(fail);
};

function Redirection() {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 위치 정보를 가져옴

    useEffect(() => {
        //console.log('refresh 쿠키', refreshValue);
        regenerate(
            config,
            (success) => {
                console.log(success);
                const accessToken = success.data.data.accessToken;
                localStorage.setItem('accessToken', accessToken);
                navigate('/main', { replace: true });
            },
            (fail) => {
                console.log(fail);
            }
        );
    }, []);

    // useEffect(() => {
    //     // URLSearchParams를 사용하여 쿼리 파라미터 접근
    //     const queryParams = new URLSearchParams(location.search);
    //     const accessToken = queryParams.get('accessToken');
    //     const refreshToken = queryParams.get('refreshToken');

    //     // localStorage에 토큰 저장
    //     if (accessToken && refreshToken) {
    //         localStorage.setItem('accessToken', accessToken);
    //         localStorage.setItem('refreshToken', refreshToken);

    //         navigate(Page_Url.Main, { replace: true });
    //     }
    // }, [location]);

    return <div>로그인 처리 중입니다...</div>;
}

export default Redirection;

`import useKakaoCallback from "../../../hooks/auth/useKakaoCallback";
function KakaoCallback()
{ useKakaoCallback(); return null; }
export default KakaoCallback;`;
