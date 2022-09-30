import BannerCard from '@components/common/banner-card';
import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import Divider from '@components/ui/divider';
import {homeThreeBanner as banner} from '@framework/static/banner';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps} from 'next';
import HeroSlider from "@containers/hero-slider-fullwidth";
import ProductsFeatured from "@containers/products-featured";
import FeatureBlock from "@containers/feature-block";
import BannerCarouselBlock from "@containers/banner-carousel-block";

export default function Home() {
    return (
        <>
            <HeroSlider />
            <Container>
                <FeatureBlock />
                <ProductsFeatured
                    sectionHeading="text-featured-products"
                    variant="left"
                />
                <BannerCard
                    key={`banner--key${banner[0].id}`}
                    banner={banner[0]}
                    href={`${banner[0].slug}`}
                    className="mb-12 lg:mb-14 xl:mb-16"
                    variant={"default"}

            />
                <BannerCarouselBlock />

                <BannerCard
                    key={`banner--key${banner[1].id}`}
                    banner={banner[1]}
                    href={`${banner[1].slug}`}
                    className="mb-12 lg:mb-14 xl:mb-16"
                    variant={"default"}
                />
            </Container>
            <Divider className="mb-0"/>
        </>
    );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                'common',
                'forms',
                'menu',
                'footer',
            ])),
        },
    };
};
