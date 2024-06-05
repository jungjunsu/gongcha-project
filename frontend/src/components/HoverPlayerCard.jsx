import { useState, useEffect } from 'react';
// import { useCardStore } from '@/stores/cardStore';
import PlayerCardCarousel from '@/components/PlayerCardCarousel';

function HoverPlayerCard({ cardInfo, index, position }) {
    // const { myCardData } = useCardStore();

    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        // console.log(cardInfo);

        setProfileData({
            name: cardInfo.userName,
            profileImage: cardInfo.profileImage,
            SHO: cardInfo.shooting,
            PAS: cardInfo.pass,
            DRI: cardInfo.dribble,
            PAC: cardInfo.speed,
            MAN: cardInfo.manner,
        });
    }, []);
    return (
        <div
            className="absolute inset-0 z-50 bg-transparent"
            style={{ top: position.top - 144 + 'px', left: position.left - 12 + 'px' }}
        >
            <div className="relative w-40 mx-auto bg-transparent aspect-square h-52 rounded-xl">
                {/* index로 axios get 클럽 소속 요청 */}
                {/* <p>{index}</p> */}
                <PlayerCardCarousel player={profileData} />
            </div>
        </div>
    );
}

export default HoverPlayerCard;
