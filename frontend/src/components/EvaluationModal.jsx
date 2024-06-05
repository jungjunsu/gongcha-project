import React, { useState } from 'react';

const EvaluationModal = ({ players, onClose }) => {
    const [selected, setSelected] = useState({
        슈팅: null,
        패스: null,
        드리블: null,
        속도: null,
        매너: null,
    });

    const handleSelect = (skill, userId) => {
        setSelected(prev => ({ ...prev, [skill]: userId }));
    };

    const handleSubmit = () => {
        console.log('Selected Players:', selected);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-[calc(30rem)] h-[calc(33rem)] flex flex-col justify-between">
                <div>
                    <h2 className="text-pretendardBlack text-lg font-bold mb-4">평가하기</h2>
                    <div className="flex flex-col mb-4">
                        {['슈팅', '패스', '드리블', '속도', '매너'].map((skill, index) => (
                            <div key={skill} className="flex items-center mb-2">
                                <span className="flex-shrink-0 w-16 ml-2 font-pretendardBold text-[calc(.85rem)]">{skill}:</span>
                                <div className="flex flex-grow">
                                    {players.map((player) => (
                                        <label key={player.userId} className="ml-2">
                                            <input
                                                type="radio"
                                                name={skill}
                                                value={player.userId}
                                                onChange={() => handleSelect(skill, player.userId)}
                                                checked={selected[skill] === player.userId}
                                                className="hidden" // Hide the default radio button
                                            />
                                            <img
                                                src={player.profileImage}
                                                alt={player.name}
                                                className={`w-[calc(2rem)] h-[calc(2rem)] rounded cursor-pointer ${selected[skill] === player.userId ? 'ring-2 ring-blue-500' : ''}`}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className="w-full bg-blue-500 text-white rounded-md font-bold"
                    onClick={handleSubmit}
                >
                    평가 완료
                </button>
            </div>
        </div>
    );
};

export default EvaluationModal;
