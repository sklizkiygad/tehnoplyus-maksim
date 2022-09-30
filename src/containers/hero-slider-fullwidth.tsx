import BannerCard from '@components/common/banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { homeSixHeroImages as banners } from '@framework/static/banner';
import { SwiperSlide } from 'swiper/react';

export const bgImageStyle = {
  backgroundImage: "url('/assets/client/bg.jpg')",
}

const HeroSlider: React.FC = () => {
  return (
    <div
        className="relative pb-5 mb-5 pt-5 md:pb-8 md:mb-8 md:pt-0 no-repeat center  bg-cover"
        style={bgImageStyle}
    >
      <Carousel
        autoplay={false}
        className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16"
        buttonClassName="hidden"
        paginationPosition="left"
        pagination={{
          clickable: true,
        }}
      >
        {banners?.map((banner: any) => (
          <SwiperSlide
            className="carouselItem"
            key={`banner--key-${banner?.id}`}
          >
            <BannerCard
              banner={banner}
              href={`/${banner.slug}`}
              variant={'rounded'}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
