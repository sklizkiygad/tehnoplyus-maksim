import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import Breadcrumb from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import {useRouter} from "next/router";
import {useProductByNameQuery} from "../../../generated/graphql";
import {Product} from "@framework/types";

export default function ProductPage() {
	const {
		query: { slug },
	} = useRouter();
	const { data, loading } = useProductByNameQuery( { variables: { search: slug?.toString().split('-').join(' ') } } );
	const product = data?.products?.edges[0].node as Product;

	return (
		<>
			<Divider className="mb-0" />
			<Container>
				<div className="pt-8">
					<Breadcrumb />
				</div>
				<ProductSingleDetails product={product} loading={loading} />
				<RelatedProducts sectionHeading="text-related-products" categoryId={product?.category?.id as string} id={product?.id as string}/>
				<Subscription />
			</Container>
		</>
	);
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
