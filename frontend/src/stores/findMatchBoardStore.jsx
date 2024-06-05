import { create } from 'zustand';

export const useFindMatchBoardStore = create((set) => ({
    dummyFindMatchList: [
        {
            clubIcon: 'ManchesterCity',
            clubName: '맨 시티',
            averageStat: '400',
            place: '서울 관악구',
            level: '초급',
            headCount: '5vs5',
            date: '5월 6일 월요일',
            time: '10:00',
            introduce: '안녕하세요 경기 재밌게 해봐요',
        },
        {
            clubIcon: 'TottenhamHotspur',
            clubName: '토트넘 홋스퍼',
            averageStat: '480',
            place: '대전 유성구',
            level: '중급',
            headCount: '5vs5',
            date: '5월 7일 화요일',
            time: '10:00',
            introduce: '안 다치게 조심히 안전하게 경기 즐겨요',
        },
    ],
    MatchingBoardCreateRequest: {
        date: '',
        region: '',
        district: '',
        info: '',
        difficulty: '',
    },
    MatchingBoardListResponse: [],
    setMatchingBoardListResponse: (data) => set({ MatchingBoardListResponse: data }),
    SelectedDateMatchingBoardList: [],
    setSelectedDateMatchingBoardList: (data) => {
        console.log('Setting SelectedDateMatchingBoardList:', data);
        set({ SelectedDateMatchingBoardList: data });
    },
    MatchBoardDetailResponse: {},
    setMatchBoardDetailResponse: (data) => set({ MatchBoardDetailResponse: data }),
}));
