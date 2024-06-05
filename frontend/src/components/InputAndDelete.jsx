import { useState } from 'react';

import { Input } from '@/components/ui/input';

function InputAndDelete({ text, setText }) {
    const changeInputValue = (event) => {
        setText(event.target.value);
    };

    return (
        <div className="relative flex items-center">
            <Input type="text" value={text} onChange={changeInputValue} className="py-2 pl-3 pr-8" />
            <button onClick={() => setText('')} className="absolute text-lg transform -translate-y-1/2 right-2 top-1/2">
                &times;
            </button>
        </div>
    );
}

export default InputAndDelete;
