import { create } from 'zustand';

import profileImage from '@/data/dummyImages/dummyProfileImage3.png';

export const useCardStore = create((set) => ({
    myCardData: {
        userId: 0,
        name: '정준수',
        profileImage: profileImage,
        SHO: 95,
        PAS: 90,
        DRI: 97,
        PAC: 90,
        MAN: 100,
    },
}));
