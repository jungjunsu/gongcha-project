import { Button } from '@/components/ui/button';
// 이미지는 S3에서 이미지를 바로 가져다 쓰는 형식이라서 많이 바뀔 예정

import defaultClubLogo from '@/assets/icons/clubFC.svg';
import ManchesterCity from '@/assets/examples/manchester-city.svg';
import TottenhamHotspur from '@/assets/examples/tottenham-hotspur.svg';

import { deleteClub } from '@/apis/api/club';

function ClubDetailModal({ isOpen, onClose, clubDetail }) {
    if (!isOpen) return null;
    const handleDeleteClub = () => {
        // console.log(clubDetail);
        deleteClub(
            clubDetail.clubId,
            (success) => {
                console.log('클럽 삭제 성공', success);
            },
            (fail) => {
                console.log('클럽 삭제 실패', fail);
            }
        );
        onClose();
    };

    const renderClubIcon = (iconName) => {
        switch (iconName) {
            case 'ManchesterCity':
                return <img src={ManchesterCity} className="w-20 h-20" />;
            case 'TottenhamHotspur':
                return <img src={TottenhamHotspur} className="w-20 h-20" />;
            default:
                return null;
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="relative flex flex-col overflow-x-hidden overflow-y-auto bg-white w-80 h-80 rounded-xl">
                <div className="flex justify-end mt-4 mr-6">
                    <button onClick={onClose}>⨉</button>
                </div>
                {/* <div className="flex justify-center">{renderClubIcon(clubDetail.clubIcon)}</div> */}
                <div className="flex justify-center">
                    <img src={defaultClubLogo} alt="기본 클럽 로고" className="w-20 h-20" />
                </div>
                <div className="flex flex-col items-start mx-auto mt-4">
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽명 :</span> {clubDetail.name}
                    </p>
                    {/* <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽 평균 능력치 : </span>
                        {clubDetail.averageStat}
                    </p> */}
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽 경기 수준 : </span>
                        {clubDetail.skillLevel}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">현재 소속 인원 : </span>
                        {clubDetail.clubUsers}명
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">활동 지역 : </span>
                        {clubDetail.region}&nbsp;
                        {clubDetail.districts}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">활동 시간 : </span>
                        {clubDetail.startTime}~{clubDetail.endTime}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽 소개 : </span>
                        {clubDetail.description}
                    </p>
                </div>
                <div className="flex justify-center">
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteClub()}>
                        삭제
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ClubDetailModal;
