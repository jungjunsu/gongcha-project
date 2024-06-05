import soccerfield from '@/assets/icons/soccerfield.svg';
function NotificationModal({ isOpen, onClose, type, data }) {
    if (!isOpen) return null;
  
    const handleAccept = () => {
      console.log(`${type} Accepted`, data);
      onClose();
    };
  
    const handleReject = () => {
      console.log(`${type} Rejected`, data);
      onClose();
    };


    const renderPlayerCards = (teamData) => { // 팀데이터 받은 후 출력
    
      return (
        <div className="soccer-field">
          
          {teamData.map((player, index) => ( // 팀원 선수마다 프로필 및 이름 출력
          <div key={index} className="player-card flex flex-col items-center justify-center m-0">
          <img src={player.image || defaultplayer} alt={player.name} className="player-image m-0" />
          <div className="player-name m-0">{player.name}</div>
          </div>

          ))}
        </div>
      );
    };
    const renderModalContent = () => {
      switch (type) {
          case 'player':
              // 선수가 팀에 요청 시 표기되는 정보
              return {
                  title: '선수 정보',
                  body: (
                      <div>
                          <ul>
                              <li>카드 ID: {data.data.card_id}</li>
                              <li>유저 ID: {data.data.user_id}</li>
                              <li>가치: {data.data.value}</li>
                              <li>슈팅: {data.data.shooting}</li>
                              <li>패스: {data.data.pass}</li>
                              <li>드리블: {data.data.dribble}</li>
                              <li>스피드: {data.data.speed}</li>
                          </ul>
                      </div>
                  ),
              };
          case 'team':
              // 팀 정보 출력
              return {
                  title: '팀 정보',
                  body: renderPlayerCards(data.data)

              };
          case 'match':
              // 매칭 정보 출력
              return {
                  title: '매칭 요청',
                  body: renderPlayerCards(data.data),
              };
          default:
              // 정보 못 받을 경우 출력
              return {
                  title: '에러',
                  body: '알림이 없습니다.',
              };
      }
  };
  
    const { title, body } = renderModalContent();
  
    return (
      <div className="fixed flex-row inset-0 z-50 flex items-center justify-center overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          {/* 오버레이*/}
          <div className="fixed inset-0 z-0 bg-black opacity-50"></div>
  
          {/* 모달 내용 */}
          <div className="relative z-50 w-full bg-white rounded-lg shadow-lg outline-none focus:outline-none">
            {/* 모달 제목 */}
            <div className="flex items-center justify-center p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
            </div>
  
            {/* 모달 바디 */}
            <div className="relative p-6 flex-col">
              <p className="my-4 text-gray-600 text-lg leading-relaxed">{body}</p>
            </div>
  
            {/* 모달 푸터 */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              {/* 수락 버튼 */}
              <button
                className="text-white bg-gray-300 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleAccept}
              > 
                수락하기
              </button> 
              {/* 거절 버튼 */}
              <button
                className="text-white bg-gray-300 border border-solid  hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleReject}
              >
                거절하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotificationModal;
  