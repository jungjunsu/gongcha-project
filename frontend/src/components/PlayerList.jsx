import React, { useState, useEffect, useMemo } from 'react';
import { useModalStore } from '@/store/useModalStore';
import { useNavigate } from "react-router-dom";
import ToggleButton from "@/components/ui/nameButton";
import { Input } from "@/components/ui/input";
import dummyPlayer from '@/data/dummyplayer';
import { v4 as uuidv4 } from 'uuid';
import defaultplayer from '@/assets/icons/defaultplayer.svg';
import PlayerModal from '@/components/modals/PlayerModal';
import { getTransfer } from '@/apis/api/playerList';
import { getPlayerCard, getProfileImage2 } from '@/apis/api/mypage';
import { getAPIforAuthUserInfo, getAPIforAuthUserInfoById } from '@/apis/api/user';
import { toast } from 'sonner';
import { pushAlarm } from '@/apis/api/token';
import {
    CardForm,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
    CardHeader,
} from "@/components/CardForm";

const regions = [
    { id: 1, region: '서울', districts: ['강남구', '송파구', '강서구', '마포구', '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강동구'] },
    { id: 2, region: '부산', districts: ['해운대구', '수영구', '남구', '북구', '동래구', '금정구', '부산진구', '연제구', '사하구', '강서구', '사상구', '기장군'] },
    { id: 3, region: '대구', districts: ['수성구', '달서구', '북구', '동구', '서구', '남구', '달성군'] },
    { id: 4, region: '인천', districts: ['연수구', '남동구', '서구', '부평구', '계양구', '미추홀구', '동구', '중구', '강화군', '옹진군'] },
    { id: 5, region: '광주', districts: ['서구', '북구', '광산구', '남구', '동구'] },
    { id: 6, region: '대전', districts: ['서구', '유성구', '대덕구', '중구', '동구'] },
    { id: 7, region: '울산', districts: ['울주군', '남구', '북구', '동구', '중구'] },
    { id: 8, region: '세종', districts: ['세종특별자치시'] },
    { id: 9, region: '경기', districts: ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '이천시', '양주시', '오산시', '구리시', '안성시', '포천시', '의왕시', '하남시', '여주시', '양평군', '동두천시', '가평군', '과천시'] },
    { id: 10, region: '강원', districts: ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시'] },
    { id: 11, region: '충북', districts: ['청주시', '충주시', '제천시'] },
    { id: 12, region: '충남', districts: ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시'] },
    { id: 13, region: '전남', districts: ['목포시', '여수시', '순천시', '나주시', '광양시'] },
    { id: 14, region: '전북', districts: ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시'] },
    { id: 15, region: '경남', districts: ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시'] },
    { id: 16, region: '경북', districts: ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시'] },
    { id: 17, region: '제주', districts: ['제주시', '서귀포시'] },
];

function PlayerList() {
    const [playerListData, setPlayerListData] = useState([]);
    const [playerList, setPlayerList] = useState([]);
    const [filter, setFilter] = useState("");
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [playerInfo, setPlayerInfo] = useState({
        day: [],
        startTime: '',
    });
    const [filterState, setFilterState] = useState([false, false, false, false]);
    const [checked, setChecked] = useState(false);
    const [showPlayerModal, setShowPlayerModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [myTeamSpec, setMyTeamSpec] = useState({
        shooting: 0,
        pass: 0,
        dribble: 0,
        speed: 0,
    });

    useEffect(() => {
        setPlayerListData(dummyPlayer); // dummy data
    }, []);

    useEffect(() => {
        // axios for db connection
        getTransfer(
            (success) => {
                const players = success.data.data.content;
                const updatedPlayers = [...players];
                
                players.forEach((player, index) => {
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
                            setPlayerList(updatedPlayers);
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
                            setPlayerList(updatedPlayers);
                        },
                        (fail) => {
                            console.log(fail);
                        }
                    );
                });
            },
            (fail) => {
                console.log(fail);
            }
        );
    }, []);

    const handlePlayerInfoClick = (key) => {
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

    const filterToggle = (value) => {
        const newFilterState = filterState.map((state, index) => {
            return index === value ? !state : false;
        });
        setFilterState(newFilterState);
    }

    const handleFilter1Change = () => {
        filterToggle(0);
        setPlayerInfo(prevState => ({
            ...prevState,
            isFriendly: !checked
        }));
        setChecked(prevChecked => !prevChecked);
    };

    const handleFilter2Change = (e) => {
        filterToggle(1);
    };

    const handleFilter3Change = (e) => {
        filterToggle(2);
    };

    const handleFilter4Change = (e) => {
        filterToggle(3);
    };

    const handleFilterSearch = (e) => {
        console.log(playerInfo);
    };

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedDistrict('');
        setplayerInfo(prevState => ({
            ...prevState,
            location: e.target.value
        }));
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setPlayerInfo(prevState => ({
            ...prevState,
            location: `${selectedRegion} ${e.target.value}`
        }));
    };

    const handleDayChange = (e, day) => {
        const { checked } = e.target;
        if (checked) {
            setPlayerInfo(prevState => ({
                ...prevState,
                day: [...prevState.day, day]
            }));
        } else {
            setPlayerInfo(prevState => ({
                ...prevState,
                day: prevState.day.filter(d => d !== day)
            }));
        }
    };

    const handleStartTimeChange = (e) => {
        const startTimeValue = e.target.value;
        setPlayerInfo(prevState => ({
            ...prevState,
            startTime: startTimeValue
        }));
    };
    const navigate = useNavigate();
    const sendAlarm = (userId) => {
        toast("팀원 합류 요청을 하였습니다!", {
            description: "팀원에게 알람을 전송합니다.",
            className: 'toaster',
            action: {
                label: "확인",
                onClick: () => {
                    console.log("이벤트 확인");
                    pushAlarm(
                        {
                            userId: userId,
                            title: "팀 합류 요청이 왔습니다!",
                            body: "앱에서 자세한 내용을 확인해주세요~"
                        },
                        (success) => {
                            console.log(success.data.data);
                        },
                        (fail) => {
                            console.log(fail);
                        }
                    );
                },
            },
        });
    };

    const filteredPlayers = useMemo(() => {
        return playerListData.filter(playerListData => {
            const totalStats = playerListData.data.pass + playerListData.data.shooting + playerListData.data.dribble + playerListData.data.speed;
            const averageStats = totalStats / 4;
            return playerListData.data.user_id.toLowerCase().includes(filter.toLowerCase()) || averageStats.toFixed(0) === filter;
        });
    }, [playerListData, filter]);

    const renderPlayerItem = (players) => {
        return (
            <>
                {players.map((player, index) => (
                    <div key={index} className="player-item flex flex-row items-center mb-4 w-full">
                        <img src={player.profileUrl} alt={`${player.userName} 프로필`} className="w-16 h-16 mr-4" />
                        <div className="flex flex-col w-[calc(20rem)]">
                            <div className="flex flex-row">
                                <p className="mr-30 font-pretendardBlack">{player.shooting} {player.pass} {player.dribble} {player.speed}</p>
                            </div>
                            <div className="flex flex-row mt-2">
                                <p className="mr-7 font-pretendardBold">{player.startTime}:00 ~ {player.endTime}:00</p>
                                <p className="font-pretendardBold">{player.userName}</p>
                                <button
                                    onClick={() => sendAlarm(player.userId)}
                                    className="absolute ml-[calc(11rem)] p-1 text-[calc(.4rem)] bg-blue-500 text-white rounded w-[calc(2.2rem)] h-5"
                                >
                                    알림 전송
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <>
            {playerList.length === 0 ? (
                <div className="absolute flex justify-center left-1/2 top-[calc(15rem)] transform -translate-x-1/2 p-0 w-[calc(6rem)] h-[calc(6rem)]">
                    <img src={defaultplayer} alt="팀 목록이 없습니다" />
                    <p className="absolute top-[calc(7rem)] font-pretendardBlack text-[calc(0.4rem)] text-gray-500">팀 목록이 없어요</p>
                </div>
            ) : (
                <div>
                    <div className="absolute flex flex-col justify-center left-[calc(1.13125rem)] top-[calc(10.5rem)] w-[calc(20.2rem)] h-[calc(4.375rem)]">
                        <div className="absolute ml-2 -mt-5 text-[calc(.6rem)] text-black/50 font-pretendardBold">필터</div>
                        <div className="mt-5 ml-[calc(0.5rem)]"
                            name="isFriendly"
                            checked={playerInfo.isFriendly}
                        >
                            <ToggleButton name={"친선전"} 
                                defaultButtonStyle={"rounded p-[.2rem] w-10 font-pretendardBlack text-[calc(.8rem)] transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-95"}
                                className={(checked ? "bg-blue-500" : "bg-gray-300")}
                                onClick={handleFilter1Change}
                            >
                            </ToggleButton>
                        </div>
                        <div className="absolute ml-[calc(4rem)] mt-5">
                            <div onClick={handleFilter2Change}>
                                <ToggleButton name={"장소"}
                                    defaultButtonStyle={"rounded p-[.2rem] w-10 font-pretendardBlack text-[calc(.8rem)] transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-95"
                                    + (playerInfo.location ? " bg-blue-500" : " bg-gray-300")
                                    }
                                >
                                </ToggleButton>
                            </div>
                            <div>
                                {filterState[1] ?
                                (
                                    <div className="absolute -ml-[calc(.1rem)] font-pretendardBlack">
                                        <select
                                            className="absolute text-[calc(.8rem)] "
                                            name="location"
                                            value={selectedRegion}
                                            onChange={handleRegionChange}
                                        >
                                            <option value="">시</option>
                                            {regions.map(region => (
                                                <option key={region.id} value={region.region} className="font-pretendardBlack">
                                                    {region.region}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            className="absolute ml-[calc(3rem)] text-[calc(.8rem)] w-[4.5rem]"
                                            name="district"
                                            value={selectedDistrict}
                                            onChange={handleDistrictChange}
                                        >
                                            <option value="">군/구</option>
                                            {regions.find(region => region.region === selectedRegion)?.districts.map(district => (
                                                <option key={district} value={district} className="font-pretendardBlack">
                                                    {district}
                                                </option>
                                            ))} 
                                        </select>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                        <div className="absolute ml-[calc(7.5rem)] mt-5">
                            <div onClick={handleFilter3Change}>
                                <ToggleButton name={"시간"} 
                                    defaultButtonStyle={"rounded p-[.2rem] w-10 font-pretendardBlack text-[calc(.8rem)] transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-95"
                                    + (playerInfo.startTime !== '' ? " bg-blue-500" : " bg-gray-300")
                                    }
                                >
                                </ToggleButton>
                            </div>
                            <div>
                                {filterState[2] ?
                                (
                                    <div className="absolute">
                                        <Input 
                                            className="-ml-[calc(.05rem)] w-[calc(5rem)] h-[calc(1.2rem)]" 
                                            type="number"
                                            value={playerInfo.startTime}
                                            min={0}
                                            max={23}
                                            placeholder="시작시간"
                                            onChange={handleStartTimeChange}
                                        />
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                        <div className="absolute ml-[calc(11.0rem)] mt-5">
                            <div onClick={handleFilter4Change}>
                                <ToggleButton name={"요일"} 
                                    defaultButtonStyle={"rounded p-[.2rem] w-10 font-pretendardBlack text-[calc(.8rem)] transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-95"
                                    + (playerInfo.day.length !== 0 ? " bg-blue-500" : " bg-gray-300")
                                    }
                                >
                                </ToggleButton>
                            </div>
                            <div>
                                {filterState[3] ?
                                (
                                    <div className="absolute ml-[calc(.15rem)] w-[calc(9rem)]">
                                        <div className="absolute text-[0.8rem]">
                                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
                                                <div key={day}>
                                                    <label className="absolute mt-2" style={{ marginLeft: `${0.8 * index}rem` }}>
                                                    <input
                                                        type="checkbox"
                                                        name="day"
                                                        value={day}
                                                        checked={playerInfo.day.includes(day)}
                                                        onChange={(e) => handleDayChange(e, day)}
                                                    />
                                                    </label>
                                                    <p className="absolute -mt-[calc(0.1rem)] text-[.5rem] font-pretendardBold text-black/50" style={{ marginLeft: `${0.8 * index}rem` }}>{day}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                        <div className="absolute right-0 mt-5">
                            <button
                                className="bg-[#B6E746] rounded p-[.2rem] w-10 font-pretendardBlack text-[calc(.8rem)] transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-95"
                                onClick={handleFilterSearch}
                            >
                                검색
                            </button>
                        </div>
                    </div>
                    <div className="player-list-container flex-col items-center absolute left-1/2 transform -translate-x-1/2 top-[30%] w-[85%] h-[calc(100rem)]">
                        {playerList && renderPlayerItem(playerList)}
                    </div>
                    <PlayerModal isOpen={showPlayerModal} onClose={() => setShowPlayerModal(false)} player={selectedPlayer} />
                </div>
            )}
        </>
    );
}

export default PlayerList;
