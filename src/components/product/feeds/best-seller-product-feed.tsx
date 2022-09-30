import ProductsBlock from "@containers/products-block";
import {useBestSellersQuery} from "../../../../generated/graphql";
import {Product} from "@framework/types";

export default function BestSellerProductFeed() {
	const { data, loading, error } = useBestSellersQuery();
	const products = data?.reportProductSales?.edges.map(({ node }) => node.product) as Product[] || [];
	const uniqueProducts = products.filter((value, index, self) => {
		return self.findIndex(v => v.name === value.name) === index;
	}).splice(0, 8);

	return (
		<ProductsBlock
			sectionHeading="text-best-sellers"
			products={uniqueProducts}
			loading={loading}
			error={error?.message}
			uniqueKey="best-sellers"
		/>
	);
}
