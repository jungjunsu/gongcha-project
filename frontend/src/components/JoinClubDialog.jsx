import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { postClubApply } from '@/apis/api/clubApply';

function JoinClubDialog({ clubId, clubName, averageStat, clubMaster }) {
    const [content, setContent] = useState('');

    const handleInputChange = (event) => {
        setContent(event.target.value);
    };

    const handleJoinClick = () => {
        // console.log(content);
        postClubApply(
            clubId,
            {
                content: `${content}`,
            },
            (success) => {
                console.log('클럽 가입 요청 성공', success);
            },
            (fail) => {
                console.log('클럽 가입 요청 실패', fail);
            }
        );
        setContent('');
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-16 h-7" variant="outline">
                    <p className="text-xs font-gmarketSansRegular">가입 신청</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {clubName}
                        {/* ({averageStat}) */}
                    </DialogTitle>
                    <DialogDescription>클럽 대표 : {clubMaster}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="name" className="text-right">
                            가입 신청
                        </Label>
                        <Input
                            id="name"
                            placeholder="소개를 작성해주세요."
                            className="col-span-3"
                            value={content}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose
                        onClick={() => handleJoinClick()}
                        className="items-center justify-center h-10 px-4 text-sm font-medium transition-colors rounded-md  py-2inline-flex bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        가입 신청하기
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default JoinClubDialog;
