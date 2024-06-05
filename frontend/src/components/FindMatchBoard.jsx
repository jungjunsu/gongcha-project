import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFindMatchBoardStore } from '@/stores/findMatchBoardStore';

import ManchesterCity from '@/assets/examples/manchester-city.svg';
import TottenhamHotspur from '@/assets/examples/tottenham-hotspur.svg';
import { Split } from 'lucide-react';

function FindMatchBoard() {
    const navigate = useNavigate();
    const { dummyFindMatchList, SelectedDateMatchingBoardList, setSelectedDateMatchingBoardList } =
        useFindMatchBoardStore();

    // 데이터 목록과 로딩 상태를 관리합니다.
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startIndex, setStartIndex] = useState(0); // 시작 인덱스를 관리하는 상태 추가
    // 마지막 요소를 추적하기 위한 ref 생성
    const observer = useRef();

    useEffect(() => {
        // 데이터 초기화
        setItems([]);
        setStartIndex(0);

        fetchMoreItems();
    }, [SelectedDateMatchingBoardList]);

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
        if (startIndex >= SelectedDateMatchingBoardList.length) return; // 모든 데이터를 이미 불러왔다면 더 이상 진행하지 않음
        setLoading(true);
        // 예시: 임의의 데이터를 더 불러온다고 가정합니다.
        setTimeout(() => {
            const nextItems = SelectedDateMatchingBoardList.slice(startIndex, startIndex + 10);
            setItems((prevItems) => [...prevItems, ...nextItems]);
            setStartIndex((prevStartIndex) => prevStartIndex + 10);
            setLoading(false);
        }, 1000);
    };

    const handleOpenFindMatchDetail = (id) => {
        // console.log(value);
        // updateFindPlayerBoardStore로 게시글 설정
        navigate(`/findmatch/detail/${id}`);
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
        <>
            {/* dummy를 real로 변경 필요 */}
            {items.length === 0 && !loading && (
                <p className="mt-10 text-center font-gmarketSansBold">No matches found</p>
            )}
            {items.map((value, index) => (
                <div
                    key={index}
                    ref={index === items.length - 1 ? lastItemRef : null}
                    className="grid grid-cols-4 gap-4 p-2 mt-4 border border-solid rounded-lg"
                    onClick={() => handleOpenFindMatchDetail(value.id)}
                >
                    <div className="flex flex-row items-center justify-center pl-2 text-xl font-pretendardBold">
                        <img src={ManchesterCity} alt="" />
                        {/* <img src={value.teamPic} alt="팀 로고" /> */}
                    </div>
                    <div className="flex flex-col justify-center col-span-2">
                        <div className=" font-pretendardBold">{value.captainName}님의 팀</div>
                        <div className="text-xs font-pretendardRegular text-neutral-500">
                            •{value.region} {value.district}&nbsp;&nbsp;•{value.difficulty}&nbsp;&nbsp;•
                            {value.playerNum}vs{value.playerNum}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-lg font-pretendardBold">{value.date.split(' ')[2]}</div>
                    </div>
                </div>
            ))}
            {loading && <p className="mt-10 text-center font-gmarketSansBold">Loading...</p>}
        </>
    );
}

export default FindMatchBoard;
