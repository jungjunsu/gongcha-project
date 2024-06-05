import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ show, onClose, children }) => {
    const nodeRef = useRef(null);

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={show}
            timeout={3000}
            classNames=""
            unmountOnExit
        >
            <div ref={nodeRef} className="" onClick={onClose}>
                {children}
            </div>
        </CSSTransition>
    );
};

export default Modal;
