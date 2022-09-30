import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import {ProductGrid} from "@components/product/product-grid";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {
    useCategoryBySlugLazyQuery,
    useProductsByMainCategoryLazyQuery,
} from "../../../generated/graphql";
import {useEffect, useState} from "react";
import { LoaderComponent } from "@components/loader/loader";
import { ShopFilters } from "@components/shop/filters";

export default function Category() {

    const {slug} = useRouter().query;
    const [category, setCategory] = useState<any | null>(null);

    const [getCategory, {}] = useCategoryBySlugLazyQuery({variables: {slug: slug as string}});

    const [getProducts, {
        data,
        loading,
        error
    }] = useProductsByMainCategoryLazyQuery({variables: {id: category?.id as string}});

    useEffect(() => {
        if (slug) {
            getCategory().then(({data}) => {
                if (data) {
                    setCategory(data?.category);
                    getProducts();
                }
            });

        }
    }, [data, slug, category]);

    const func = "mainCategory";

    const products = data?.products?.edges;
    const pageInfo = data?.products?.pageInfo;

    if(data !== undefined){
        LoaderComponent.setLoadingState(false)
    }


    return (
        <div className="border-t-2 border-borderBottom">
            <Container>
                <CategoryBanner category={category}/>
                <div className="flex pt-8 pb-16 lg:pb-20 text-secondary font-text">
                    <ShopFilters />
                    <ProductGrid
                        products={products}
                        error={error}
                        loading={loading}
                        pageInfo={pageInfo}
                        func={func}
                        categoryId={category?.id || ''}
                    />
                </div>
                <Subscription/>
            </Container>
        </div>
    );
}



Category.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                "common",
                "forms",
                "menu",
                "footer",
            ])),
        },
    };
};
