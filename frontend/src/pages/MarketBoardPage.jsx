import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lArrowIcon from '@/assets/icons/lArrow.svg';
import PlayerList from '@/components/PlayerList';
import MyTeamInfo from '@/components/MyTeamInfo';
import TeamList from '@/components/TeamList';

function MarketBoardPage() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/main');
    };
    const [activeTab, setActiveTab] = useState('tab2');

    return (
        <>
            <div
                onClick={handleBackClick}
                className="absolute left-[calc(.7rem)] top-[calc(2.0rem)] w-[calc(1.5625rem)] h-[calc(1.875rem)] cursor-pointer"
            >
                <img src={lArrowIcon} alt="돌아가기" />
            </div>
            {/* page title */}
            <div className="page-title w-[calc(10rem)]">이적 시장</div>
            {/* page tab */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center top-[calc(7.5rem)] p-0 w-[calc(20.25rem)] h-[calc(2.86rem)] bg-gray-100 rounded-sm text-[calc(0.8rem)]">
                <div
                    className="flex items-center justify-center cursor-pointer mx-5 w-[calc(12rem)]"
                    onClick={() => setActiveTab('tab1')}
                >
                    <span
                        className={`absolute font-pretendardBold ${
                            activeTab === 'tab1' ? 'bg-white rounded-md px-[calc(.8rem)] py-2' : ''
                        }`}
                    >
                        공차 선수 보기
                    </span>
                </div>
                <div
                    className="flex items-center justify-center cursor-pointer mx-5 w-[calc(12rem)]"
                    onClick={() => setActiveTab('tab2')}
                >
                    <span
                        className={`absolute font-pretendardBold ${
                            activeTab === 'tab2' ? 'bg-white rounded-md px-[calc(1.0rem)] py-2' : ''
                        }`}
                    >
                        나의 팀 보기
                    </span>
                </div>
                <div
                    className="flex items-center justify-center cursor-pointer mx-5 w-[calc(11rem)]"
                    onClick={() => setActiveTab('tab3')}
                >
                    <span
                        className={`absolute font-pretendardBold ${
                            activeTab === 'tab3' ? 'bg-white rounded-md px-[calc(.8rem)] py-2' : ''
                        }`}
                    >
                        팀 목록 보기
                    </span>
                </div>
            </div>
            {/* Render component based on activeTab */}
            {activeTab === 'tab1' && <PlayerList />}
            {activeTab === 'tab2' && <MyTeamInfo />}
            {activeTab === 'tab3' && <TeamList />}
        </>
    );
}

export default MarketBoardPage;
