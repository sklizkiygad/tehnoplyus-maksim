import ProductCard from "@components/product/product-card";
import type {FC} from "react";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import {Product} from "@framework/types";
import Button from "@components/ui/button";
import {useTranslation} from "next-i18next";
import { useEffect, useState} from "react";
import {
    useAllProductsLazyQuery, useCollectionBySlugLazyQuery,
    useProductsByCategoryLazyQuery,
    useProductsByMainCategoryLazyQuery,
    useProductsLazyQuery
} from "../../../generated/graphql";

interface ProductGridProps {
    className?: string;
    products: any;
    error: any;
    loading: any;
    pageInfo?: any;
    func: any;
    arg?: any;
    categoryId?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({products, error, loading, pageInfo, func, arg, categoryId}) => {
    const [productsData, setProductsData] = useState<any>(null);
    const [newPageInfo, setNewPageInfo] = useState<any>(null);

    useEffect(() => {
        setProductsData(products);
        setNewPageInfo(pageInfo);
    }, [products, pageInfo]);

    if (error) return <p>{error.message}</p>;

    const {t} = useTranslation("common");

    let newLoading = loading;

    const [getAllProducts, {  }] = useAllProductsLazyQuery({variables: { ...arg, after: newPageInfo?.endCursor }});
    const [getProducts, {}] = useProductsLazyQuery({ variables: {...arg, after: newPageInfo?.endCursor } as any});
    const [getProductsByCategory, {}] = useProductsByCategoryLazyQuery({ variables: { id: categoryId, ...arg, after: newPageInfo?.endCursor } as any});
    const [getProductsByMainCategory, {}] = useProductsByMainCategoryLazyQuery({ variables: { id: categoryId, ...arg, after: newPageInfo?.endCursor  } as any});
    const [getCollection, {}] = useCollectionBySlugLazyQuery({variables: { ...arg, after: newPageInfo?.endCursor }});

    function fetchNextPage() {
        switch (func){
            case "allProducts": {
                getAllProducts().then(({data, loading}) => {
                    newLoading = loading;
                    if (data && data?.products){
                        setProductsData([...productsData, ...data?.products?.edges as any[]])
                        setNewPageInfo(data?.products?.pageInfo);
                    }
                });
                break;
            }
            case 'products': {
                getProducts().then(({data, loading}) => {
                    newLoading = loading;
                    if (data && data?.products){
                        setProductsData([...productsData, ...data?.products?.edges as any[]])
                        setNewPageInfo(data?.products?.pageInfo);
                    }
                });
                break;
            }
            case 'search': {
                getProductsByCategory().then(({data, loading}) => {
                    newLoading = loading;
                    if (data && data?.products){
                        setProductsData([...productsData, ...data?.products?.edges as any[]])
                        setNewPageInfo(data?.products?.pageInfo);
                    }
                });
                break;
            }
            case 'mainCategory': {
                getProductsByMainCategory().then(({data, loading}) => {
                    newLoading = loading;
                    if (data && data?.products){
                        setProductsData([...productsData, ...data?.products?.edges as any[]])
                        setNewPageInfo(data?.products?.pageInfo);
                    }
                });
                break;
            }
            case 'collection': {
                getCollection().then(({data, loading}) => {
                    newLoading = loading;
                    if (data && data?.collection?.products){
                        setProductsData([...productsData, ...data?.collection?.products?.edges as any[]])
                        setNewPageInfo(data?.collection?.products?.pageInfo);
                    }
                });
                break;
            }
        }
    }

    return (
        <>
            <div
                className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 h-auto max-h-[375px]`}
            >
                {
                    !loading
                        ? productsData && productsData.length
                            ? productsData.map(({node}: any) => {
                                return (
                                    <ProductCard
                                        key={`product--key${node.id}`}
                                        product={node as Product}
                                        variant="grid"
                                    />
                                );
                            })
                            : <></>
                        : <ProductFeedLoader limit={20} uniqueKey="search-product"/>
                }


            </div>
            <div className="text-center pt-8 xl:pt-14">
                {newPageInfo?.hasNextPage && (
                	<Button
                		loading={newLoading}
                		disabled={newLoading}
                		onClick={() => fetchNextPage()}
                		variant="slim"
                        className="bg-primary hover:bg-primary-focus"
                	>
                		{t("button-load-more")}
                	</Button>
                )}
            </div>
        </>
    );
};
