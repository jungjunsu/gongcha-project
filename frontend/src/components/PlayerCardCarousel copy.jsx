import dummySilverLeager from '@/data/dummyImages/dummySilverLeager.png';
import { useEffect } from 'react';

// PlayerCard 원본을 작게 디자인하기 위해 참고하는 PlayerCard 원본 파일입니다.

function PlayerCardCarousel({ player }) {
    if (!player || Object.keys(player).length === 0) {
        return null;
    }

    const value = parseInt((player.SHO + player.PAS + player.DRI + player.PAC + player.MAN) / 5);

    useEffect(() => {
        const cardElement = document.getElementById('playerCard');

        if (cardElement) {
            cardElement.classList.add('shine');
        }
    }, []);

    return (
        <div className="parentWithShadow">
            <div id="playerCard" className="absolute transform -translate-x-1/2 w-[15.625rem] h-[24.360rem]">
                <img className="absolute rounded-t-lg" src={dummySilverLeager} alt="카드" />
                <div className="absolute flex flex-col items-center justify-center w-full h-full">
                    <img
                        className="absolute left-20 bottom-[10.5rem] mx-auto max-w-[10rem] max-h-[10rem]"
                        src={player.profileImage}
                        alt={player.name}
                    />
                    <h3 className="absolute mt-20 text-center text-white font-pretendardBlack">{player.name}</h3>

                    <div className="absolute flex flex-col justify-center top-[63%]">
                        <div className="flex">
                            <p className="text-center text-white font-pretendardBlack">{player.SHO} SHO</p>
                            <p className="ml-4 text-center text-white font-pretendardBlack">{player.PAS} PAS</p>
                        </div>
                        <div className="flex">
                            <p className="text-center text-white font-pretendardBlack">{player.DRI} DRI</p>
                            <p className="ml-auto text-center text-white font-pretendardBlack">{player.PAC} SPD</p>
                        </div>
                    </div>

                    <p className="absolute text-3xl text-white left-8 top-16 font-pretendardBlack">{value}</p>
                    <p className="absolute text-white left-8 top-26 font-pretendardBlack">
                        {player.MAN}
                        <br></br> MAN
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PlayerCardCarousel;
