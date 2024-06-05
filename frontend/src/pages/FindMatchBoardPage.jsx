import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import lArrowIcon from '@/assets/icons/lArrow.svg';
import DatePicker from '@/components/DatePicker';
import { InputWithButton } from '@/components/InputWithButton';
import { Button } from '@/components/ui/button';
import SelectCollection from '@/components/SelectCollection';
import FindMatchBoard from '@/components/FindMatchBoard';
import { useFindMatchBoardStore } from '@/stores/findMatchBoardStore';

import { getMatchingList } from '@/apis/api/match';

const date = new Date();

function formatDateWithDayShort(date) {
    // 날짜와 요일을 별도로 추출
    const day = date.getDate(); // '일' (날짜)
    const options = { weekday: 'short' }; // '요일'을 짧은 형태로
    const weekday = date.toLocaleDateString('ko-KR', options).replace('.', ''); // '일', '월', '화', ...

    // 원하는 형식으로 문자열 조합
    return `${day} ${weekday}`;
}

function extractDayAndWeekday(datetimeStr) {
    // 문자열에서 날짜(일)와 요일을 추출
    const parts = datetimeStr.split(' '); // 공백으로 문자열을 분리
    const datePart = parts[0]; // '2024-05-03'
    const day = datePart.split('-')[2]; // '03'
    const weekday = parts[1]; // '금요일'

    // 요일의 첫 글자만 사용
    const weekdayShort = weekday[0]; // '금'

    // 추출한 날짜와 요일을 원하는 형식으로 조합
    return `${day} ${weekdayShort}`;
}

function FindMatchBoardPage() {
    const navigate = useNavigate();
    const {
        MatchingBoardListResponse,
        setMatchingBoardListResponse,
        SelectedDateMatchingBoardList,
        setSelectedDateMatchingBoardList,
    } = useFindMatchBoardStore();

    const [dateActiveIndex, setDateActiveIndex] = useState(formatDateWithDayShort(date));

    useEffect(() => {
        getMatchingList(
            (success) => {
                console.log('매칭 게시판 전체 조회 성공', success);
                setMatchingBoardListResponse([...success.data.data.content]); // 상태 업데이트 함수 사용
                console.log(MatchingBoardListResponse);
            },
            (fail) => {
                console.log('매칭 게시판 전체 조회 실패', fail);
            }
        );
    }, []);

    // 전체 조회한 것 중에서 클릭한 날짜와 일치한 것만 반환하기
    useEffect(() => {
        // MatchingBoardListResponse.map((value, index) => {
        //     if (extractDayAndWeekday(value.date) === dateActiveIndex) {
        //         console.log('게시글의 날짜와 일치');
        //         setSelectedDateMatchingBoardList(...MatchingBoardListResponse[index]);
        //         console.log(SelectedDateMatchingBoardList);
        //     } else {
        //         console.log('게시글의 날짜와 불일치');
        //     }
        // });

        // 조건에 맞는 객체들을 필터링
        const filteredList = MatchingBoardListResponse.filter(
            (value) => extractDayAndWeekday(value.date) === dateActiveIndex
        );

        // 필터링된 결과를 설정
        setSelectedDateMatchingBoardList(filteredList);
        console.log('filteredList', filteredList);
    }, [dateActiveIndex, MatchingBoardListResponse, setSelectedDateMatchingBoardList]);

    useEffect(() => {
        console.log('SelectedDateMatchingBoardList', SelectedDateMatchingBoardList);
    }, [SelectedDateMatchingBoardList]);

    const handleBackClick = () => {
        navigate('/main');
    };
    const handleOpenFindMatchInput = () => {
        navigate('/findmatch/input');
    };
    return (
        <div className="px-2 mt-4">
            <div
                onClick={handleBackClick}
                className="absolute left-[calc(.7rem)] top-[calc(2.0rem)] w-[calc(1.5625rem)] h-[calc(1.875rem)] cursor-pointer"
            >
                <img src={lArrowIcon} alt="돌아가기" />
            </div>
            {/* 제목 */}
            <div className="mt-16 ml-4 text-xl font-ygJalnan">매칭해요</div>
            {/* 검색창 */}
            <div className="flex justify-end mt-4">
                <InputWithButton />
            </div>
            <div className="mt-4" /> {/* 공백 */}
            {/* 날짜 슬라이더 */}
            <DatePicker selectedDate={dateActiveIndex} setSelectedDate={setDateActiveIndex} />
            <div className="mt-4" /> {/* 공백 */}
            {/* 선택 탭들 */}
            {/* <SelectCollection /> */}
            {/* 게시글 작성 버튼 */}
            <div className="flex justify-end mt-4">
                <Button className="h-8" onClick={() => handleOpenFindMatchInput()}>
                    게시글 작성하기
                </Button>
            </div>
            {/* 게시판 출력 */}
            <FindMatchBoard />
        </div>
    );
}
export default FindMatchBoardPage;
