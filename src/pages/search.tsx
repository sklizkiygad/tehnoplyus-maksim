import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ShopDiscount from "@components/shop/discount";
import {ShopFilters} from "@components/shop/filters";
import {ProductGrid} from "@components/product/product-grid";
import {SearchTopBar} from "@components/shop/top-bar";
import ActiveLink from "@components/ui/active-link";
import {BreadcrumbItems} from "@components/common/breadcrumb";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ROUTES} from "@utils/routes";
import {useTranslation} from "next-i18next";
import {GetStaticProps} from "next";
import {useRouter} from "next/router";
import {
    OrderDirection,
    ProductOrderField,
    useCategoryBySlugLazyQuery,
    useProductsByCategoryLazyQuery,
} from "../../generated/graphql";
import {useEffect, useState} from "react";

export default function Shop() {
    const {t} = useTranslation("common");

    const {price, sort_by, category} = useRouter().query;

    const [categoryData, setCategoryData] = useState<any | null>(null);

    let direction: any;
    let field: any;

    switch (sort_by) {
        case 'newest':
            field = ProductOrderField.PublicationDate;
            direction = OrderDirection.Desc;
            break;
        case 'popularity':
            field = ProductOrderField.Rating;
            direction = OrderDirection.Desc;
            break;
        case 'low-high':
            field = ProductOrderField.Price;
            direction = OrderDirection.Asc;
            break;
        case 'high-low':
            field = ProductOrderField.Price;
            direction = OrderDirection.Desc;
            break;
        default:
            field = ProductOrderField.Name;
            direction = OrderDirection.Asc;
            break;
    }

    const priceStr: string = price as string;
    const gte = priceStr?.split('-')[0];
    let lte: string | null = priceStr?.split('-')[1];
    lte = lte === '0' ? null : lte;
    let arg = {direction, field};
    // @ts-ignore
    arg = !price ? arg : {...arg, gte, lte};


    const [getCategoryId, {}] = useCategoryBySlugLazyQuery({variables: {slug: `${category}`}});
    // const categoryName = category && useCategoryBySlugQuery({variables: {slug: category as string}}).data?.category?.name;
    const [getProducts, {data, loading, error}] = useProductsByCategoryLazyQuery({
        variables: {
            id: categoryData?.id as string,
            ...arg
        }
    });

    useEffect(() => {
        if (category) {
            getCategoryId().then(({data}) => {
                if (data && arg) {
                    setCategoryData(data?.category);
                    getProducts();
                }
            });

        }
    }, [category, categoryData]);

    const func = "search";

    const products = data?.products?.edges;
    const count = data?.products?.totalCount;
    const pageInfo = data?.products?.pageInfo;

    return (
        <>
            <ShopDiscount/>
            <Container>
                <div className={`flex pt-8 pb-16 lg:pb-20 bg-base-100 font-text text-secondary`}>
                    <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
                            <div className="pb-7">
                                <BreadcrumbItems separator="/">
                                    <ActiveLink
                                        href={"/"}
                                        activeClassName="font-semibold"
                                    >
                                        <a className="text-info">{t("breadcrumb-home")}</a>
                                    </ActiveLink>
                                    <ActiveLink
                                        href={ROUTES.SEARCH}
                                        activeClassName="font-semibold"
                                    >
                                        <a className="capitalize text-secondary">{t("breadcrumb-search")}</a>
                                    </ActiveLink>
                                </BreadcrumbItems>
                            </div>
                            <ShopFilters/>
                    </div>

                    <div className="w-full lg:-ms-9">
                        <SearchTopBar title={categoryData?.name} count={count}/>
                        <ProductGrid
                            products={products}
                            error={error}
                            loading={loading}
                            pageInfo={pageInfo}
                            func={func}
                            arg={arg}
                            categoryId={categoryData?.id || ''}
                        />
                    </div>
                </div>
                <Subscription/>
            </Container>
        </>
    );
}

Shop.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({locale}) => {
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
