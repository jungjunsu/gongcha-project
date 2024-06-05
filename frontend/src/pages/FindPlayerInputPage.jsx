import { TimePicker } from '@mui/x-date-pickers';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TiArrowBackOutline } from 'react-icons/ti';
import { Button } from '@/components/ui/button';

import AutoComplete from '@/components/AutoComplete';
import InputAndDelete from '@/components/InputAndDelete';
import ChooseBadges from '@/components/ChooseBadges';
import PlayerRegistration from '@/components/PlayerRegistration';

function FindPlayerInputPage() {
    const navigate = useNavigate();

    const [time, setTime] = useState(null);
    const [place, setPlace] = useState('');
    const [text, setText] = useState('');
    const [gender, setGender] = useState('');
    const [inOrOut, setInOrOut] = useState('');
    const [level, setLevel] = useState('');
    const [totalPeople, setTotalPeople] = useState('');
    const [currentPeople, setCurrentPeople] = useState('');
    const [writer, setWriter] = useState('');

    const handleGoBack = () => {
        navigate('/findplayer/board');
    };

    // useEffect(() => {
    //     console.log(gender, inOrOut, level);
    // }, [gender, inOrOut, level]);

    return (
        <div className="px-2 mt-4">
            <div className="flex flex-row">
                <TiArrowBackOutline size={'1.5rem'} onClick={handleGoBack} />
                &nbsp;&nbsp;&nbsp;
                <p className="text-2xl font-ygJalnan">선수 구해요 게시글 등록</p>
            </div>
            <Accordion type="single" collapsible className="w-full mt-8">
                {/* 시간 등록 */}
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <span>약속시간</span>
                        <span>{time ? time.format('HH:mm') : '시간을 선택해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <TimePicker label="hh:mm aa" value={time} onChange={(newValue) => setTime(newValue)} />
                    </AccordionContent>
                </AccordionItem>
                {/* 장소 등록 */}
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <span>구장명</span>
                        <span>{place ? place : '구장을 선택해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <AutoComplete place={place} setPlace={setPlace} />
                    </AccordionContent>
                </AccordionItem>
                {/* 한 마디 등록 */}
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        <span>모집 한마디</span>
                        <span>{text ? text : '간단한 소개를 해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <InputAndDelete text={text} setText={setText} />
                    </AccordionContent>
                </AccordionItem>
                {/* 성별 등록 */}
                <AccordionItem value="item-4">
                    <AccordionTrigger>
                        <span>성별</span>
                        <span>{gender ? gender : '성별을 선택해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <ChooseBadges setValue={setGender} first="남자" second="여자" third="남녀무관" />
                    </AccordionContent>
                </AccordionItem>
                {/* 실내외 등록 */}
                <AccordionItem value="item-5">
                    <AccordionTrigger>
                        <span>실내외</span>
                        <span>{inOrOut ? inOrOut : '실내외를 선택해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <ChooseBadges setValue={setInOrOut} first="실내" second="실외" third="실내외" />
                    </AccordionContent>
                </AccordionItem>
                {/* 난이도 등록 */}
                <AccordionItem value="item-6">
                    <AccordionTrigger>
                        <span>난이도</span>
                        <span>{level ? level : '난이도를 선택해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <ChooseBadges setValue={setLevel} first="초급" second="중급" third="고급" />
                    </AccordionContent>
                </AccordionItem>
                {/* 경기 선수 등록 */}
                <AccordionItem value="item-7">
                    <AccordionTrigger>
                        <span>경기선수</span>
                        {/* TODO */}
                        <span>{level ? level : '경기선수를 선택해주세요'}</span>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center p-2">
                        <PlayerRegistration />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex justify-center mt-8">
                <Button variant="default" className="w-40">
                    등록
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="destructive" className="w-40">
                    취소
                </Button>
            </div>
        </div>
    );
}
export default FindPlayerInputPage;
