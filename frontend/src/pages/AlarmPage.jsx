import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import Lottie from 'lottie-react';
import Modal from '@/components/Modal';
import alarmIcon from '@/assets/lottie/alarm';
import congratulationIcon from '@/assets/lottie/congratulation';
import versusIcon from '@/assets/lottie/versus';
import lArrowIcon from '@/assets/icons/lArrow.svg';
import { getNotice } from '@/apis/api/mypage';

function AlarmPage() {
  const [alarmList, setAlarmList] = useState([]);
  const [alarmDetail, setAlarmDetail] = useState({
    content: '',
    fromUser: '',
    toUser: '',
    read: false,
    push: false,
  });
  const [showManualModal, setShowManualModal] = useState(null);
  const [dragged, setDragged] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const dropzoneRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getNotice(
      (success) => {
        console.log(success.data.data);
        setAlarmList(success.data.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleManualClick = (index) => {
    setShowManualModal(index);
  };

  const closeModal = () => {
    setShowManualModal(null);
  };

  const handleOutsideClick = () => {
    closeModal();
  };

  const handleDragStart = (event) => {
    setDragged(event.target);
    event.target.classList.add('dragging');
    setIsTouch(false); // Reset touch state
  };

  const handleTouchStart = (event) => {
    setDragged(event.target);
    event.target.classList.add('dragging');
    setIsTouch(true);
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove('dragging');
  };

  const handleTouchEnd = (event) => {
    if (dragged) {
      const touch = event.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);

      if (target && target.classList.contains('dropzone')) {
        target.classList.remove('dragover');
      }

      dragged.classList.remove('dragging');
      setDragged(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleTouchMove = (event) => {
    if (isTouch && dragged) {
      const touch = event.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);

      if (target && target.classList.contains('dropzone')) {
        target.classList.add('dragover');
      }
    }
  };

  const handleDragEnter = (event) => {
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.add('dragover');
    }
  };

  const handleDragLeave = (event) => {
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.remove('dragover');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.remove('dragover');
      if (dragged) {
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
      }
    }
  };

  const handleTouchDrop = (event) => {
    if (isTouch && dragged) {
      const touch = event.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);

      if (target && target.classList.contains('dropzone')) {
        target.classList.remove('dragover');
        dragged.parentNode.removeChild(dragged);
        target.appendChild(dragged);
      }
      setDragged(null);
    }
  };

  return (
    <div className="absolute flex flex-col items-center justify-center">
      <>
        <div onClick={handleBackClick} className="absolute top-[calc(2.0rem)] -ml-[calc(8rem)]">
          <img src={lArrowIcon} alt="돌아가기" />
        </div>
        <div className="relative top-[calc(5.1875rem)] pl-[calc(1.5rem)]">
          <Lottie className="-mt-5 -ml-[calc(1rem)] w-[calc(5rem)] h-[calc(5rem)]" animationData={alarmIcon} loop={false} autoplay={true} />
          <div className="w-[10rem]">
            <span className="pl-[calc(0.5rem)] page-title">알림</span>
          </div>
        </div>
        <div className="absolute left-0 flex flex-col items-center justify-center top-[calc(13.5rem)] w-[calc(22.5rem)]">
          <span className="left-1/2 font-pretendardBold text-sm text-center">
            나의 알림함
          </span>
        </div>
        <div className="absolute left-0 top-[calc(15rem)] border-[calc(.01875rem)] w-[calc(22.5rem)] z-0"></div>
      </>
      <>
        {alarmList.map((alarm, index) => (
          <div key={index} className="absolute border-b-2 flex flex-col items-center justify-center left-0 w-[calc(22.5rem)] h-[calc(2rem)] text-center bg-slate-100"
            style={{ top: `calc(${18 + 3 * index}rem)` }}
            onClick={() => handleManualClick(index)}
          >
            <div className="absolute left-[calc(.3rem)] rounded-full w-[calc(0.5rem)] h-[calc(0.5rem)] bg-yellow-500"></div>
            <span className="font-pretendardBold transform transition duration-100 ease-in-out active:scale-95">{alarm.content}</span>
          </div>
        ))}
      </>
      {showManualModal !== null && (
        <Modal show={showManualModal !== null} onClose={closeModal}>
          {/* Modal content */}
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10" onClick={handleOutsideClick}>
            <div
              className="animate-scale-in relative flex flex-col items-center justify-start bg-stone-100 w-[calc(20.5rem)] h-[calc(31.25rem)] rounded-xl overflow-x-hidden overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* close button */}
              <button
                onClick={closeModal}
                className="self-start mt-2 mb-2 ml-2 w-5 h-5 bg-[#FF5F51] rounded-full shadow-sm font-bold text-white flex items-center justify-center"
              >
                &times;
              </button>
              <div>
                {/* content */}
                <span className="text-[calc(.9rem)] text-gray-500">{alarmList[showManualModal].content}</span>
              </div>
              {showManualModal === 0 && (
                <>
                  <div className="absolute left-3 top-[calc(10rem)] w-[10rem] h-[15.590rem] bg-red-500 clip-trapezoid-left leftappear">
                  </div>
                  <div className="absolute flex flex-col items-center justify-start top-[calc(15rem)] z-10">
                    <Lottie className="animate-zoom-in-out w-[5rem] h-[5rem]" animationData={versusIcon} loop={false} autoplay={true} />
                  </div>
                  <div className="absolute right-3 top-[calc(10rem)] w-[10rem] h-[15.590rem] bg-blue-500 clip-trapezoid-right rightappear">
                  </div>
                </>
              )}
              {showManualModal === 1 && (
                <div>
                  <Lottie className="-mt-5 -ml-[calc(1rem)] w-[calc(15rem)] h-[calc(15rem)]" animationData={congratulationIcon} loop={true} autoplay={true} />
                </div>
              )}
              {showManualModal === 2 && (
                <div className="absolute left-3 top-[calc(10rem)] w-[8rem] h-[15.590rem] bg-red-500 
                  draggable"
                  draggable="true"
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AlarmPage;
