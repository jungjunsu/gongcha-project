import profileImage from '@/data/dummyImages/dummyProfileImage.png';
import fieldImage1 from '@/data/dummyImages/dummyFieldImage1.png';
import fieldImage2 from '@/data/dummyImages/dummyFieldImage2.png';
import fieldImage3 from '@/data/dummyImages/dummyFieldImage3.png';
import fieldImage4 from '@/data/dummyImages/dummyFieldImage4.png';
import fieldImage5 from '@/data/dummyImages/dummyFieldImage5.png';
import fieldImage6 from '@/data/dummyImages/dummyFieldImage6.png';

const myPageDummyData = {
    name: '홍길동',
    profileImage : profileImage,
};

const playScheduleDummyData = [
    {
        key: 0,
        place: '둔디기 엄북동 엄사몰 A구장',
        location: '서울 송파구 백제 고분로18-3',
        images: [fieldImage1],
        date: '2024.03.07 목',
        time: '10:00',
        tags: ['남녀무관', '중급', '실내','5VS5'],
        state: 'matching_active',
    },
    {
        key: 1,
        place: '둔데기 엄북동 B구장',
        location: '서울 송파구 백제 고분로18-3',
        images: [fieldImage1, fieldImage2],
        date: '2024.03.08 금',
        time: '10:00',
        tags: ['남자', '초급', '실외', '7VS7'],
        state: 'matching_inactive',
    },
    {
        key: 2,
        place: '단디기 엄북몰 C구장',
        location: '서울 송파구 백제 고분로18-3',
        images: [fieldImage1, fieldImage2, fieldImage3, fieldImage4, fieldImage5, fieldImage6],
        date: '2024.03.09 토',
        time: '10:00',
        tags: ['남자', '초급', '실내외', '7VS7'],
        state: 'recruitment_active',
    },
    {
        key: 3,
        place: '단데기 엄북몰 D구장',
        location: '서울 송파구 백제 고분로18-3',
        images: [],
        date: '2024.03.09 토',
        time: '15:00',
        tags: ['남자', '중급', '실외', '4VS4'],
        state: 'recruitment_inactive',
    },
];
  
export { myPageDummyData, playScheduleDummyData };
  