import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Slider from 'react-slick';

import { TiArrowBackOutline } from 'react-icons/ti';
import { useFindPlayerBoardStore } from '@/stores/findPlayerBoardStore';

function FindPlayerDetailPage() {
    const { dummyFindPlayerList } = useFindPlayerBoardStore();
    const params = useParams();
    const navigate = useNavigate();
    // dummyFindPlayerList의 key는 1부터 시작, 배열의 원소는 0부터 시작, mysql은 1부터 시작..
    const hasMultipleImages =
        dummyFindPlayerList[params.id - 1] && dummyFindPlayerList[params.id - 1].images.length > 1;

    useEffect(() => {
        console.log(params.id);
        console.log(dummyFindPlayerList[params.id - 1]);
        console.log(hasMultipleImages);
    }, []);

    const settings = {
        dots: hasMultipleImages,
        infinite: hasMultipleImages,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: hasMultipleImages,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        centerMode: true,
        variableWidth: true,
    };

    const handleGoBack = () => {
        navigate('/findplayer/board');
    };

    return (
        <div className="w-full mt-4">
            <div className="mb-2">
                <TiArrowBackOutline size={'1.5rem'} onClick={handleGoBack} />
            </div>
            <Slider {...settings}>
                {dummyFindPlayerList[params.id - 1].images.map((image, index) => (
                    <div key={index} className="overflow-x-hidden mx-auto w-full h-[calc(9.375rem)]">
                        <img className="inline w-full h-auto" src={image} alt={`구장사진${index}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
export default FindPlayerDetailPage;
