import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from '@/components/Modal';
import TeamInfo from '@/components/TeamInfo';
import PlayerCard from '@/components/PlayerCard';
import lArrowIcon from '@/assets/icons/lArrow.svg';
import emptyGhostIcon from '@/assets/icons/emptyGhost.svg';
import { getMyTeamInfo } from '@/apis/api/team';

function PlaySchedulePage() {
    const navigate = useNavigate();
    const [myTeamInfoData, setMyTeamInfoData] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [startY, setStartY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        // axios for db connection
        getMyTeamInfo(
            (success) => {
                if (success.data.data.content.length > 0) {
                    setMyTeamInfoData({
                        ...success.data.data.content[0],
                    });
                }
            },
            (fail) => {
                console.error(fail);
            }
        );
        return () => {};
    }, []);

    const handleBackClick = () => {
        navigate(-1);
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

    // PlayerCard modal rendering
    const renderPlayerCardModal = () => {
        if (!selectedPlayer) return null;

        return (
            <Modal show={!!selectedPlayer} onClose={handleClosePlayerCard}>
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center" onClick={handleClosePlayerCard}>
                    <div className="absolute top-0 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-[calc(11.6875rem)]" onClick={e => e.stopPropagation()}
                         onTouchStart={handleTouchStart}
                         onTouchMove={handleTouchMove}
                         onTouchEnd={handleTouchEnd}
                         style={{ transform: `translateY(${translateY}px)` }}>
                        {/* 닫기 바 */}
                        <div className="absolute w-full h-4 cursor-pointer">
                            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gray-500 rounded"></div>
                        </div>
                        {/* PlayerCard */}
                        <PlayerCard player={selectedPlayer}/>
                    </div>
                </div>
            </Modal>
        );
    };

    return (
        <div className="absolute flex flex-col items-center justify-center">
            <>
                <div onClick={handleBackClick} className="absolute left-[calc(.7rem)] top-[calc(2.0rem)] w-[calc(1.5625rem)] h-[calc(1.875rem)] cursor-pointer">
                    <img src={lArrowIcon} alt="돌아가기" />
                </div>
                <div className="page-title w-[calc(19.875rem)]">현재 진행중인 팀</div>
                <div className="absolute flex flex-col items-center justify-center left-1/2 top-[calc(8.9375rem)] w-[calc(22.5rem)]">
                    <span className="font-pretendardBold">
                        나의 팀 보기
                    </span>
                </div>
                <div className="absolute left-0 top-[calc(10.6875rem)] border-[calc(.01875rem)] w-[calc(22.5rem)] z-0"></div>
            </>
            <>
                {/* team info */}
                <div className="absolute left-0 top-[calc(12.6875rem)] w-[calc(22.5rem)] rounded bg-slate-50">
                    {myTeamInfoData.length === 0 ? (
                        <div className="absolute flex justify-center left-1/2 top-[calc(10rem)] transform -translate-x-1/2 p-0 w-[calc(6rem)] h-[calc(6rem)]">
                            <img src={emptyGhostIcon} alt="나의 팀이 없습니다" />
                            <p className="absolute top-[calc(7rem)] font-pretendardBlack text-[calc(0.4rem)] text-gray-500">나의 팀이 없어요</p>
                        </div>
                    ) : (
                        <TeamInfo teamId={myTeamInfoData.id}></TeamInfo>
                    )}
                    <div className="mb-[calc(10rem)]"></div>
                </div>
            </>
        </div>
    );
}

export default PlaySchedulePage;
