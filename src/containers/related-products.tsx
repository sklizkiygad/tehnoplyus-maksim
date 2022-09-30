import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import Alert from "@components/ui/alert";
import {useRelatedProductsQuery} from "../../generated/graphql";
import {Product} from "@framework/types";

interface ProductsProps {
    sectionHeading: string;
    className?: string;
    categoryId: string;
    id: string;
}

const RelatedProducts: React.FC<ProductsProps> = ({
                                                      sectionHeading,
                                                      className = "mb-9 lg:mb-10 xl:mb-14",
                                                      categoryId,
                                                      id
                                                  }) => {



    const {data, error, loading} = useRelatedProductsQuery({variables: { id: categoryId as string }});
    let products = data?.products?.edges || [];

    const splicedArr = products.filter(({ node }) => node.id !== id);

    return (
        <div className={className}>
            <SectionHeader sectionHeading={sectionHeading}/>
            <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
                {error ? (
                        <div className="col-span-full">
                            <Alert message={error?.message}/>
                        </div>
                    ) :
                    !loading
                        ? splicedArr && splicedArr.length
                        ? splicedArr.map(({node}) => {
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
        </div>
    );
};

export default RelatedProducts;
