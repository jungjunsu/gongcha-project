import React, { useEffect, useState, useRef, useCallback } from 'react';

import { useClubStore } from '@/stores/clubStore';

import JoinClubDialog from '@/components/JoinClubDialog';

import defaultClubLogo from '@/assets/icons/clubFC.svg';
import ManchesterCity from '@/assets/examples/manchester-city.svg';
import TottenhamHotspur from '@/assets/examples/tottenham-hotspur.svg';
import ClubDetailModal from '@/components/ClubDetailModal';

import { getClubDetail, getClubLists } from '@/apis/api/club';

function ClubBoard() {
    const { dummyClubList, clubListResponse, setClubListResponse } = useClubStore();

    // 데이터 목록과 로딩 상태를 관리합니다.
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startIndex, setStartIndex] = useState(0); // 시작 인덱스를 관리하는 상태 추가
    const [selectedClub, setSelectedClub] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getClubLists(
            (success) => {
                console.log('클럽 전체 조회 성공', success);
                // console.log('페이지 내용', success.data.data.pageable);
                setClubListResponse([...success.data.data.content]); // 상태 업데이트 함수 사용
                console.log(clubListResponse);
            },
            (fail) => {
                console.log('클럽 전체 조회 실패', fail);
            }
        );
    }, []);

    // 마지막 요소를 추적하기 위한 ref 생성
    const observer = useRef();

    const renderClubIcon = (iconName) => {
        switch (iconName) {
            case 'ManchesterCity':
                return <img src={ManchesterCity} className="w-14 h-14" />;
            case 'TottenhamHotspur':
                return <img src={TottenhamHotspur} className="w-14 h-14" />;
            default:
                return null;
        }
    };

    const lastItemRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // 여기서 데이터를 더 불러오는 로직을 구현합니다.
                    console.log('마지막 요소가 보임');
                    fetchMoreItems();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading]
    );

    // 데이터를 불러오는 함수
    const fetchMoreItems = () => {
        if (startIndex >= clubListResponse.length) return; // 모든 데이터를 이미 불러왔다면 더 이상 진행하지 않음
        setLoading(true);
        // 예시: 임의의 데이터를 더 불러온다고 가정합니다.
        setTimeout(() => {
            const nextItems = clubListResponse.slice(startIndex, startIndex + 10);
            setItems((prevItems) => [...prevItems, ...nextItems]);
            setStartIndex((prevStartIndex) => prevStartIndex + 10);
            setLoading(false);
        }, 1000);
    };

    const handleOpenClubDetail = (club) => {
        setSelectedClub(club); // 클릭된 아이템 정보를 상태에 저장합니다.
        console.log(selectedClub);
        setIsModalOpen(true);
    };

    const handleCloseClubDetail = () => {
        setIsModalOpen(false);
    };

    // 컴포넌트 마운트 시 초기 데이터 로드
    useEffect(() => {
        fetchMoreItems();
    }, []);

    return (
        <div>
            {/* 클럽 게시판 UI 디자인 부분 */}
            {/* index로 axios 요청해서 상태관리에 저장?해서 불러오기? */}
            {items.map((item, index) => (
                <div
                    key={index}
                    ref={index === items.length - 1 ? lastItemRef : null}
                    className="p-2 mt-4 border border-solid rounded-lg"
                    onClick={() => handleOpenClubDetail(item)}
                >
                    <div className="flex flex-row items-center justify-between pl-2 text-base font-pretendardBold">
                        {/* <div>{renderClubIcon(item.clubIcon)}</div> */}
                        <div>
                            <img src={defaultClubLogo} alt="기본 클럽 로고" className="w-14 h-14" />
                        </div>
                        <div className="text-center">
                            <p className="font-pretendardBold">{item.name}</p>
                            {/* <p className="font-pretendardBold">({item.averageStat})</p> */}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div>{item.master}</div>
                            <div className="text-xs text-gray-500 font-pretendardRegular">
                                소속 인원 : {item.clubUsers}명
                            </div>
                        </div>
                        {/* <Button className="w-16 h-7">
                            <p className="text-xs font-gmarketSansRegular">가입 신청</p>
                        </Button> */}
                        <div onClick={(e) => e.stopPropagation()}>
                            <JoinClubDialog
                                clubName={item.name}
                                clubId={item.clubId}
                                // averageStat={item.averageStat}
                                clubMaster={item.master}
                            />
                        </div>
                    </div>
                </div>
            ))}
            {loading && <p className="mt-10 text-center font-gmarketSansBold">Loading...</p>}
            {isModalOpen && (
                <ClubDetailModal
                    isOpen={isModalOpen}
                    onClose={() => handleCloseClubDetail()}
                    clubDetail={selectedClub}
                />
            )}
        </div>
    );
}
export default ClubBoard;
