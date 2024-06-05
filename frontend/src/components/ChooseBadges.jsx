import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

function ChooseBadges({ setValue, first, second, third }) {
    const [badges, setBadges] = useState({
        first: false,
        second: false,
        third: false,
    });

    const handleBadgeClick = (badge) => {
        setBadges({
            first: false,
            second: false,
            third: false,
            [badge]: true,
        });
    };

    // useEffect(() => {
    //     // badges의 상태가 변경될 때마다 실행
    //     const allFalse = Object.values(badges).every((value) => value === false);
    //     if (allFalse) {
    //         setGender(null);
    //     } else {
    //         for (const badge in badges) {
    //             if (badges[badge]) {
    //                 setGender(badge);
    //                 break;
    //             }
    //         }
    //     }
    // }, [badges, setGender]);

    useEffect(() => {
        // badges의 상태가 변경될 때마다 실행
        const selectedBadge = Object.keys(badges).find((badge) => badges[badge] === true);
        if (selectedBadge) {
            // selectedBadge의 실제 값을 찾아서 setGender에 전달합니다.
            const actualValue = selectedBadge === 'first' ? first : selectedBadge === 'second' ? second : third;
            setValue(actualValue);
        } else {
            setValue(null);
        }
    }, [badges, setValue]);

    return (
        <div className="flex flex-row w-full justify-evenly">
            <Badge variant={badges.first ? 'default' : 'outline'} onClick={() => handleBadgeClick('first')}>
                {first}
            </Badge>
            <Badge variant={badges.second ? 'default' : 'outline'} onClick={() => handleBadgeClick('second')}>
                {second}
            </Badge>
            <Badge variant={badges.third ? 'default' : 'outline'} onClick={() => handleBadgeClick('third')}>
                {third}
            </Badge>
        </div>
    );
}

export default ChooseBadges;
