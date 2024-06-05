import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getProfileImage } from '@/apis/api/mypage';
import { getAPIforAuthUserInfo } from '@/apis/api/user';
import {
    CardForm,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/CardForm"
import pencilIcon from '@/assets/icons/pencil.svg';
import rArrowIcon from '@/assets/icons/rArrow.svg';
import playScheduleIcon from '@/assets/icons/playSchedule.svg';
import playHistoryIcon from '@/assets/icons/playHistory.svg';
import alarmIcon from '@/assets/icons/alarm.svg';
import defaultProfileImage from '@/assets/images/defaultProfileImage.png';
import Lottie from 'lottie-react';
import playerCardAnimation from '@/assets/lottie/playercard';
import cardMenu from '@/assets/lotties/cardMenu';
import { myPageDummyData } from '@/data/dummyData'; // dummy data

function MyPage() {
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [profileData, setProfileData] = useState({
        userId: 0,
        nickname: '',
        profileUrl: '',
    });

    useEffect(() => {
        setProfileData({    // dummy data
            ...myPageDummyData
        });
        // axios for db connection
        getProfileImage(
            (success) => {
                setProfileData((prevData) => ({
                    ...prevData,
                    profileUrl: success.data.data.profileUrl,
                }));
            },
            (fail) => {
                console.log(fail);
            }
        );
        getAPIforAuthUserInfo(
        (success) => {
            setUserId(success.data.data.userId);
            setProfileData((prevData) => ({
                ...prevData,
                name: success.data.data.name,
            }));
        },
        (fail) => {
            console.log(fail);
        }
        );
    }, []);

    const handleNagivate = (page) => {
        setIsActive(true);
        setTimeout(() => {
            setIsActive(false);
            navigate(page);
        }, 180);
    };
    const handleProfileClick = () => {
        handleNagivate('profile');
    };
    const handlePlayScheduleClick = () => {
        handleNagivate('playschedule');
    };
    const handlePlayHistoryClick = () => {
        handleNagivate('playhistory');
    };
    const handlePlayerCardClick = () => {
        handleNagivate('playercard');
    };
    const handleAlarmClick = () => {
        handleNagivate('/alarm');
    };

    const onErrorImg = (e) => {
        e.target.src = defaultProfileImage
    }

    return (
        <div className="absolute flex items-center justify-center">
            <>
                {/* page title */}
                <div className="page-title w-[calc(10rem)]">마이페이지</div>
            </>
            <>
                {/* profile content */}
                <CardForm className="absolute flex flex-col justify-center left-[calc(1.13125rem)] top-[calc(7.625rem)] w-[calc(19.875rem)] h-[calc(4.375rem)] rounded-[15px] border-stone-70" onClick={() => handleProfileClick()}>
                    <CardContent className="flex items-center left-[calc(5.875rem)] pt-[calc(1.5rem)] p-0">
                        <img className="relative left-[calc(0.875rem)] rounded-full border-[calc(0.01rem)]" 
                            src={profileData.profileUrl}
                            onError={onErrorImg}
                            alt="프로필 사진"
                            style={{ width: '3rem', height: '3rem', objectFit: 'contain' }} />
                        <CardTitle className="relative left-[calc(1.875rem)] text-[calc(1.0rem)]">{profileData.name}</CardTitle>
                    </CardContent>
                    <CardFooter className="absolute bottom-0 right-0 justify-end items-end p-2 pr-3">
                        <CardDescription className="flex text-[0.625rem]">
                            <img className="mr-1 inline" src={pencilIcon} alt="프로필 편집" width={10} height={10}/>
                            <span>프로필 편집</span>
                        </CardDescription>
                    </CardFooter>
                </CardForm>
            </>
            <>
                {/* PlaySchedule content*/}
                <div className="absolute flex left-[calc(1.13125rem)] top-[calc(14.5rem)] w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-92" onClick={() => handlePlayScheduleClick()}>
                    <CardForm className="flex justify-center w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] border-gray-50 bg-stone-50">
                        <CardContent className="p-[calc(0.125rem)]">
                            <img className="animate-zoom-in-out" src={playScheduleIcon} alt="현재 진행중인 팀" />
                        </CardContent>
                    </CardForm>
                    <span className="relative left-[calc(0.8125rem)] pt-[calc(0.1rem)] font-pretendardBlack">현재 진행중인 팀</span>
                    <img className="absolute right-0 inline" src={rArrowIcon} alt="들어가기" />
                </div>
                {/* PlayHistory content*/}
                <div className="absolute flex left-[calc(1.13125rem)] top-[calc(17.3125rem)] w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-90" onClick={() => handlePlayHistoryClick()}>
                    <CardForm className="flex justify-center w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] border-gray-50 bg-stone-50">
                        <CardContent className="p-[calc(0.125rem)] pl-[calc(0.15rem)]">
                            <img className="w-full h-full animate-zoom-in-out" src={playHistoryIcon} alt="경기내역" />
                        </CardContent>
                    </CardForm>
                    <span className="relative left-[calc(0.8125rem)] pt-[calc(0.1rem)] font-pretendardBlack">경기내역</span>
                    <img className="absolute right-0 inline" src={rArrowIcon} alt="들어가기" />
                </div>
                {/* PlayerCard content*/}
                <div className="absolute flex left-[calc(1.13125rem)] top-[calc(20.125rem)] w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-90" onClick={() => handlePlayerCardClick()}>
                    <CardForm className="flex justify-center w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] border-gray-50 bg-stone-50">
                    </CardForm>
                    <span className="relative left-[calc(0.8125rem)] pt-[calc(0.1rem)] font-pretendardBlack">내 선수카드</span>
                    <img className="absolute right-0 inline" src={rArrowIcon} alt="들어가기" />
                    <div className='w-[calc(2rem)] h-[calc(2rem)] -ml-[calc(6.4rem)] -mt-[calc(0.0rem)]'>
                        <Lottie
                            animationData={cardMenu}
                            loop={true}
                            autoplay={true}
                        />
                    </div>
                </div>
                {/* Alarm content*/}
                <div className="absolute flex left-[calc(1.13125rem)] top-[calc(22.9375rem)] w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-90" onClick={() => handleAlarmClick()}>
                    <CardForm className="flex justify-center w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] border-gray-50 bg-stone-50">
                        <CardContent className="p-[calc(0.125rem)]">
                            <img className="w-full h-full animate-zoom-in-out" src={alarmIcon} alt="알림함" />
                        </CardContent>
                    </CardForm>
                    <span className="relative left-[calc(0.8125rem)] pt-[calc(0.1rem)] font-pretendardBlack">알림함</span>
                    <img className="absolute right-0 inline" src={rArrowIcon} alt="들어가기" />
                    <div className='w-[calc(2rem)] h-[calc(2rem)] -ml-[calc(4.4rem)] -mt-[calc(0.18rem)]'>
                    </div>
                </div>
            </>
        </div>
    );
}

export default MyPage;
