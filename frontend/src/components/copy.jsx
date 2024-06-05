function TeamList() {
    const [teamListData, setTeamListData] = useState([]);
    const [detailKey, setDetailKey] = useState({ key: '' });
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
        setTeamListData(    // dummy data
            TeamListDummyData,
        );
    }, []);

    useEffect(() => {
        /* axios for db connection
        getMyTeamInfo(
            key,
            (success) => {
                setMyTeamInfoData({
                    ...success,
                });
            },
            (fail) => {
                
            }
        );
        return () => {
            
        };
        */
    }, []);

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
        <>
            {teamListData.length === 0 ? (
                <div className="absolute flex justify-center left-1/2 top-[calc(15rem)] transform -translate-x-1/2 p-0 w-[calc(6rem)] h-[calc(6rem)]">
                    <img src={emptyGhostIcon} alt="팀 목록이 없습니다" />
                    <p className="absolute top-[calc(7rem)] font-pretendardBlack text-[calc(0.4rem)] text-gray-500">팀 목록이 없어요</p>
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
                        <div className="absolute flex flex-col justify-start left-[calc(1.13125rem)] top-[calc(15.5rem)] w-[calc(20.2rem)] bg-gray-200">
                            {teamListData.map((data) => (
                                    <div key={uuidv4()} className="border-b-[calc(0.05rem)] border-white" onClick={() => handleTeamInfoClick(data.key)}>
                                        <div className="mt-3 ml-1">
                                            <p>{data.writer.name} FC</p>

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
                                        <TeamInfo></TeamInfo>
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
        </>
    );
}

export default TeamList;