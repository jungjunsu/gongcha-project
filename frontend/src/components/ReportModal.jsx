import React, { useState } from 'react';

const ReportModal = ({ onClose }) => {
    const [isChecked, setIsChecked] = useState({
        absence: false,
        negativeAttitude: false,
        swearing: false
    });

    const handleCheckboxChange = (key) => {
        setIsChecked({
            ...isChecked,
            [key]: !isChecked[key]
        });
    };

    const handleSubmit = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white rounded-lg p-8">
                <h2 className="text-pretendardBlack text-lg font-bold mb-4">신고하기</h2>
                <div className="flex flex-col mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox text-blue-500 h-5 w-5"
                            checked={isChecked.absence}
                            onChange={() => handleCheckboxChange('absence')}
                        />
                        <span className="ml-2">불참</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox text-blue-500 h-5 w-5"
                            checked={isChecked.negativeAttitude}
                            onChange={() => handleCheckboxChange('negativeAttitude')}
                        />
                        <span className="ml-2">부정적인 태도</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox text-blue-500 h-5 w-5"
                            checked={isChecked.swearing}
                            onChange={() => handleCheckboxChange('swearing')}
                        />
                        <span className="ml-2">욕설</span>
                    </label>
                </div>
                <button
                    className="w-full bg-red-500 text-white py-2 rounded-md font-bold"
                    onClick={handleSubmit}
                >
                    신고하기
                </button>
            </div>
        </div>
    );
};

export default ReportModal;