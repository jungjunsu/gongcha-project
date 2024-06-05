import Lottie from 'react-lottie';

const { VITE_AUTH_URL } = import.meta.env;

import logo from '@/assets/icons/logo.svg';
import kakaologin from '@/assets/icons/kakaologin.svg';
import naverlogin from '@/assets/icons/naverlogin.svg';
import googlelogin from '@/assets/icons/googlelogin.svg';
import teamAnimation from '@/assets/lotties/teamAnimation';

function LoginPage() {
    const onKakakoLogin = async () => {
        window.location.href = `${VITE_AUTH_URL}/kakao`;
    };

    const onGoogleLogin = () => {
        window.location.href = `${VITE_AUTH_URL}/google`;
    };

    return (
        <div className="h-screen bg-grass-pattern">
            <div className="flex flex-col items-center justify-between">
                <img src={logo} alt="서비스 로고" className="pt-4 pl-4 w-52 h-52" />
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: teamAnimation,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                        },
                    }}
                    width={250}
                    height={250}
                />
                <div className="mt-10">
                    <img src={kakaologin} alt="카카오 로그인 버튼" className="pt-4 pl-4 " onClick={onKakakoLogin} />
                    <img src={googlelogin} alt="구글 로그인 버튼" className="pt-4 pl-4 " onClick={onGoogleLogin} />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
