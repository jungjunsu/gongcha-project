import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ToggleButton from "@/components/ui/nameButton";
import { Input } from "@/components/ui/input"
import Modal from '@/components/Modal';
import TeamInfo from '@/components/TeamInfo';
import emptyGhostIcon from '@/assets/icons/emptyGhost.svg';
import rArrowIcon from '@/assets/icons/rArrow.svg';
import { getTeamList } from '@/apis/api/team';

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

function TeamList() {
    const [teamListData, setTeamListData] = useState([]);
    const [detailKey, setDetailKey] = useState(0);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [teamInfo, setTeamInfo] = useState({
        day: [],
        startTime: '',
    });
    const [filterState, setFilterState] = useState([false, false, false, false]);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        // axios for db connection
        getTeamList(
            (success) => {
                console.log("><><><><><><><><<><");
                console.log(success.data.data);
                if (success.data.data.content.length !== 0) {
                    console.log(success.data.data.content.length);
                    setTeamListData(
                        success.data.data.content,
                    );
                }
            },
            (fail) => {
                console.log(fail);
            }
        );
        return () => {
            
        };

    }, []);

    const handleTeamInfoClick = (key) => {
        setDetailKey(key);
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
        setTeamInfo(prevState => ({
            ...prevState,
            isFriendly: !checked
        }));
        setChecked(prevChecked => !prevChecked);
    };

    const handleFilter2Change = (e) => {
        const { name, checked } = e.target;
        filterToggle(1);
    };

    const handleFilter3Change = (e) => {
        const { name, checked } = e.target;
        filterToggle(2);
    };

    const handleFilter4Change = (e) => {
        filterToggle(3);
    };

    const handleFilterSearch = (e) => {
        console.log(teamInfo);
    };

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedDistrict('');
        setTeamInfo(prevState => ({
            ...prevState,
            location: e.target.value
        }));
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setTeamInfo(prevState => ({
            ...prevState,
            location: `${selectedRegion} ${e.target.value}`
        }));
    };

    const handleDayChange = (e, day) => {
        console.log("엥");
        const { checked } = e.target;
        if (checked) {
            setTeamInfo(prevState => ({
                ...prevState,
                day: [...prevState.day, day]
            }));
        } else {
            setTeamInfo(prevState => ({
                ...prevState,
                day: prevState.day.filter(d => d !== day)
            }));
        }
    };

    const handleStartTimeChange = (e) => {
        const startTimeValue = e.target.value;
        setTeamInfo(prevState => ({
            ...prevState,
            startTime: startTimeValue
        }));
    };
    

    return (
        <div className="absolute">
            {teamListData.length === 0 ? (
                <div className="absolute left-[calc(11.5rem)] top-[calc(15rem)] transform -translate-x-1/2 p-0 w-[calc(6rem)] h-[calc(6rem)]">
                    <img src={emptyGhostIcon} alt="팀 목록이 없습니다" />
                    <p className="absolute left-[calc(2rem)] top-[calc(7rem)] font-pretendardBlack text-[calc(0.4rem)] text-gray-500">팀 목록이 없어요</p>
                </div>
                ) : (
                    <>
                        <div className="absolute flex flex-col justify-center left-[calc(1.13125rem)] top-[calc(10rem)] w-[calc(20.2rem)] h-[calc(4.375rem)]">
                            <div className="absolute ml-2 -mt-5 text-[calc(.6rem)] text-black/50 font-pretendardBold">필터</div>
                            <div className="mt-5 ml-[calc(0.5rem)]"
                                name="isFriendly"
                                checked={teamInfo.isFriendly}
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
                                        + (teamInfo.location ? " bg-blue-500" : " bg-gray-300")
                                        }
                                    >
                                    </ToggleButton>
                                </div>
                                <div>
                                    {filterState[1] ?
                                    (
                                        <div className="absolute -ml-[calc(.1rem)] font-pretendardBlack">
                                            <select
                                                className="absolute text-[calc(.8rem)]"
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
                                        + (teamInfo.startTime !== '' ? " bg-blue-500" : " bg-gray-300")
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
                                                value={teamInfo.startTime}
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
                                        + (teamInfo.day.length !== 0 ? " bg-blue-500" : " bg-gray-300")
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
                                                            checked={teamInfo.day.includes(day)}
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
                        <div className="absolute flex flex-col justify-start left-[calc(1.13125rem)] top-[calc(15.5rem)] w-[calc(20.2rem)] rounded bg-slate-200">
                            {teamListData.map((data) => (
                                    <div key={uuidv4()} className="border-b-[calc(0.05rem)] border-white transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-90" onClick={() => handleTeamInfoClick(data.id)}>
                                        <div className="absolute mt-2 ml-4 text-[calc(.6rem)]">
                                            <p className="font-pretendardBlack">{data.startTime}:00</p>
                                            <p className='ml-2'>~</p>
                                            <p className="font-pretendardBlack">{data.endTime}:00</p>
                                        </div>
                                        <div className="mt-2 ml-[calc(5rem)] mb-3">
                                            {/* <p>{data.writer.name} FC</p> */}
                                            <p>{data.captainName} FC</p>
                                            <p className="mt-1 text-[calc(.5rem)]">
                                                {data.region} {data.district}
                                                &nbsp;&nbsp;{data.difficulty}
                                            </p>
                                            {/* 친선전: ENUM
                                                location: 부산시
                                                district: 남구
                                                시간1: 스타트 시간
                                                시간2 엔드 시간
                                                요일: [월, 화, 목, 금, 토]
                                                경기 난이도: ENUM
                                                players 
                                            */}
                                            <img className="absolute -mt-[calc(1.5rem)] right-1 inline" src={rArrowIcon} alt="들어가기" />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        {showDetailModal && (
                            <Modal show={showDetailModal} onClose={closeModal}>
                                {/* Modal content */}
                                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center " onClick={handleOutsideClick}>
                                    <div
                                        className="relative flex flex-col items-center justify-start bg-stone-100 w-[calc(20.5rem)] h-[calc(31.25rem)] rounded-xl overflow-x-hidden overflow-y-auto" 
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
                                            <TeamInfo teamId={detailKey}></TeamInfo>
                                            <div className="absolute flex flex-col items-center justify-center w-full mt-5">
                                                <button
                                                    className="w-4/5 bg-blue-500 text-white rounded-md font-bold mb-4"
                                                    onClick={handleSubmit}
                                                >
                                                    신청하기
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </>
                )
            }
        </div>
    );
}

export default TeamList;
