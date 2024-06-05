import React from 'react';

function PlayerModal({ isOpen, onClose, player }) {
  if (!isOpen || !player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-50"></div>
        
        {/* Modal Content */}
        <div className="relative z-50 bg-white rounded-lg shadow-lg">
          {/* Close Button */}
          <button
            onClick={onClose} 
            className="absolute top-3 left-3 w-6 h-6 bg-[#FF5F51] rounded-full shadow-sm text-white flex items-center justify-center text-xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Modal Header */}
          <div className="flex items-center justify-center p-5 border-b border-gray-300 rounded-t">
            <h3 className="text-3xl font-semibold">선수 정보</h3>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <ul className="text-gray-600 text-lg leading-relaxed">
              <li>이름: {player.data.user_id}</li>
              <li>시간: {player.data.start_time}~{player.data.end_time}</li>
              <li>요일: {player.data.day_of_week}</li>
              <li>경기 방식: {player.data.match_type}</li>
              <li>나의 한마디: {player.data.info}</li>
              <li>난이도: {player.data.difficulty}</li>
            </ul>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-center p-6 border-t border-gray-300 rounded-b">
            <button
              className="text-white bg-gray-300 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={onClose}
            >
              수락하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerModal;
