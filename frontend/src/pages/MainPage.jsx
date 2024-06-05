import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import { FullpageContainer, FullpageSection } from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';

import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';

import logo from '@/assets/icons/logo.svg';
import clubFC from '@/assets/icons/clubFC.svg';
import matchingVS from '@/assets/icons/matchingVS.svg';
import playerMarket from '@/assets/icons/playerMarket.svg';
import playScheduleIcon from '@/assets/icons/playSchedule.svg';
import playHistoryIcon from '@/assets/icons/playHistory.svg';
import alarmIcon from '@/assets/icons/alarm.svg';
import playerCardAnimation from '@/assets/lottie/playercard';

import rArrowIcon from '@/assets/icons/rArrow.svg';

//import teamAnimation from '@/assets/lotties/teamAnimation';
import playerContract from '@/assets/images/mainpage/playerContract.png';
import matchAnimation from '@/assets/lotties/matchAnimation';
import clubLogoAnimation from '@/assets/lotties/clubLogoAnimation';
import makingTeam from '@/assets/images/mainpage/makingTeam.png';
import pastRecord from '@/assets/images/mainpage/pastRecord.png';
import myPlayerCard from '@/assets/images/mainpage/myPlayerCard.png';
import alarmAnimation from '@/assets/lotties/alarmAnimation';

const { VITE_AUTH_URL } = import.meta.env;

function MainTestPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();

    const handleMoveMarket = () => {
        navigate('/market/board');
    };
    const handleMoveMatch = () => {
        navigate('/findmatch/board');
    };
    const handleMoveClub = () => {
        navigate('/club');
    };
    const handlePlayScheduleClick = () => {
        navigate('/mypage/playschedule');
    };
    const handlePlayHistoryClick = () => {
        navigate('/mypage/playhistory');
    };
    const handlePlayerCardClick = () => {
        navigate('/mypage/playercard');
    };
    const handleAlarmClick = () => {
        navigate('/alarm');
    };

    return (
        <div className="w-full">
            <FullpageContainer
                className="w-full "
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                transitionDuration={500}
            >
                <FullpageSection>
                    <div className="w-full text-white bg-grass-pattern">
                        <img src={logo} alt="서비스 로고" className="pt-4 pl-4" />
                        <div
                            className="flex flex-col items-center justify-center mt-24 "
                            onClick={() => handleMoveMarket()}
                        >
                            <img src={playerContract} alt="이적 시장 사진" className="rounded-lg w-60 h-60" />
                            <div className="mt-4 text-base text-center w-60 font-gmarketSansRegular">
                                근처에서 활동하는 풋살 선수들을 둘러보고 동료로 만드세요!
                            </div>
                            <div className="flex flex-row justify-around mt-2 text-black transition duration-100 ease-in-out transform bg-white rounded-lg w-60 active:bg-gray-300 active:scale-90 active:rounded-lg">
                                <div className="my-auto">
                                    <img className="w-6 h-6" src={playerMarket} alt="이적 시장" />
                                </div>
                                <div className="mt-2 text-lg font-gmarketSansBold">이적시장</div>
                                <img className="right-0 inline" src={rArrowIcon} alt="오른쪽 화살표" />
                            </div>
                        </div>
                        <div className="flex justify-center mt-16 animate-bounce">
                            <MdOutlineKeyboardDoubleArrowDown size={50} />
                        </div>
                    </div>
                </FullpageSection>
                <FullpageSection>
                    <div
                        className="flex flex-col items-center justify-center w-full "
                        onClick={() => handleMoveMatch()}
                    >
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: matchAnimation,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice',
                                },
                            }}
                            width={250}
                            height={250}
                        />
                        <div className="text-base text-center w-60 font-gmarketSansRegular">
                            풋살 경기할 상대방 팀을 찾고
                            <br /> 연락을 취해보세요!
                        </div>
                        <div className="flex flex-row justify-between transition duration-100 ease-in-out transform w-60 active:bg-gray-300 active:scale-90 active:rounded-lg">
                            <div className="my-auto">
                                <img className="w-6 h-6" src={matchingVS} alt="매칭 해요" />
                            </div>
                            <div className="mt-2 text-lg font-gmarketSansBold">매칭해요</div>
                            <img className="right-0 inline" src={rArrowIcon} alt="오른쪽 화살표" />
                        </div>
                        <div className="flex justify-center mt-16 animate-bounce">
                            <MdOutlineKeyboardDoubleArrowDown size={50} />
                        </div>
                    </div>
                </FullpageSection>
                <FullpageSection>
                    <div
                        className="flex flex-col items-center justify-center w-full text-white bg-grass-pattern "
                        onClick={() => handleMoveClub()}
                    >
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: clubLogoAnimation,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice',
                                },
                            }}
                            width={250}
                            height={250}
                        />
                        <div className="w-64 mt-2 text-base text-center font-gmarketSansRegular">
                            보다 전문적으로 풋살을 즐기고
                            <br /> 싶다면 클럽을 만들거나 가입하세요!
                        </div>
                        <div className="flex flex-row justify-around mt-4 text-black transition duration-100 ease-in-out transform bg-white rounded-lg w-60 active:bg-gray-300 active:scale-90 active:rounded-lg">
                            <div className="my-auto">
                                <img className="w-6 h-6" src={clubFC} alt="클럽" />
                            </div>
                            <div className="mt-2 text-lg font-gmarketSansBold">클럽</div>
                            <img className="right-0 inline" src={rArrowIcon} alt="오른쪽 화살표" />
                        </div>
                        <div className="flex justify-center mt-16 animate-bounce">
                            <MdOutlineKeyboardDoubleArrowDown size={50} />
                        </div>
                    </div>
                </FullpageSection>
                <FullpageSection>
                    <div
                        className="flex flex-col items-center justify-center w-full "
                        onClick={() => handlePlayScheduleClick()}
                    >
                        <img src={makingTeam} alt="현재 진행중인 팀" className="rounded-lg w-60 h-60" />
                        <div className="mt-4 text-base text-center w-60 font-gmarketSansRegular">
                            현재 만들어진 팀을 살펴보세요
                            <br />
                            <div className="text-sm">
                                최소 4명에서 최대 7명까지 <br />
                                팀을 꾸릴 수 있어요
                            </div>
                        </div>
                        <div className="flex flex-row justify-around mt-2 text-black transition duration-100 ease-in-out transform bg-white rounded-lg w-60 active:bg-gray-300 active:scale-90 active:rounded-lg">
                            <div className="my-auto">
                                <img className="w-6 h-6" src={playScheduleIcon} alt="현재 진행중인 팀" />
                            </div>
                            <div className="mt-2 text-lg font-gmarketSansBold">현재 진행중인 팀</div>
                            <img className="right-0 inline" src={rArrowIcon} alt="오른쪽 화살표" />
                        </div>
                        <div className="flex justify-center mt-16 animate-bounce">
                            <MdOutlineKeyboardDoubleArrowDown size={50} />
                        </div>
                    </div>
                </FullpageSection>
                <FullpageSection>
                    <div
                        className="flex flex-col items-center justify-center w-full text-white bg-grass-pattern"
                        onClick={() => handlePlayHistoryClick()}
                    >
                        <img src={pastRecord} alt="경기 내역" className="rounded-lg w-60 h-60" />
                        <div className="mt-4 text-base text-center w-60 font-gmarketSansRegular">
                            지난 경기 내역을 볼 수 있어요
                        </div>
                        <div className="flex flex-row justify-around mt-2 text-black transition duration-100 ease-in-out transform bg-white rounded-lg w-60 active:bg-gray-300 active:scale-90 active:rounded-lg">
                            <div className="my-auto">
                                <img className="w-6 h-6" src={playHistoryIcon} alt="경기 내역" />
                            </div>
                            <div className="mt-2 text-lg font-gmarketSansBold">경기 내역</div>
                            <img className="right-0 inline" src={rArrowIcon} alt="오른쪽 화살표" />
                        </div>
                        <div className="flex justify-center mt-16 animate-bounce">
                            <MdOutlineKeyboardDoubleArrowDown size={50} />
                        </div>
                    </div>
                </FullpageSection>
                <FullpageSection>
                    <div className="flex items-center justify-center w-full ">
                        <div
                            className="flex flex-col items-center justify-center w-full "
                            onClick={() => handlePlayerCardClick()}
                        >
                            <img src={myPlayerCard} alt="내 선수카드" className="rounded-lg w-60 h-60" />
                            <div className="mt-4 text-base text-center w-60 font-gmarketSansRegular">
                                나의 선수카드를 확인하고 <br />
                                자신의 능력치를 확인할 수 있어요
                            </div>
                            <div className="flex flex-row justify-around mt-2 text-black transition duration-100 ease-in-out transform bg-white rounded-lg w-60 active:bg-gray-300 active:scale-90 active:rounded-lg">
                                <div className="my-auto">
                                    <Lottie
                                        options={{
                                            loop: true,
                                            autoplay: true,
                                            animationData: playerCardAnimation,
                                            rendererSettings: {
                                                preserveAspectRatio: 'xMidYMid slice',
                                            },
                                        }}
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                <div className="mt-2 text-lg font-gmarketSansBold">내 선수카드</div>
                                <img className="right-0 inline" src={rArrowIcon} alt="오른쪽 화살표" />
                            </div>
                            <div className="flex justify-center mt-16 animate-bounce">
                                <MdOutlineKeyboardDoubleArrowDown size={50} />
                            </div>
                        </div>
                    </div>
                </FullpageSection>
                <FullpageSection>
                    <div className="flex items-center justify-center w-full ">
                        <div
                            className="flex flex-col items-center justify-center w-full "
                            onClick={() => handleAlarmClick()}
                        >
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: alarmAnimation,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice',
                                    },
                                }}
                                width={250}
                                height={250}
                            />
                            <div className="mt-4 text-base text-center w-60 font-gmarketSansRegular">
                                나에게 온 알림들을 확인 해보세요
                            </div>
                            <div className="flex flex-row justify-around mt-2 text-black transition duration-100 ease-in-out transform bg-white rounded-lg w-60 active:bg-gray-300 active:scale-90 active:rounded-lg">
                                <div className="my-auto">
                                    <img className="w-6 h-6" src={alarmIcon} alt="알람 아이콘" />
                                </div>
                                <div className="mt-2 text-lg font-gmarketSansBold">알림함</div>
                                <img className="right-0 inline" src={rArrowIcon} alt="오른쪽 화살표" />
                            </div>
                        </div>
                    </div>
                </FullpageSection>
            </FullpageContainer>
        </div>
    );
}
export default MainTestPage;
