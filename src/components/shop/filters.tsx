import { CollectionFilter } from '@components/shop/collection-filter';
import { FilteredItem } from "./filtered-item";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "next-i18next";

export const ShopFilters: React.FC = () => {
	const router = useRouter();
	const { pathname, query } = router;
	const { t } = useTranslation("common");
	return (
		<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-xl md:text-2xl text-secondary font-subtitle">
						{t("text-filters")}
					</h2>
					<button
						className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading text-info"
						aria-label="Clear All"
						onClick={() => {
							router.push(pathname);
						}}
					>
						{t("text-clear-all")}
					</button>
				</div>
				<div className="flex flex-wrap -m-1.5 pt-2">
					{!isEmpty(query) &&
						Object.values(query)
							.join(",")
							.split(",")
							.map((v, idx) => (
								<FilteredItem
									itemKey={
										Object.keys(query).find((k) => query[k]?.includes(v))!
									}
									itemValue={v}
									key={idx}
								/>
							))}
				</div>
			</div>

      		<CollectionFilter />
			
		</div>
	);
};
