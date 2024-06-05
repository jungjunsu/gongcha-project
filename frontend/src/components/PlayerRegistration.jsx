import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { PiUserCirclePlus } from 'react-icons/pi';

function PlayerRegistration() {
    const [isVisible, setIsVisible] = useState(false);
    const [divs, setDivs] = useState([
        <div
            key="1"
            className="flex items-center justify-center w-10 h-10 border rounded-md"
            onClick={() => handleShowInput()}
        >
            <PiUserCirclePlus size={'2rem'} />
        </div>,
        <div
            key="2"
            className="flex items-center justify-center w-10 h-10 border rounded-md"
            onClick={() => handleShowInput()}
        >
            <PiUserCirclePlus size={'2rem'} />
        </div>,
        <div
            key="3"
            className="flex items-center justify-center w-10 h-10 border rounded-md"
            onClick={() => handleShowInput()}
        >
            <PiUserCirclePlus size={'2rem'} />
        </div>,
        <div
            key="4"
            className="flex items-center justify-center w-10 h-10 border rounded-md"
            onClick={() => handleShowInput()}
        >
            <PiUserCirclePlus size={'2rem'} />
        </div>,
    ]);

    const handleCreateBlank = () => {
        const newDiv = (
            <div
                className="flex items-center justify-center w-10 h-10 border rounded-md"
                onClick={() => handleShowInput()}
            >
                <PiUserCirclePlus size={'2rem'} />
            </div>
        );
        setDivs([...divs, newDiv]);
    };

    const handleDeleteBlank = () => {
        setDivs((prevElements) => prevElements.slice(0, -1));
    };

    const handleShowInput = () => {
        setIsVisible(true);
    };

    const handleHideInput = () => {
        setIsVisible(false);
    };
    return (
        <div className="w-full">
            <div className="flex flex-row justify-center ">
                <Button size="sm" variant="default" onClick={() => handleCreateBlank()}>
                    생성
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="sm" variant="destructive" onClick={() => handleDeleteBlank()}>
                    삭제
                </Button>
            </div>
            <div className="flex flex-row justify-around mt-4">
                {divs.map((value, index) => (
                    <div key={index}>{value}</div>
                ))}
            </div>
            <div className={isVisible ? 'visible' : 'hidden'}>
                <div className="flex flex-row justify-center mt-4">
                    <Input className="w-40 h-9" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {/* TODO */}
                    <Button size="sm" variant="default">
                        등록
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button size="sm" variant="destructive" onClick={() => handleHideInput()}>
                        취소
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PlayerRegistration;
