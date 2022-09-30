import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
// import StickyBox from "react-sticky-box";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import CollectionTopBar from "@components/collection/collection-top-bar";
import { CollectionFilters } from "@components/collection/collection-filters";
import { GetServerSideProps } from "next";
import {ProductGrid} from "@components/product/product-grid";
import {useCollectionBySlugQuery} from "../../../generated/graphql";
import {useRouter} from "next/router";

export default function Shop() {
	const { t } = useTranslation("common");
	const {
		query: { slug },
	} = useRouter();

	const { data, loading, error } = useCollectionBySlugQuery({variables: {slug: slug as string }});

	const products = data?.collection?.products?.edges || [];
	const count = data?.collection?.products?.totalCount || 0;
	const pageInfo = data?.collection?.products?.pageInfo;

	let arg = !slug ? null : {slug};

	const func = "collection";


	return (
		<div className="border-t-2 border-borderBottom">
			<Container>
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
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
										href={ROUTES.SEARCH}
										activeClassName="font-semibold text-heading"
									>
										<a className="capitalize">{t("breadcrumb-collection")}</a>
									</ActiveLink>
								</BreadcrumbItems>
							</div>
							<CollectionFilters />
					</div>

					<div className="w-full lg:-ms-9">
						<CollectionTopBar count={count || 0}/>
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
		</div>
	);
}

Shop.Layout = Layout;

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
