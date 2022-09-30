import { BreadcrumbItems } from '@components/common/breadcrumb';
import Subscription from '@components/common/subscription';
import Layout from '@components/layout/layout';
import { ProductGrid } from '@components/product/product-grid';
import ShopDiscount from '@components/shop/discount';
import { ShopFilters } from '@components/shop/filters';
import { SearchTopBar } from '@components/shop/top-bar';
import ActiveLink from '@components/ui/active-link';
import Container from '@components/ui/container';
import { ROUTES } from '@utils/routes';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import {
  OrderDirection,
  ProductOrderField,
  useAllProductsQuery,
  useCollectionBySlugQuery,
  useProductsQuery
} from '../../../generated/graphql';

export default function Products() {
	const { t } = useTranslation("common");
	const title = "Products";

	const { sort_by, price, collection: collectionSlug } = useRouter().query;
  const { data: dataCollection } = useCollectionBySlugQuery({variables: { slug: collectionSlug as string}});
  const collection = dataCollection?.collection?.id

  let direction = sort_by === 'low-high' ? OrderDirection.Asc : OrderDirection.Desc;
	let field = null;
	switch (sort_by){
		case 'newest':
			field = ProductOrderField.PublicationDate;
			break;
		case 'popularity':
			field = ProductOrderField.Rating;
			break;
		case 'low-high':
		case 'high-low':
			field = ProductOrderField.Price;
			break;
		default:
			break;
	}

	const priceStr: string = price as string;
	const gte = priceStr?.split('-')[0];
	let lte: string | null = priceStr?.split('-')[1];
	lte = lte === '0' ? null : lte;

	let arg = !sort_by ? null : {direction , field};
	// @ts-ignore
	arg = !price ? arg : {...arg, gte, lte};

	const func = !sort_by ? "allProducts" : "products";

	// @ts-ignore
	const { data, error, loading } = !sort_by ? useAllProductsQuery({variables: {...arg, collection}}) : useProductsQuery({variables: {...arg}});

	const products = data?.products?.edges || [];
	const count = data?.products?.totalCount || 0;

	const pageInfo = data?.products?.pageInfo;

	return (
		<>
			<ShopDiscount />
			<Container>
				<div className={`flex pt-8 pb-16 lg:pb-20 text-secondary font-text`}>
					<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
							<div className="pb-7">
								<BreadcrumbItems separator="/">
									<ActiveLink
										href={"/"}
										activeClassName="font-semibold text-heading"
									>
										<a>{t("breadcrumb-home")}</a>
									</ActiveLink>
									<ActiveLink
										href={ROUTES.PRODUCT}
										activeClassName="font-semibold text-heading"
									>
										<a className="capitalize">{t("breadcrumb-products")}</a>
									</ActiveLink>
								</BreadcrumbItems>
							</div>
							<ShopFilters />
					</div>

					<div className="w-full lg:-ms-9">
						<SearchTopBar count={count} title={title}/>
						<ProductGrid
							products={products}
							error={error}
							loading={loading}
							pageInfo={pageInfo}
							func={func}
							arg={arg}
						/>
					</div>
				</div>
				<Subscription />
			</Container>
		</>
	);
}

Products.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
