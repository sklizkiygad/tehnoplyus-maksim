import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { homeTwoHeroBanner as heroBanner } from "@framework/static/banner";
import { ROUTES } from "@utils/routes";

interface Props {
	className?: string;
}

const HeroWithCategory: React.FC<Props> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
}) => {
	return (
		<div
			className={`grid grid-cols-1 2xl:grid-cols-5 gap-5 xl:gap-7 ${className}`}
		>
			<div className="heightFull col-span-full row-span-full 2xl:row-auto 2xl:col-span-5">
				<Carousel
					pagination={{
						clickable: true,
					}}
					className="-mx-0"
					buttonClassName="hidden"
				>
					{heroBanner?.map((banner: any) => (
						<SwiperSlide key={`banner--key${banner.id}`}>
							<BannerCard
								banner={banner}
								href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
								className="xl:h-full"
							/>
						</SwiperSlide>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default HeroWithCategory;
