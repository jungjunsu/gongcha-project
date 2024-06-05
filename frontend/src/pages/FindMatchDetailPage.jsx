import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

import { TiArrowBackOutline } from 'react-icons/ti';
import { useFindMatchBoardStore } from '@/stores/findMatchBoardStore';
import { useCardStore } from '@/stores/cardStore';

import PlayerCardCarousel from '@/components/PlayerCardCarousel';
import ManchesterCity from '@/assets/examples/manchester-city.svg';
import TottenhamHotspur from '@/assets/examples/tottenham-hotspur.svg';
import cardBackground from '@/assets/images/teamBackground.png';
import levelIcon from '@/assets/icons/level.svg';
import peopleIcon from '@/assets/icons/people.svg';
import wordIntroduceIcon from '@/assets/icons/wordIntroduce.svg';
import calendarIcon from '@/assets/icons/calendar.svg';
import infoIcon from '@/assets/icons/info.svg';

import { getMyTeam, getPlayerList, getPlayerCardList } from '@/apis/api/team';
import { deleteMatching, getMatchingDetail } from '@/apis/api/match';
import { postMatchingRequest } from '@/apis/api/matchRequest';

function FindMatchDetailPage() {
    const params = useParams();
    const navigate = useNavigate();
    const { dummyFindMatchList, MatchBoardDetailResponse, setMatchBoardDetailResponse } = useFindMatchBoardStore();
    const { myCardData } = useCardStore();
    const detailBoard = dummyFindMatchList[params.id - 1];

    const [profileData, setProfileData] = useState({});
    const [teamId, setTeamId] = useState();

    useEffect(() => {
        getMyTeam(
            (success) => {
                console.log('내가 속한 팀 조회 성공', success);
                setTeamId(success.data.data.id);
            },
            (fail) => {
                console.log('내가 속한 팀 조회 실패', fail);
            }
        );

        getMatchingDetail(
            params.id,
            (success) => {
                console.log('매칭 게시판 상세 조회 성공', success);
                setMatchBoardDetailResponse(success.data.data);
            },
            (fail) => {
                console.log('매칭 게시판 상세 조회 실패', fail);
            }
        );
    }, []);

    useEffect(() => {
        getPlayerList(
            teamId,
            (success) => {
                console.log('내가 속한 팀 팀원 목록 조회 성공', success);
            },
            (fail) => {
                console.log('내가 속한 팀 팀원 목록 조회 실패', fail);
            }
        );
        getPlayerCardList(
            teamId,
            (success) => {
                console.log('내가 속한 팀 팀원 카드 목록 조회 성공', success);
            },
            (fail) => {
                console.log('내가 속한 팀 팀원 카드 목록 조회 실패', fail);
            }
        );
    }, []);

    useEffect(() => {
        if (myCardData) {
            console.log('헬스');
            setProfileData(myCardData);
        }
    }, [myCardData]);

    // useEffect(() => {
    //     console.log(detailBoard);
    // }, []);

    const handleGoBack = () => {
        navigate('/findmatch/board');
    };

    const renderClubIcon = (iconName) => {
        // 클럽 아이콘 크기 커스텀은 여기서 합니다.
        switch (iconName) {
            case 'ManchesterCity':
                return <img src={ManchesterCity} className="w-28 h-28" />;
            case 'TottenhamHotspur':
                return <img src={TottenhamHotspur} className="w-28 h-28" />;
            default:
                return null;
        }
    };

    const handleDeleteMatchDetail = () => {
        deleteMatching(
            params.id,
            (success) => {
                console.log('매칭 게시판 삭제 성공', success);
                navigate(-1);
            },
            (fail) => {
                console.log('매칭 게시판 삭제 실패', fail);
            }
        );
    };

    const handleApplyMatching = () => {
        // 모집완료 상태인 팀의 팀장만 신청가능
        postMatchingRequest(
            params.id,
            (success) => {
                console.log('경기 매칭 신청 성공', success);
                alert('매칭 신청이 완료되었습니다!');
                navigate(-1);
            },
            (fail) => {
                console.log('경기 매칭 신청 실패', fail);
            }
        );
    };

    return (
        <div className="px-2 mt-4">
            {/* 클럽 도입부 */}
            <div className="mt-4">
                <TiArrowBackOutline size={'1.5rem'} onClick={handleGoBack} />
            </div>
            <div className="flex flex-col items-center justify-center">
                {/* {renderClubIcon(detailBoard.clubIcon)} */}
                {/* <img src={MatchBoardDetailResponse.teamPic} alt="팀 로고" className="w-28 h-28" /> */}
                <img src={ManchesterCity} className="w-28 h-28" />
                <p className="mt-4 text-xl font-ygJalnan">
                    {MatchBoardDetailResponse.captainName}님의 팀{/* ({detailBoard.averageStat}) */}
                </p>
                <p className="text-sm text-gray-500 font-pretendardRegular">
                    {MatchBoardDetailResponse.region} {MatchBoardDetailResponse.district}
                </p>
            </div>
            {/* 선수 카드 */}
            <div className="relative flex items-center justify-center mt-2 h-60">
                <img
                    src={cardBackground}
                    alt="선수 카드 배경화면"
                    className="absolute top-0 left-0 z-0 object-cover w-full h-full px-2 rounded-md"
                />
                <Carousel className="absolute z-10 w-40 max-w-xs" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card className="bg-transparent border-none">
                                        <CardContent className="relative w-40 h-48 p-6 aspect-square">
                                            {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                            <PlayerCardCarousel player={profileData} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            {/* Carousel 내부 카드 디자인 확인 용도 */}
            {/* <div className="relative">
                <PlayerCardCarousel player={profileData} />
            </div> */}
            {/* 매칭 정보 */}
            <div className="flex flex-col w-full px-2 mt-4 ">
                <div>
                    <div className="flex flex-row text-base font-gmarketSansBold w-full border-b-[calc(0.05rem)]">
                        <img src={wordIntroduceIcon} alt="모집 아이콘" className="w-5 h-5 mr-2" />
                        모집 한마디
                    </div>
                    <span className="mt-2 text-sm font-pretendardRegular">{MatchBoardDetailResponse.info}</span>
                    {/* ---------------------------------------------- */}
                    <div className="flex flex-row mt-2 text-base font-gmarketSansBold w-full border-b-[calc(0.05rem)]">
                        <img src={infoIcon} alt="정보 아이콘" className="w-5 h-5 mr-2" />
                        매칭 정보
                    </div>
                    <div className="flex flex-row mt-2">
                        <img src={calendarIcon} alt="달력" className="w-4 h-4 mr-2" />

                        <span className="text-xs font-gmarketSansRegular">{MatchBoardDetailResponse.date}</span>
                    </div>

                    <div className="flex flex-row mt-2">
                        <img src={levelIcon} alt="경기 수준" className="w-5 h-5 mr-2" />

                        <span className="mr-24 text-sm font-pretendardRegular">
                            {MatchBoardDetailResponse.difficulty}
                        </span>

                        <img src={peopleIcon} alt="경기 인원 수" className="w-5 h-5 mr-2" />

                        <span className="text-sm font-pretendardRegular">
                            {MatchBoardDetailResponse.playerNum}vs{MatchBoardDetailResponse.playerNum}
                        </span>
                    </div>
                </div>
            </div>
            <div className="px-2 mt-4"> </div>
            {/* 매칭 버튼 */}
            <div className="flex flex-row justify-around ">
                <Button size="sm">수정하기</Button>
                <Button size="sm" className="bg-lime-500 hover:bg-lime-500/80" onClick={() => handleApplyMatching()}>
                    매칭 지원하기
                </Button>
                <Button size="sm" variant="destructive" onClick={handleDeleteMatchDetail}>
                    삭제하기
                </Button>
            </div>
        </div>
    );
}
export default FindMatchDetailPage;
