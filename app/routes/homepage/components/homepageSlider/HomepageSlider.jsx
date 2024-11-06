import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './homepageSlider.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import HomepageDetails from '../homepageDetails/HomepageDetails';

const sliderType= {
    IMAGE:0,
    VIDEO:1,
}


const sliderTypeSelector = (type,content)=>{
    switch(type){
        case sliderType.IMAGE:
            return <img src={content} />
        case sliderType.VIDEO:
            return <video  width = "500px" src={content} controls></video>
    }
}
export default function HomepageSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  const sliderData = [
    {
      type: sliderType.IMAGE,
      preview: 'https://swiperjs.com/demos/images/nature-1.jpg', // Thumbnail for the image
      content: 'https://swiperjs.com/demos/images/nature-1.jpg', // Full-size image for the previewer
      title: 'Nature 10' // Title for the thumbnail
    },
    {
      type: sliderType.VIDEO,
      preview: 'https://i.ibb.co/V9tW1vt/Screenshot-2024-11-06-at-4-50-52-PM.png', // Thumbnail for the video
      content: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', // Video URL for the previewer
      title: 'Watch Tutorial' // Title for the thumbnail
    },
    {
      type: sliderType.IMAGE,
      preview: 'https://swiperjs.com/demos/images/nature-2.jpg', // Thumbnail for another image
      content: 'https://swiperjs.com/demos/images/nature-2.jpg', // Full-size image for the previewer
    title: 'Nature 3'
    },
  
  ];
  return (
    <>
   <HomepageDetails></HomepageDetails>
   <div>
     <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {sliderData.map((data,index)=> <SwiperSlide key={index}>
          {sliderTypeSelector(data.type,data.content)}
        </SwiperSlide>

        )}
        
      
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
         {sliderData.map((data,index)=> <SwiperSlide key={index}>
          <img src={data.content} />
          <div className="thumbnail-title">{data.title}</div>
        </SwiperSlide>

        )}
       
      </Swiper>
   </div>
     
    </>
  );
}
