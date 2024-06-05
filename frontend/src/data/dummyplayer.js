import defaultplayer from '@/assets/icons/defaultplayer.svg';
const dummyPlayer = [
  { id: 1,     
    content: '정준수',
    data: {
    user_id: '정준수',
    match_type: "친선",
    start_time : "13:00",
    end_time : "16:00",
    day_of_week : ["월", "수", "금"],
    region: "대전",
    district: "유성구",
    difficulty : "중급",
    info: "화이팅",
    isJoined: false,
    pass: 90,
    shooting: 70,
    dribble: 80,
    speed: 90
  }, type: 'player'

 },
 { id: 2,     
    content: '오치승',
    data: {
    user_id: '오치승',
    match_type: "내전",
    start_time : "12:00",
    end_time : "14:00",
    day_of_week : "월",
    region: "대전",
    district: "서구",
    difficulty : "초급",
    info: "열심히 하겠습니다",
    isJoined: false,
    pass: 70,
    shooting: 70,
    dribble: 90,
    speed: 60
  }, type: 'player'

 },
 { id: 3,     
    content: '우찬명',
    data: {
    user_id: '우찬명',
    match_type: "친선",
    start_time : "09:00",
    end_time : "22:00",
    day_of_week : ["월", "수", "금", "일"],
    region: "세종",
    district: "세종특별자치시",
    difficulty : "초급",
    info: "풋살 좋아합니다",
    isJoined: false,
    pass: 80,
    shooting: 80,
    dribble: 80,
    speed: 80
  }, type: 'player'

 },
  ];
  
  export default dummyPlayer;