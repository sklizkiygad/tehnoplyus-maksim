import SectionHeader from '@components/common/section-header';
import ProductOverlayCard from '@components/product/product-overlay-card';
import Alert from '@components/ui/alert';
import {useFeaturedProductsQuery} from "../../generated/graphql";
import {Product} from "@framework/types";

interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  variant?: 'left' | 'center' | 'combined';
}

const ProductsFeatured: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = 'mb-12 md:mb-14 xl:mb-16',
  variant = 'left',
}) => {
  const { data, error } = useFeaturedProductsQuery();

  const products = data?.products?.edges || [];

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-5 xl:gap-7">
          {products.map(({ node }, index) => (
            <ProductOverlayCard
              key={`product--key${node.id}`}
              product={node as Product}
              variant={variant}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsFeatured;
