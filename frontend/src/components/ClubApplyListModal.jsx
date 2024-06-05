import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useClubStore } from '@/stores/clubStore';

import { getClubApplies, postClubApplyPermit, postClubApplyDeny } from '@/apis/api/clubApply';

function ClubApplyListModal({ clubId, isOpen, onClose }) {
    const { myClubApplyListResponse, setMyClubApplyListResponse } = useClubStore();
    if (!isOpen) return null;

    const handlePermit = (applyId) => {
        postClubApplyPermit(
            clubId,
            applyId,
            (success) => {
                console.log('클럽 신청 승인 성공', success);
            },
            (fail) => {
                console.log('클럽 신청 승인 실패', fail);
            }
        );
    };
    const handleDeny = (applyId) => {
        postClubApplyDeny(
            clubId,
            applyId,
            (success) => {
                console.log('클럽 신청 거절 성공', success);
            },
            (fail) => {
                console.log('클럽 신청 거절 실패', fail);
            }
        );
    };

    useEffect(() => {
        getClubApplies(
            clubId,
            (success) => {
                console.log('클럽 가입 신청 목록 조회 성공', success);
                setMyClubApplyListResponse(success.data.data);
            },
            (fail) => {
                console.log('클럽 가입 신청 목록 조회 실패', fail);
            }
        );
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="relative flex flex-col overflow-x-hidden overflow-y-auto bg-white w-80 h-96 rounded-xl">
                <div className="flex justify-end mt-4 mr-6">
                    <button onClick={onClose}>⨉</button>
                </div>
                <p className="m-2 text-center font-gmarketSansBold">가입 신청 목록</p>
                <div>
                    {myClubApplyListResponse &&
                        myClubApplyListResponse.map((value, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-around p-2 m-4 border rounded-md border-border"
                            >
                                <div>
                                    <span className="text-lg font-gmarketSansBold ">{value.userName}</span>
                                    <span className="text-lg">님이 가입 신청을 보냈어요!</span>
                                </div>
                                <div>
                                    <span className="text-sm ">가입 한마디 : </span>
                                    <span className="text-sm text-gray-500 font-pretendardRegular">
                                        {value.content}
                                    </span>
                                </div>
                                <div className="flex flex-row mt-2">
                                    <Button className="h-6 px-3 rounded-md" onClick={() => handlePermit(value.clubId)}>
                                        수락
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="h-6 px-3 ml-4 rounded-md"
                                        onClick={() => handleDeny(value.clubId)}
                                    >
                                        거절
                                    </Button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ClubApplyListModal;
