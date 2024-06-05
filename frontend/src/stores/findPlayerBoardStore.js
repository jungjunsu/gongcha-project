import { create } from 'zustand';

import fieldImage1 from '@/data/dummyImages/dummyFieldImage1.png';
import fieldImage2 from '@/data/dummyImages/dummyFieldImage2.png';
import fieldImage3 from '@/data/dummyImages/dummyFieldImage3.png';
import fieldImage4 from '@/data/dummyImages/dummyFieldImage4.png';
import fieldImage5 from '@/data/dummyImages/dummyFieldImage5.png';
import fieldImage6 from '@/data/dummyImages/dummyFieldImage6.png';

import manchesterCity from '@/assets/examples/manchester-city.svg';
import tottenhamHotspur from '@/assets/examples/tottenham-hotspur.svg';

export const useFindPlayerBoardStore = create((set) => ({
    dummyFindPlayerList: [
        {
            key: 1,
            date: '2024.03.07 목',
            time: '10:00',
            images: [fieldImage1],
            place: '서울 은평 롯데몰 B구장',
            location: '서울 송파구 백제 고분로18-3',
            text: '포지션 상관없이 같이 풋살 즐겨요',
            gender: '남녀무관',
            inOrOut: '실내',
            level: '초급',
            totalPeople: '5',
            currentPeople: '3',
            writer: '홍길동',
        },
        {
            key: 2,
            date: '2024.03.07 목',
            time: '10:00',
            images: [fieldImage1, fieldImage2],
            place: '서울 은평 롯데몰 B구장',
            location: '서울 송파구 백제 고분로18-3',
            text: '포지션 상관없이 같이 풋살 즐겨요',
            gender: '남녀무관',
            inOrOut: '실내',
            level: '중급',
            totalPeople: '5',
            currentPeople: '3',
            writer: '우기명',
        },
        {
            key: 3,
            date: '2024.03.07 목',
            time: '10:00',
            images: [fieldImage1, fieldImage2, fieldImage3, fieldImage4, fieldImage5, fieldImage6],
            place: '서울 은평 롯데몰 B구장',
            location: '서울 송파구 백제 고분로18-3',
            text: '포지션 상관없이 같이 풋살 즐겨요',
            gender: '남녀무관',
            inOrOut: '실내',
            level: '중급',
            totalPeople: '5',
            currentPeople: '3',
            writer: '김싸피',
        },
    ],
    dummyFindMatchList: [
        {
            clubIcon: manchesterCity,
            clubName: '맨 시티',
            averageStat: '400',
            place: '서울 관악구',
            level: '초급',
            headCount: '5vs5',
        },
        {
            clubIcon: tottenhamHotspur,
            clubName: '토트넘 홋스퍼',
            averageStat: '480',
            place: '대전 유성구',
            level: '중급',
            headCount: '5vs5',
        },
    ],
    findPlayerList: [], // read
    createFindPlayerBoard: (time, place, text, gender, inOrOut, level, totalPeople, currentPeople, writer) =>
        set((prev) => [
            ...prev.findPlayerList,
            {
                time: time,
                place: place,
                text: text,
                gender: gender,
                inOrOut: inOrOut,
                level: level,
                totalPeople: totalPeople,
                currentPeople: currentPeople,
                writer: writer,
            },
        ]),
    updateFindPlayerBoard: (time, place, text, gender, inOrOut, level, totalPeople, currentPeople, writer) =>
        set((prev) => [
            ...prev.findPlayerList,
            {
                time: time,
                place: place,
                text: text,
                gender: gender,
                inOrOut: inOrOut,
                level: level,
                totalPeople: totalPeople,
                currentPeople: currentPeople,
                writer: writer,
            },
        ]),
    removeFindPlayerBoard: (writer) =>
        set((prev) => ({ findPlayerList: prev.findPlayerList.filter((e) => e.writer !== writer) })),
}));
