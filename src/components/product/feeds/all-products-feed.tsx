import {useAllProductsQuery} from "../../../../generated/graphql";
import ProductsBlock from "@containers/products-block";
import {Product} from "@framework/types";
import Alert from "@components/ui/alert";
import ProductCardGridLoader from "@components/ui/loaders/product-card-grid-loader";

interface ProductsProps {
    sectionHeading?: string;
    className?: string;
}

const AllProductsFeed: React.FC<ProductsProps> = ({
                                                      sectionHeading = "breadcrumb-products",
                                                      className = "mb-12 md:mb-14 xl:mb-16",
                                                  }) => {
    const {data, loading, error} = useAllProductsQuery();

    const products = data?.products?.edges.map(({node}) => node).splice(0, 8) as Product[] || [];

    return (
        <div
            className={`${className}`}
        >
            {error ? (
                <Alert message={error?.message}/>
            ) : (
                <div>
                    {loading && products.length
                        ? Array.from({length: 10}).map((_, idx) => (
                            <ProductCardGridLoader
                                key={idx}
                                uniqueKey={`flash-sale-${idx}`}
                            />
                        ))
                        : <ProductsBlock
                            sectionHeading={sectionHeading}
                            categorySlug={'/products'}
                            products={products}
                            loading={loading}
                            error={error}
                            uniqueKey="new-arrivals"
                        />
                    }
                </div>
            )}
        </div>

    );
};

export default AllProductsFeed;