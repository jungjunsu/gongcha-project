import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from '@/components/Modal';
import PlayerCard from '@/components/PlayerCard';
import teamBackground from '@/assets/images/FieldBackground.png';
import squareIcon from '@/assets/images/squareIcon.png';
import hexagonIcon from '@/assets/images/hexagonIcon.png';
import { getTeamInfo, getPlayerList, endTeamRecruit } from '@/apis/api/team';
import { getPlayerCard, getProfileImage2 } from '@/apis/api/mypage';
import { getAPIforAuthUserInfo, getAPIforAuthUserInfoById } from '@/apis/api/user';
import { toast } from 'sonner';
import { pushAlarm } from '@/apis/api/token';

function TeamInfo({ teamId }) {
    const navigate = useNavigate();
    const [myTeamInfo, setMyTeamInfo] = useState(null);
    const [myTeamSpec, setMyTeamSpec] = useState(
        {
            shooting: 0,
            pass: 0,
            dribble: 0,
            speed: 0,
        }
    );
    const [myTeamPlayerLength, setMyTeamPlayerLength] = useState(0);
    const [teamInfo, setTeamInfo] = useState({});
    const [detailKey, setDetailKey] = useState({ key: '' });
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [startY, setStartY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [capId, setCapId] = useState(-1);
    const [userId, setUserId] = useState(-1);
    const [translateY, setTranslateY] = useState(0);
    const [profileData, setProfileData] = useState({
        userId: 0,
        name: '',
        profileUrl: '',
    });

    useEffect(() => {
        getAPIforAuthUserInfo(
            (success) => {
                setUserId(success.data.data.userId);
            },
            (fail) => {
            }
        );
    }, []);

    useEffect(() => {
        const bars = document.querySelectorAll('.progress-bar');
        bars.forEach(bar => {
            let targetWidth = bar.dataset.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.transition = 'width 0.5s ease-out';
                bar.style.width = targetWidth;
            }, 100);
        });
    }, [myTeamSpec]);

    useEffect(() => {
        if (teamId === undefined) {
            return;
        }
        // 팀 정보
        getTeamInfo(
            teamId,
            (success) => {
                setMyTeamInfo(
                    success.data.data,
                );
                // 팀원 리스트 정보
                getPlayerList(
                    teamId,
                    (success) => {
                        if(success.data.status === 'OK') {
                            setMyTeamPlayerLength(success.data.data.length);
                            setMyTeamInfo((prevData) => ({
                                ...prevData,
                                players: success.data.data,
                            }));
                            // 팀원 선수카드 정보
                            const dataArray = success.data.data;
                            const updatedPlayers = [...success.data.data];
                            dataArray.forEach((player, index) => {
                                if(player.role === "팀장") {
                                    setCapId(player.userId);
                                }
                                
                                getPlayerCard(
                                    player.userId,
                                    (success) => {
                                        const cardInfo = success.data.data;
                                        updatedPlayers[index] = {
                                            ...updatedPlayers[index],
                                            shooting: cardInfo.shooting,
                                            pass: cardInfo.pass,
                                            dribble: cardInfo.dribble,
                                            speed: cardInfo.speed,
                                        };
                                        setMyTeamSpec((prevSpec) => ({
                                            shooting: prevSpec.shooting + cardInfo.shooting,
                                            pass: prevSpec.pass + cardInfo.pass,
                                            dribble: prevSpec.dribble + cardInfo.dribble,
                                            speed: prevSpec.speed + cardInfo.speed
                                        }));
                                    },
                                    (fail) => {
                                        console.log(fail);
                                    }
                                );
                                getAPIforAuthUserInfoById(
                                    player.userId,
                                    (success) => {
                                        const manner = success.data.data.manner;
                                        const profileImage = success.data.data.profileImage;
                                        updatedPlayers[index] = {
                                            ...updatedPlayers[index],
                                            manner: manner,
                                            profileUrl: profileImage,
                                        };
                                    },
                                    (fail) => {
                                        console.log(fail);
                                    }
                                );
                            });
                            setMyTeamInfo((prevData) => ({
                                ...prevData,
                                players: updatedPlayers,
                            }));
                        }
                    },
                    (fail) => {
                        console.log(fail);
                    }
                );
            },
            (fail) => {
                console.log(fail);
            }
        );
        return () => {
            
        };
    }, [teamId]);

    useEffect(() => {
        // 팀원 정보
        console.log(myTeamInfo);
    }, [myTeamInfo]);

    const handleTeamInfoClick = (key) => {
        setDetailKey({ key });
        setShowDetailModal(true);
    };

    const closeModal = () => {
        setShowDetailModal(false);
    };

    const handleOutsideClick = () => {
        closeModal();
    };

    const handleSubmit = () => {
        closeModal();
    };

    const getBackgroundColor = (arr) => {
        const MAX = Math.max(arr[0], arr[1], arr[2], arr[3]);
        const size = arr.length;
        for (let index = 0; index < size; index++) {
            const element = arr[index];

            if (element === MAX) {
                if (index === 0) {
                    return 'bg-blue-500';
                } else if (index === 1) {
                    return 'bg-green-500';
                } else if (index === 2) {
                    return 'bg-red-500';
                } else {
                    return 'bg-yellow-500';
                }
            }
        }
    };

    const getSpecial = (arr) => {
        const MAX = Math.max(arr[0], arr[1], arr[2], arr[3]);
        const size = arr.length;
        for (let index = 0; index < size; index++) {
            const element = arr[index];

            if (element === MAX) {
                if (index === 0) {
                    return 'shooting';
                } else if (index === 1) {
                    return 'pass';
                } else if (index === 2) {
                    return 'dribble';
                } else {
                    return 'speed';
                }
            }
        }
    };
    
    const handlePlayerClick = (clickedPlayer) => {
        const player = clickedPlayer;
        
        if (player) {
            setSelectedPlayer(player);
            setTranslateY(0);
        }
    };

    const handleClosePlayerCard = () => {
        setSelectedPlayer(null);
    };

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
        setDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!dragging) return;
        const currentY = e.touches[0].clientY;
        const moveY = currentY - startY;
        setTranslateY(moveY);

        if (moveY > 200) {
            handleClosePlayerCard();
        }
    };

    const handleTouchEnd = () => {
        setDragging(false);
        setTranslateY(0);
    };

    const handleFinishButton = () => {
        if(capId === userId && myTeamInfo.status === "모집중") {
            endTeamRecruit(
                myTeamInfo.id,
                (success) => {
                    console.log(success.data.data);
                },
                (fail) => {
                }
            );
            toast("팀원 모집을 완료하였습니다!", {
                description: "팀원에게 알람을 전송합니다.",
                className: 'toaster',
                action: {
                    label: "확인",
                    onClick: () => {
                        console.log("이벤트 확인");
                        myTeamInfo.players.forEach((player) => {
                            console.log(player.userId);
                            pushAlarm(
                                {
                                    userId: player.userId,
                                    title: "팀원 모집이 완료되었습니다!",
                                    body: "앱에서 자세한 내용을 확인해주세요~"
                                },
                                (success) => {
                                    console.log(success.data.data);
                                },
                                (fail) => {
                                    console.log(fail);
                                }
                            );
                        });
                        navigate(0);
                    },
                },
            });
        }
    };
    
    // PlayerCard modal rendering
    const renderPlayerCardModal = () => {
        if (!selectedPlayer) return null;

        return (
            <Modal show={!!selectedPlayer} onClose={handleClosePlayerCard}>
                <div className="fixed inset-0 flex items-center justify-center mt-[calc(10rem)]" onClick={handleClosePlayerCard}>
                    <div className="absolute top-0 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-[calc(4.0rem)]" onClick={e => e.stopPropagation()}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            style={{ transform: `translateY(${translateY}px)` }}>
                        {/* 닫기 바 */}
                        <div className="absolute w-full h-4 cursor-pointer">
                            <div className="expand-animation absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gray-500 rounded"></div>
                        </div>
                        {/* PlayerCard */}
                        <PlayerCard player={selectedPlayer} className={'flip-enter'}/>
                    </div>
                </div>
            </Modal>
        );
    };

    return (
        <>
            {myTeamInfo === null ? (
                <div></div>
            ) : (
                <>
                    {/* team name */}
                    <div className="mt-4 px-4 absolute top-0">
                        <p>{myTeamInfo.captainName} FC</p>
                    </div>
                    {/* team tags */}
                    <div className="mt-4 px-4 text-[calc(0.8rem)] absolute top-[calc(1.5rem)]">
                        <p>{myTeamInfo.region} {myTeamInfo.district} | {myTeamInfo.difficulty} | {myTeamInfo.matchType} | {myTeamInfo.dayOfWeekList.map(tag => Array.isArray(tag) ? tag.join(', ') : tag).join(', ')}</p>
                    </div>
                    <div className="absolute mt-0 right-0 px-3 text-[calc(.5rem)] top-[calc(1.5rem)]">
                    <button 
                        className="rounded w-[calc(4rem)] h-5 text-[calc(.5rem)] bg-green-500" 
                        onClick={handleFinishButton}
                    >
                        {capId === userId && myTeamInfo.status === "모집중" ? "모집완료하기" : myTeamInfo.status}
                    </button>
                    </div>
                    <div className="absolute mt-5 right-[calc(0rem)] px-3 text-[calc(.5rem)] top-[calc(1.5rem)]">
                        <button className="rounded w-[calc(3rem)] h-5 text-[calc(.5rem)]" onClick={handleTeamInfoClick}>
                            {myTeamInfo.status === "매칭완료" ? "상대팀 보기" : ""}
                        </button>
                    </div>
                    {/* team analysis */}
                    <div>
                        {/* overall */}
                        <div className="flex mt-20 ml-4 space-x-0">
                            <div className="h-full w-1/6 font-pretendardBlack">
                                종합
                            </div>
                        </div>
                        <div className="mt-5 ml-4 space-x-0 bg-gray-400 w-[72%] h-5 flex text-[calc(.5rem)]">
                            <div className="progress-bar bg-blue-500 h-full" data-width={`${(myTeamSpec.shooting / (myTeamPlayerLength )) / 4}%`}>
                                <p className="absolute ml-[calc(.1rem)] mt-[calc(.1rem)] text-white font-pretendardBold text-[calc(.7rem)]">{parseInt(myTeamSpec.speed / (myTeamPlayerLength ))}</p>
                                <p className="absolute -mt-[calc(.6rem)] font-pretendardBlack text-blue-500">SHO</p>
                            </div>
                            <div className="progress-bar bg-green-500 h-full" data-width={`${(myTeamSpec.pass / (myTeamPlayerLength ) / 4)}%`}>
                                <p className="absolute ml-[calc(.1rem)] mt-[calc(.1rem)] text-white font-pretendardBold text-[calc(.7rem)]">{parseInt(myTeamSpec.pass / (myTeamPlayerLength ))}</p>
                                <p className="absolute -mt-[calc(.6rem)] font-pretendardBlack text-green-500">PAS</p>
                            </div>
                            <div className="progress-bar bg-red-500 h-full" data-width={`${(myTeamSpec.dribble / (myTeamPlayerLength )) / 4}%`}>
                                <p className="absolute ml-[calc(.1rem)] mt-[calc(.1rem)] text-white font-pretendardBold text-[calc(.7rem)]">{parseInt(myTeamSpec.dribble / (myTeamPlayerLength ))}</p>
                                <p className="absolute -mt-[calc(.6rem)] font-pretendardBlack text-red-500">DRI</p>
                            </div>
                            <div className="progress-bar bg-yellow-500 h-full" data-width={`${(myTeamSpec.speed / (myTeamPlayerLength)) / 4}%`}>
                                <p className="absolute ml-[calc(.1rem)] mt-[calc(.1rem)] text-white font-pretendardBold text-[calc(.7rem)]">{parseInt(myTeamSpec.speed / (myTeamPlayerLength ))}</p>
                                <p className="absolute -mt-[calc(.6rem)] font-pretendardBlack text-yellow-500">SPD</p>
                            </div>
                            <div className="">
                                <p className="absolute ml-[calc(.7rem)] mt-[calc(.4rem)] font-pretendardBold text-white">max</p>
                            </div>
                            <p className="absolute mt-[calc(.1rem)] right-[calc(2.3rem)] font-pretendardBlack text-[calc(.7rem)] text-[#72BBA8]">
                                {parseInt(
                                    (myTeamSpec.shooting / myTeamPlayerLength)
                                    + (myTeamSpec.pass / myTeamPlayerLength)
                                    + (myTeamSpec.dribble / myTeamPlayerLength)
                                    + (myTeamSpec.speed / myTeamPlayerLength)
                                    )}
                            
                            </p>
                            <p className="absolute mt-[calc(.1rem)] right-[calc(.5rem)] font-pretendardBlack text-[calc(.7rem)] text-gray-500">/400</p>
                        </div>
                        <div className="absolute mt-[calc(3rem)]">
                            <img className="relative w-full rounded-sm shadow-background animate-grow-in" 
                                src={teamBackground} 
                                alt="배경 필드 사진" 
                            />
                            <div className="flex flex-wrap items-center justify-center p-4 absolute inset-0">
                                {myTeamInfo?.players?.map((player, playerIndex) => (
                                    player.permit && (
                                        <div key={playerIndex} className="fade-in relative flex flex-col items-center justify-center m-2"
                                            style={{
                                                width: 'calc(20% - 1.5rem)',
                                                animationDelay: `${playerIndex * 0.1}s`
                                            }}
                                            onClick={() => handlePlayerClick(player)}>
                                            <img className="rounded-full border-[calc(0.15rem)] border-stone-1 object-cover object-center mb-1" 
                                                src={player.profileUrl} 
                                                alt="프로필 사진"
                                                style={{ width: '2rem', height: '2rem', objectFit: 'contain' }} />
                                            <p className="font-pretendardBold text-white text-[calc(0.7rem)]" style={{ alignSelf: 'flex-start' }}>{player.userName}</p>
                                        </div>
                                    )
                                ))}
                                {renderPlayerCardModal()}
                            </div>
                        </div>
                    </div>
                    {showDetailModal && (
                        <Modal show={showDetailModal} onClose={closeModal}>
                            {/* Modal content */}
                            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center" onClick={handleOutsideClick}>
                                <div
                                    className="relative flex flex-col items-center justify-start bg-stone-100 w-[calc(20.5rem)] h-[calc(31.25rem)] rounded-xl overflow-x-hidden overflow-y-auto mt-[calc(7rem)]" 
                                    onClick={e => e.stopPropagation()}
                                >
                                    {/* close button */}
                                    <button
                                        onClick={closeModal}
                                        className="self-start mt-2 mb-2 ml-2 w-5 h-5 bg-[#FF5F51] rounded-full shadow-sm font-bold text-white flex items-center justify-center"
                                    >
                                        &times;
                                    </button>
                                    <div className="absolute w-full mt-10">
                                        <TeamInfo></TeamInfo>
                                        <div className="absolute flex flex-col items-center justify-center w-full mt-5">
                                            <button
                                                className="w-4/5 bg-blue-500 text-white rounded-md font-bold mb-4"
                                                onClick={handleSubmit}
                                            >
                                                닫기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    )}
                </>
            )}
        </>
    );
}

export default TeamInfo;
