import { create } from 'zustand';

export const useDateStore = create((set) => {
    // dateList를 생성하는 로직
    const dateList = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);

        // 날짜와 요일을 포맷팅합니다.
        const day = date.getDate(); // '일' 정보를 숫자만으로 표현
        // const day = date.toLocaleDateString('ko-KR', { day: 'numeric' }); // '일' 정보
        const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' }); // '요일' 정보

        dateList.push({ day: `${day}`, weekday: `${weekday}` });
    }

    // 초기 상태 객체에 계산된 dateList를 포함시킵니다.
    return {
        dateList: dateList,
    };
});
