import ProductsBlock from "@containers/products-block";
import {useNewProductsQuery} from "../../../../generated/graphql";
import {Product} from "@framework/types";

export default function NewArrivalsProductFeed() {
	const { data, loading, error } = useNewProductsQuery();

	return (
		<ProductsBlock
			sectionHeading="text-new-arrivals"
			products={data?.products?.edges.map(({ node }) => node) as Product[] || []}
			loading={loading}
			error={error?.message}
			uniqueKey="new-arrivals"
		/>
	);
}
