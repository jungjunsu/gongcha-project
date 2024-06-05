import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimePicker } from '@mui/x-date-pickers';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFindMatchBoardStore } from '@/stores/findMatchBoardStore';
import { useRegionStore } from '@/stores/regionStore';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TiArrowBackOutline } from 'react-icons/ti';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import AutoComplete from '@/components/AutoComplete';
import InputAndDelete from '@/components/InputAndDelete';
import ChooseBadges from '@/components/ChooseBadges';
import PlayerRegistration from '@/components/PlayerRegistration';

import { postMatchingCreate } from '@/apis/api/match';

function FindMatchInputPage() {
    const navigate = useNavigate();
    const { regions } = useRegionStore();
    const { MatchingBoardCreateRequest } = useFindMatchBoardStore();

    const [date, setDate] = useState('');
    const [time, setTime] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [text, setText] = useState('');
    const [level, setLevel] = useState('');

    const handleGoBack = () => {
        navigate('/findmatch/board');
    };

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const handleCreateMatchBoard = () => {
        MatchingBoardCreateRequest.date = `${format(date, 'yyyy-MM-dd')} ${time.format('HH:mm')}`;
        MatchingBoardCreateRequest.region = selectedRegion;
        MatchingBoardCreateRequest.district = selectedDistrict;
        MatchingBoardCreateRequest.info = text;
        MatchingBoardCreateRequest.difficulty = level;
        console.log(MatchingBoardCreateRequest);
        postMatchingCreate(
            MatchingBoardCreateRequest,
            (success) => {
                console.log('매칭 게시판 생성 성공', success);
                navigate('/findmatch/board');
            },
            (fail) => {
                console.log('매칭 게시판 생성 실패', fail);
            }
        );
    };

    const handleResetMatchBoard = () => {
        setDate('');
        setTime(null);
        setSelectedRegion('');
        setSelectedDistrict('');
        setText('');
        setLevel('');
    };

    // useEffect(() => {
    //     console.log(gender, inOrOut, level);
    // }, [gender, inOrOut, level]);

    return (
        <div className="px-2 mt-4">
            <div className="flex flex-row">
                <TiArrowBackOutline size={'1.5rem'} onClick={handleGoBack} />
                &nbsp;&nbsp;&nbsp;
                <p className="text-2xl font-ygJalnan">매칭해요 게시글 등록</p>
            </div>
            <Accordion type="single" collapsible className="w-full mt-8">
                {/* 날짜 등록 */}
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <span>약속날짜</span>
                        <span>{date ? format(date, 'yyyy-MM-dd') : '날짜를 선택해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-[280px] justify-start text-left font-normal',
                                        !date && 'text-muted-foreground'
                                    )}
                                >
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </AccordionContent>
                </AccordionItem>
                {/* 시간 등록 */}
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <span>약속시간</span>
                        <span>{time ? time.format('HH:mm') : '시간을 선택해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <TimePicker label="hh:mm aa" value={time} onChange={(newValue) => setTime(newValue)} />
                    </AccordionContent>
                </AccordionItem>
                {/* 장소 등록 */}
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        <span>지역</span>
                        <span>
                            {selectedRegion && selectedDistrict
                                ? `${selectedRegion} ${selectedDistrict}`
                                : '지역을 선택해주세요'}
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
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
                                        <option key={region.id} value={region.region} className="font-pretendardBlack">
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
                                            <option key={district} value={district} className="font-pretendardBlack">
                                                {district}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                {/* 한 마디 등록 */}
                <AccordionItem value="item-4">
                    <AccordionTrigger>
                        <span>모집 한마디</span>
                        <span>{text ? text : '간단한 소개를 해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <InputAndDelete text={text} setText={setText} />
                    </AccordionContent>
                </AccordionItem>
                {/* 난이도 등록 */}
                <AccordionItem value="item-5">
                    <AccordionTrigger>
                        <span>난이도</span>
                        <span>{level ? level : '난이도를 선택해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <ChooseBadges setValue={setLevel} first="초급" second="중급" third="고급" />
                    </AccordionContent>
                </AccordionItem>
                {/* 경기 선수 등록 */}
                {/*  <AccordionItem value="item-6">
                    <AccordionTrigger>
                        <span>경기선수</span>
                        <span>{level ? level : '경기선수를 선택해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <PlayerRegistration />
                    </AccordionContent>
                </AccordionItem> */}
            </Accordion>
            <div className="flex justify-center mt-8">
                <Button variant="default" className="w-40" onClick={() => handleCreateMatchBoard()}>
                    등록
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="destructive" className="w-40" onClick={() => handleResetMatchBoard()}>
                    취소
                </Button>
            </div>
        </div>
    );
}
export default FindMatchInputPage;
