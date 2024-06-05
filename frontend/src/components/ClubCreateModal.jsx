import Lottie from 'react-lottie';
import { useClubStore } from '@/stores/clubStore';
import { useRegionStore } from '@/stores/regionStore';
import { TimePicker } from '@mui/x-date-pickers';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ChooseBadges from '@/components/ChooseBadges';

import clubAnimation from '@/assets/lotties/clubAnimation';
import timeAnimation from '@/assets/lotties/timeAnimation';
import placeAnimation from '@/assets/lotties/placeAnimation';
import playerAnimation from '@/assets/lotties/playerAnimation';

import { postClubCreate } from '@/apis/api/club';

function ClubCreateModal({ isOpen, onClose }) {
    const { clubCreateRequest } = useClubStore();
    const { regions } = useRegionStore();
    const [clubCreateIndex, setClubCreateIndex] = useState(1);
    const [activityStartTime, setActivityStartTime] = useState(null);
    const [activityEndTime, setActivityEndTime] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [clublevel, setClubLevel] = useState('');

    const clubNameRef = useRef(null);
    const descriptionRef = useRef(null);
    const regionRef = useRef(null);
    const districtRef = useRef(null);

    const handleChangeContentFirst = (index) => {
        if (clubNameRef.current.value === '' || descriptionRef.current.value === '') {
            console.log(clubCreateRequest);
            alert('아직 작성하지 않은 내용이 있어요!');
        } else {
            setClubCreateIndex(index);
            clubCreateRequest.clubName = clubNameRef.current.value;
            clubCreateRequest.description = descriptionRef.current.value;
            console.log(clubCreateRequest);
        }
    };

    const handleChangeContentSecondPrev = (index) => {
        setClubCreateIndex(index);
        clubCreateRequest.clubName = '';
        clubCreateRequest.description = '';
    };

    const handleChangeContentSecondNext = (index) => {
        if (activityStartTime === null || activityEndTime === null) {
            console.log(clubCreateRequest);
            alert('활동 시간을 설정 해주세요!');
        } else {
            setClubCreateIndex(index);
            clubCreateRequest.activityStartTime = activityStartTime.format('HH:mm');
            clubCreateRequest.activityEndTime = activityEndTime.format('HH:mm');
            console.log(clubCreateRequest);
        }
    };

    const handleChangeContentThirdPrev = (index) => {
        setClubCreateIndex(index);
        clubCreateRequest.activityStartTime = '';
        clubCreateRequest.activityEndTime = '';
    };

    const handleChangeContentThirdNext = (index) => {
        if (selectedRegion === '' || selectedDistrict === '') {
            console.log(clubCreateRequest);
            alert('클럽 지역을 설정 해주세요!');
        } else {
            setClubCreateIndex(index);
            clubCreateRequest.region = selectedRegion;
            clubCreateRequest.districts = selectedDistrict;
            console.log(clubCreateRequest);
        }
    };

    const handleChangeContentFourthPrev = (index) => {
        // 경기수준 초기화
        setClubCreateIndex(index);
    };

    const handleCreateClub = () => {
        clubCreateRequest.skillLevel = clublevel;
        console.log(clubCreateRequest);
        // 여기에 axios 클럽 생성 요청 보내기
        postClubCreate(
            clubCreateRequest,
            (success) => {
                console.log('클럽 생성 성공', success);
            },
            (fail) => {
                console.log('클럽 생성 실패', fail);
            }
        );
        onClose();
    };

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="relative flex flex-col overflow-x-hidden overflow-y-auto bg-white w-80 h-96 rounded-xl">
                <div className="flex justify-end mt-4 mr-6">
                    <button onClick={onClose}>⨉</button>
                </div>
                <div className="flex flex-col h-full justify-evenly">
                    {clubCreateIndex === 1 && (
                        <>
                            <div>
                                {/* 클럽 로티 */}
                                <Lottie
                                    options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: clubAnimation,
                                        rendererSettings: {
                                            preserveAspectRatio: 'xMidYMid slice',
                                        },
                                    }}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div>
                                <p className="text-center font-gmarketSansRegular">
                                    클럽 이름과 클럽 소개를 알려주세요.
                                </p>
                                <div className="grid w-full gap-4 px-4 py-4">
                                    <div className="grid items-center grid-cols-4 gap-4">
                                        <Label htmlFor="clubName" className="text-right">
                                            클럽 이름
                                        </Label>
                                        <Input
                                            ref={clubNameRef}
                                            id="clubName"
                                            placeholder="클럽명을 작성해주세요."
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid items-center grid-cols-4 gap-4">
                                        <Label htmlFor="description" className="text-right">
                                            클럽 소개
                                        </Label>
                                        <Input
                                            ref={descriptionRef}
                                            id="description"
                                            placeholder="클럽 소개를 작성해주세요."
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center">
                                <Button size="sm" onClick={() => handleChangeContentFirst(clubCreateIndex + 1)}>
                                    다음
                                </Button>
                            </div>
                        </>
                    )}
                    {clubCreateIndex === 2 && (
                        <>
                            <div>
                                {/* 활동 시간 로티 */}
                                <Lottie
                                    options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: timeAnimation,
                                        rendererSettings: {
                                            preserveAspectRatio: 'xMidYMid slice',
                                        },
                                    }}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div>
                                <p className="text-center font-gmarketSansRegular">클럽 활동 시간을 설정해주세요.</p>
                                <div className="grid w-full gap-4 px-4 py-4">
                                    <div className="flex items-center justify-center">
                                        <Label htmlFor="activityEndTime" className="mr-4">
                                            활동 시간
                                        </Label>
                                        <TimePicker
                                            label="hh:mm aa"
                                            value={activityStartTime}
                                            onChange={(newValue) => setActivityStartTime(newValue)}
                                            sx={{ width: 100 }}
                                        />
                                        &nbsp;~&nbsp;
                                        <TimePicker
                                            label="hh:mm aa"
                                            value={activityEndTime}
                                            onChange={(newValue) => setActivityEndTime(newValue)}
                                            sx={{ width: 100 }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-around">
                                <Button size="sm" onClick={() => handleChangeContentSecondPrev(clubCreateIndex - 1)}>
                                    이전
                                </Button>
                                <Button size="sm" onClick={() => handleChangeContentSecondNext(clubCreateIndex + 1)}>
                                    다음
                                </Button>
                            </div>
                        </>
                    )}
                    {clubCreateIndex === 3 && (
                        <>
                            <div>
                                {/* 활동 지역 로티 */}
                                <Lottie
                                    options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: placeAnimation,
                                        rendererSettings: {
                                            preserveAspectRatio: 'xMidYMid slice',
                                        },
                                    }}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div>
                                <p className="text-center font-gmarketSansRegular">활동 지역을 설정해주세요. </p>
                                <div className="grid w-full gap-4 px-4 py-4 mt-4">
                                    <div className="flex items-center justify-center">
                                        <Label htmlFor="region" className="mr-28">
                                            광역시도
                                        </Label>
                                        <select
                                            className="absolute text-[calc(.8rem)]"
                                            name="location"
                                            value={selectedRegion}
                                            onChange={handleRegionChange}
                                        >
                                            <option value="">시</option>
                                            {regions.map((region) => (
                                                <option
                                                    key={region.id}
                                                    value={region.region}
                                                    className="font-pretendardBlack"
                                                >
                                                    {region.region}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Label htmlFor="districts" className="mr-28">
                                            시/군/구
                                        </Label>
                                        <select
                                            className="absolute ml-[calc(3rem)] text-[calc(.8rem)] w-[4.5rem]"
                                            name="district"
                                            value={selectedDistrict}
                                            onChange={handleDistrictChange}
                                        >
                                            <option value="">군/구</option>
                                            {regions
                                                .find((region) => region.region === selectedRegion)
                                                ?.districts.map((district) => (
                                                    <option
                                                        key={district}
                                                        value={district}
                                                        className="font-pretendardBlack"
                                                    >
                                                        {district}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-around mt-4">
                                <Button size="sm" onClick={() => handleChangeContentThirdPrev(clubCreateIndex - 1)}>
                                    이전
                                </Button>
                                <Button size="sm" onClick={() => handleChangeContentThirdNext(clubCreateIndex + 1)}>
                                    다음
                                </Button>
                            </div>
                        </>
                    )}
                    {clubCreateIndex === 4 && (
                        <>
                            <div>
                                {/* 경기 수준 로티 */}
                                <Lottie
                                    options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: playerAnimation,
                                        rendererSettings: {
                                            preserveAspectRatio: 'xMidYMid slice',
                                        },
                                    }}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div>
                                <p className="text-center font-gmarketSansRegular">클럽 경기 수준을 설정해주세요.</p>
                                <div className="w-full px-4 py-4 mt-4">
                                    <ChooseBadges setValue={setClubLevel} first="초급" second="중급" third="고급" />
                                </div>
                            </div>
                            <div className="flex flex-row justify-around mt-4">
                                <Button size="sm" onClick={() => handleChangeContentFourthPrev(clubCreateIndex - 1)}>
                                    이전
                                </Button>
                                <Button size="sm" type="submit" onClick={() => handleCreateClub()}>
                                    생성하기
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ClubCreateModal;
