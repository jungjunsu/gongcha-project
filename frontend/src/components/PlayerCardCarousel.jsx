import dummySilverLeager from '@/data/dummyImages/dummySilverLeager.png';
import { useEffect } from 'react';

function PlayerCardCarousel({ player }) {
    if (!player || Object.keys(player).length === 0) {
        return null;
    }

    // 기존의 console.error 함수를 백업합니다.
    const originalConsoleError = console.error;

    console.error = (...args) => {
        // 숨기고 싶은 오류 메시지가 포함된 경우, 로그를 출력하지 않습니다.
        if (/Expected static flag was missing/.test(args[0])) {
            return;
        }

        // 그 외의 경우에는 기존의 console.error 함수를 사용합니다.
        originalConsoleError(...args);
    };

    const value = parseInt((player.SHO + player.PAS + player.DRI + player.PAC) / 4);

    useEffect(() => {
        const cardElement = document.getElementById('playerCard');

        if (cardElement) {
            cardElement.classList.add('shine');
        }
    }, []);

    return (
        <div className="parentWithShadow">
            <div id="playerCard" className="absolute top-[calc(-3px)] left-[calc(0.2rem)] w-36 h-36">
                <img className="absolute rounded-t-lg" src={dummySilverLeager} alt="카드" />
                <div className="absolute flex flex-col items-center justify-center w-full h-full">
                    <img
                        className="absolute mx-auto left-10 bottom-4 max-w-24 max-h-24"
                        src={player.profileImage}
                        alt={player.name}
                    />
                    <h3 className="absolute mt-[calc(134px)] text-xs text-center text-white font-pretendardBlack">
                        {player.name}
                    </h3>

                    <div className="absolute flex flex-col justify-center top-[100%]">
                        <div className="flex">
                            <p className="text-xs text-center text-white font-pretendardRegular">{player.SHO} SHO</p>
                            <p className="ml-4 text-xs text-center text-white font-pretendardRegular">
                                {player.PAS} PAS
                            </p>
                        </div>
                        <div className="flex">
                            <p className="text-xs text-center text-white font-pretendardRegular">{player.DRI} DRI</p>
                            <p className="ml-auto text-xs text-center text-white font-pretendardRegular">
                                {player.PAC} SPD
                            </p>
                        </div>
                    </div>

                    <p className="absolute text-xs text-white left-6 top-10 font-pretendardBlack">{value}</p>
                    <p className="absolute text-xs text-white left-5 top-24 font-pretendardBlack">
                        {player.MAN}
                        <br></br> MAN
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PlayerCardCarousel;
