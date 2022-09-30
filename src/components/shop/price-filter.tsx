import {useRouter} from "next/router";
import React from "react";
import {useTranslation} from "next-i18next";
import {RadioBox} from "@components/ui/radiobox";

const priceFilterItems = [
	{
		id: "1",
		name: "До 500 ₽",
		slug: "0-500",
	},
	{
		id: "2",
		name: "500 ₽ - 5 000 ₽",
		slug: "500-5000",
	},
	{
		id: "3",
		name: "5 000 ₽ - 10 000 ₽",
		slug: "5000-10000",
	},
	{
		id: "4",
		name: "10 000 ₽ - 20 000 ₽",
		slug: "10000-20000",
	},
	{
		id: "5",
		name: "Свыше 20 000 ₽",
		slug: "20000-0",
	}
];

export const PriceFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const selectedPrices = query?.price ? (query.price as string) : '' +
		'';
	const [formState, setFormState] = React.useState<string>(selectedPrices);
	React.useEffect(() => {
		setFormState(selectedPrices);
	}, [query?.price]);
	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		// setFormState(currentFormState);
		const { price, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					price: value,
				},
			},
			undefined,
			{ scroll: false }
		);
	}
	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-price")}
			</h3>
			<div className="mt-2 flex flex-col space-y-4 text-secondary">
				{priceFilterItems?.map((item: any) => (
					<RadioBox
						key={item.id}
						labelKey={item.name}
						name={item.name.toLowerCase()}
						checked={item.slug === formState}
						value={item.slug}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
