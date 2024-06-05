import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';

const wholeTextArray = ['apple', 'banana', 'coding', 'javascript', '원티드', '프리온보딩', '프론트엔드'];

function AutoComplete({ place, setPlace }) {
    // const [inputValue, setInputValue] = useState(''); // input에 들어간 값
    const [isHaveInputValue, setIsHaveInputValue] = useState(false); // 입력된 input값이 있는지의 여부
    const [dropDownList, setDropDownList] = useState(wholeTextArray); // dropdown에 보여줄 자동완성된 단어목록(리스트)
    const [dropDownItemIndex, setDropDownItemIndex] = useState(-1); // 내가 선택한 자동완성된 단어 item의 index

    const showDropDownList = () => {
        if (place === '') {
            setIsHaveInputValue(false);
            setDropDownList([]);
        } else {
            const choosenTextList = wholeTextArray.filter((textItem) => textItem.includes(place));
            setDropDownList(choosenTextList);
        }
    };

    const changeInputValue = (event) => {
        setPlace(event.target.value);
        setIsHaveInputValue(true);
    };

    const clickDropDownItem = (clickedItem) => {
        setPlace(clickedItem);
        setIsHaveInputValue(false);
    };

    const handleDropDownKey = (event) => {
        //input에 값이 있을때만 작동
        if (isHaveInputValue) {
            if (event.key === 'ArrowDown' && dropDownList.length - 1 > dropDownItemIndex) {
                setDropDownItemIndex(dropDownItemIndex + 1);
            }

            if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) setDropDownItemIndex(dropDownItemIndex - 1);
            if (event.key === 'Enter' && dropDownItemIndex >= 0) {
                clickDropDownItem(dropDownList[dropDownItemIndex]);
                setDropDownItemIndex(-1);
            }
        }
    };

    useEffect(showDropDownList, [place]);

    return (
        <div>
            <div className="relative flex items-center">
                <Input
                    type="text"
                    value={place}
                    onChange={changeInputValue}
                    onKeyUp={handleDropDownKey}
                    className="py-2 pl-3 pr-8"
                />
                <button
                    onClick={() => setPlace('')}
                    className="absolute text-lg transform -translate-y-1/2 right-2 top-1/2"
                >
                    &times;
                </button>
            </div>
            {isHaveInputValue && (
                <ul className="block pt-2 mx-auto list-none bg-white border border-t-0 border-gray-300 rounded-b-lg shadow-lg">
                    {dropDownList.length === 0 && <li className="p-4">해당하는 지역이 없습니다</li>}
                    {dropDownList.map((dropDownItem, dropDownIndex) => {
                        return (
                            <li
                                key={dropDownIndex}
                                onClick={() => clickDropDownItem(dropDownItem)}
                                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                                className={dropDownItemIndex === dropDownIndex ? 'pt-2 pl-4 bg-border' : 'pt-2 pl-4'}
                            >
                                {dropDownItem}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default AutoComplete;
