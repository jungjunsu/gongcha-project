import React, { useEffect, useState, useRef, useCallback } from 'react';

function InfiniteScrollExample() {
    // 데이터 목록과 로딩 상태를 관리합니다.
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // 마지막 요소를 추적하기 위한 ref 생성
    const observer = useRef();
    const lastItemRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // 여기서 데이터를 더 불러오는 로직을 구현합니다.
                    console.log('마지막 요소가 보임');
                    fetchMoreItems();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading]
    );

    // 데이터를 불러오는 함수
    const fetchMoreItems = () => {
        setLoading(true);
        // 예시: 임의의 데이터를 더 불러온다고 가정합니다.
        setTimeout(() => {
            setItems((prevItems) => [
                ...prevItems,
                ...new Array(10).fill().map((_, index) => `Item ${prevItems.length + index + 1}`),
            ]);
            setLoading(false);
        }, 1000);
    };

    // 컴포넌트 마운트 시 초기 데이터 로드
    useEffect(() => {
        fetchMoreItems();
    }, []);

    return (
        <div>
            {items.map((item, index) => (
                <div key={index} ref={index === items.length - 1 ? lastItemRef : null}>
                    {item}
                </div>
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default InfiniteScrollExample;
