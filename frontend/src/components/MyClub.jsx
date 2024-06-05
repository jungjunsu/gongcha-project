import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ClubApplyListModal from '@/components/ClubApplyListModal';
import { useClubStore } from '@/stores/clubStore';

import { getMyClub, getClubUsers } from '@/apis/api/club';

import crown from '@/assets/images/crown.png';
import defaultClubLogo from '@/assets/icons/clubFC.svg';
import ManchesterCity from '@/assets/examples/manchester-city.svg';
import HoverPlayerCard from '@/components/HoverPlayerCard';

function MyClub() {
    const {
        dummyClubList,
        myClubListDummyReadResponse,
        myClubResponse,
        setMyClubResponse,
        myClubListReadResponse,
        setMyClubListResponse,
    } = useClubStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState(null); // 추가된 상태
    // 위치 정보 상태 추가
    const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });

    const positionDivRefs = useRef([]);

    useEffect(() => {
        // 참조 배열에 대해 반복하여 각 원소의 위치 정보를 출력
        positionDivRefs.current.forEach((ref, index) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();
                //console.log(`Element ${index} - Top: ${rect.top}, Left: ${rect.left}`);
            }
        });

        getMyClub(
            (success) => {
                console.log('내 클럽 정보 조회 성공', success);
                setMyClubResponse(success.data.data);
                console.log('내 클럽 정보', myClubResponse);
            },
            (fail) => {
                console.log('내 클럽 정보 조회 실패', fail);
            }
        );

        if (myClubResponse !== undefined) {
            getClubUsers(
                myClubResponse.clubId,
                (success) => {
                    console.log('내 클럽의 클럽원 목록 조회 성공', success);
                    setMyClubListResponse(success.data.data);
                },
                (fail) => {
                    console.log('내 클럽의 클럽원 목록 조회 실패', fail);
                }
            );
        }

        // 내 클럽 정보 조회 axios
    }, []);

    const handleOpenApplyList = () => {
        setIsModalOpen(true);
    };

    const handleCloseApplyList = () => {
        setIsModalOpen(false);
    };

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

    return (
        <div className="px-2 mt-4">
            {isModalOpen && (
                <ClubApplyListModal
                    clubId={myClubResponse.clubId}
                    isOpen={isModalOpen}
                    onClose={() => handleCloseApplyList()}
                />
            )}
            {/* 나의 클럽 정보 */}
            {myClubResponse && Object.keys(myClubResponse).length !== 0 ? (
                <div className="flex flex-col items-start p-4 mx-auto mt-4 border border-solid rounded-lg">
                    {/* <div>{renderClubIcon(myClubResponse.clubIcon)}</div> */}
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽명 :</span> {myClubResponse.name}
                    </p>
                    {/* <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽 평균 능력치 : </span>
                        {dummyClubList[0].averageStat}
                    </p> */}
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽 경기 수준 : </span>
                        {myClubResponse.skillLevel}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">현재 소속 인원 : </span>
                        {myClubResponse.clubUsers}명
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">활동 지역 : </span>
                        {myClubResponse.region}&nbsp;
                        {myClubResponse.districts}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">활동 시간 : </span>
                        {myClubResponse.startTime}~{myClubResponse.endTime}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽 소개 : </span>
                        {myClubResponse.description}
                    </p>
                </div>
            ) : (
                <div className="text-center">내 클럽이 없습니다</div>
            )}

            {/* 버튼과 검색창 */}
            <div className="flex flex-row justify-between mt-4">
                {myClubListReadResponse &&
                    myClubListReadResponse.map((value, index) => {
                        value.userRole === 'MASTER';
                    }) && (
                        <Button size="sm" onClick={() => handleOpenApplyList()}>
                            가입 신청 목록
                        </Button>
                    )}

                {/* <div className="flex flex-row">
                    <Input type="text" className="py-2 pl-3 pr-8 w-36 h-9" placeholder="선수명으로 검색" />
                    &nbsp;&nbsp;
                    <Button size="sm">검색</Button>
                </div> */}
            </div>
            {/* 나의 클럽 리스트 */}
            {/* 호버 시 선수카드가 보임 */}
            <div>
                {isCardVisible && (
                    <HoverPlayerCard
                        cardInfo={myClubListReadResponse[activeCardIndex]}
                        index={activeCardIndex}
                        position={cardPosition}
                    />
                )}
                {myClubListReadResponse &&
                    myClubListReadResponse.map((value, index) => (
                        <div
                            key={index}
                            ref={(el) => (positionDivRefs.current[index] = el)}
                            className={`p-1 mt-4 border border-solid rounded-lg ${
                                activeCardIndex === index ? 'bg-gray-200' : ''
                            }`}
                            onTouchStart={() => {
                                setIsCardVisible(true);
                                setActiveCardIndex(index);
                                // 선택된 카드의 위치 정보를 설정
                                const rect = positionDivRefs.current[index].getBoundingClientRect();
                                setCardPosition({ top: rect.top, left: rect.left });
                            }}
                            onTouchEnd={() => {
                                setIsCardVisible(false);
                                setActiveCardIndex(-1); // 활성 카드 인덱스를 초기화
                            }}
                        >
                            <div className="grid grid-cols-3">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={value.profileImage}
                                        alt="선수 이미지"
                                        style={{ width: '4rem', height: '4rem', objectFit: 'contain' }}
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-lg font-gmarketSansBold">{value.userName}</p>
                                    <p className="text-xs font-gmarketSansRegular">
                                        {value.phone ? value.phone : '핸드폰 등록이 되어있지 않습니다'}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center justify-around text-center">
                                    <div>
                                        <img
                                            src={crown}
                                            alt="클럽장"
                                            style={{
                                                width: '1rem',
                                                height: '1rem',
                                                visibility: value.userRole === 'MASTER' ? 'visible' : 'hidden',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-[calc(0.5rem)] text-gray-500 font-pretendardRegular">
                                            선수 가치
                                        </p>
                                        <p className="text-[calc(0.7rem)] font-gmarketSansBold">
                                            {parseInt(
                                                (value.shooting + value.pass + value.dribble + value.speed) / 4,
                                                10
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default MyClub;
