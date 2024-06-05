// 알람 모달 출력 위한 더미데이터 모음 (선수,팀,매칭)
import defaultplayer from '@/assets/icons/defaultplayer.svg';
const dummyAlarms = [
  { id: 1,     
    content: '선수가 모집요청을 보냈어요',
    data: {
    card_id: '12345',
    user_id: '67890',
    value: 75,
    shooting: 80,
    pass: 70,
    dribble: 85,
    speed: 90
  }, type: 'player'

 },
  { id: 2, content: '팀에서 모집 요청을 보냈어요' ,
  data: [
    { name: '엄준식', image: defaultplayer},
    { name: '김찬호', image: defaultplayer},
    { name: '장지환', image: defaultplayer},
  ],

  type: 'team' },
  { id: 3, content: '매칭 요청이 왔어요',   data: [
    { name: '엄준식', image: defaultplayer},
    { name: '김찬호', image: defaultplayer},
    { name: '장지환', image: defaultplayer},
  ],type: 'match' }
  ];
  
  export default dummyAlarms;
  