import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ClubBoard from '@/components/ClubBoard';
import ClubCreateModal from '@/components/ClubCreateModal';

function SearchClub() {
    const [text, setText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenClubCreate = () => {
        setIsModalOpen(true);
    };

    const handleCloseClubCreate = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="px-2 mt-4">
            <div className="flex flex-row justify-between">
                <Button size="sm" onClick={() => handleOpenClubCreate()}>
                    클럽 생성하기
                </Button>
                {/* <div className="flex flex-row">
                    <Input type="text" className="py-2 pl-3 pr-8 w-36 h-9" placeholder="클럽명으로 검색" />
                    &nbsp;&nbsp;
                    <Button size="sm">검색</Button>
                </div> */}
            </div>
            <div className="flex flex-col">
                <ClubBoard />
            </div>
            {isModalOpen && <ClubCreateModal isOpen={isModalOpen} onClose={() => handleCloseClubCreate()} />}
        </div>
    );
}

export default SearchClub;
