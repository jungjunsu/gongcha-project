import React, { useState, useEffect } from 'react';

const PaginationExample = () => {
    // 가상의 데이터
    const data = Array.from({ length: 100 }).map((_, index) => `Item ${index + 1}`);
    // 한 페이지에 보여줄 아이템 수
    const itemsPerPage = 10;
    // 전체 페이지 수
    const pageCount = Math.ceil(data.length / itemsPerPage);

    // 현재 페이지 상태
    const [currentPage, setCurrentPage] = useState(1);
    // 현재 페이지에 보여줄 아이템
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        // 현재 페이지에 따라 아이템을 업데이트
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setCurrentItems(data.slice(start, end));
    }, [currentPage]);

    return (
        <div>
            <div>
                {currentItems.map((item) => (
                    <div key={item}>{item}</div>
                ))}
            </div>
            <div>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                    <button key={page} onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PaginationExample;
