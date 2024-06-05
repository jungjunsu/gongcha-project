import { useNavigate } from 'react-router-dom';
import { useFindPlayerBoardStore } from '@/stores/findPlayerBoardStore';

function FindPlayerBoard() {
    const navigate = useNavigate();
    const { dummyFindPlayerList } = useFindPlayerBoardStore();
    const handleOpenFindPlayerDetail = (value) => {
        // console.log(value);
        // updateFindPlayerBoardStore로 게시글 설정
        navigate(`/findplayer/detail/${value.key}`);
    };
    return (
        <>
            {/* dummy를 real로 변경 필요 */}
            {dummyFindPlayerList.map((value, index) => (
                <div
                    key={index}
                    className="grid grid-cols-5 gap-4 mt-4 text-center border border-solid rounded-lg"
                    onClick={() => handleOpenFindPlayerDetail(value)}
                >
                    <div className="flex flex-col justify-center pl-2 text-xl font-pretendardBold">{value.time}</div>
                    <div className="flex flex-col justify-center col-span-3">
                        <div className="font-pretendardBold">{value.place}</div>
                        <div className="text-xs font-pretendardRegular text-neutral-500">
                            •{value.gender}&nbsp;&nbsp;•{value.inOrOut}&nbsp;&nbsp;•{value.level}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center pr-2">
                        <div className="text-lg font-pretendardBold">
                            {value.currentPeople}/{value.totalPeople}
                        </div>
                        <div className="text-sm font-pretendardRegular">{value.writer}</div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default FindPlayerBoard;
