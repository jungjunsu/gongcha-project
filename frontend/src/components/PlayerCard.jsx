import React, { useState } from 'react';
import bronzeLeager from '@/assets/images/bronzeLeager.png';
import silverLeager from '@/assets/images/silverLeager.png';
import goldLeager from '@/assets/images/goldLeager.png';

function PlayerCard({ player, className }) {
    if (!player || Object.keys(player).length === 0) {
        return null;
    }

    const [shine, setShine] = useState(false);

    const value = parseInt((player.shooting + player.pass + player.dribble + player.pass + player.manner) / 5) || 0;

    React.useEffect(() => {
        setShine(true);
    }, []);

    let cardImage;

    if (value <= 69) {
        cardImage = bronzeLeager;
    } else if (value >= 70 && value <= 79) {
        cardImage = silverLeager;
    } else if (value >= 80) {
        cardImage = goldLeager;
    }

    return (
        <div className={`parentWithShadow ${className}`}>
            <div
                id="playerCard"
                className={`absolute left-[calc(-7.5rem)] top-[50%] w-[15.625rem] h-[24.360rem] ${
                    shine ? 'shine' : ''
                }`}
            >
                <img className="absolute rounded-t-lg" src={cardImage} alt="카드" />
                <div className="absolute flex flex-col items-center justify-center w-full h-full">
                    <img
                        className="absolute left-20 bottom-[10.5rem] mx-auto max-w-[10rem] max-h-[10rem]"
                        src={player.profileUrl}
                        alt={player.userName}
                    />
                    <h3 className="absolute mt-20 text-center text-white font-pretendardBlack">{player.userName}</h3>

                    <div className="absolute flex flex-col justify-center top-[63%]">
                        <div className="flex">
                            <p className="text-center text-white font-pretendardBlack">{player.shooting} SHO</p>
                            <p className="ml-4 text-center text-white font-pretendardBlack">{player.pass} PAS</p>
                        </div>
                        <div className="flex">
                            <p className="text-center text-white font-pretendardBlack">{player.dribble} DRI</p>
                            <p className="ml-auto text-center text-white font-pretendardBlack">{player.speed} SPD</p>
                        </div>
                    </div>

                    <p className="absolute text-3xl text-white left-8 top-16 font-pretendardBlack">{value}</p>
                    <p className="absolute text-white left-8 top-26 font-pretendardBlack">
                        {player.manner}
                        <br></br> MAN
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;
