import React, { useRef, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

function MyPageWithTransition() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        nodeRef={nodeRef}
        key={location.pathname}
        timeout={30}
      >
        <div ref={nodeRef}>
          <Outlet />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default MyPageWithTransition;
