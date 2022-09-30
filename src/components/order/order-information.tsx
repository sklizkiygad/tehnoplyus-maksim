import { IoCheckmarkCircle } from "react-icons/io5";
import OrderDetails from "@components/order/order-details";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {useOrderByTokenQuery} from "../../../generated/graphql";
import {formatPrice} from "@framework/product/use-price";

export default function OrderInformation() {
	const {
		query: { token }
	} = useRouter();
	const { t } = useTranslation("common");
	const { data, loading } = useOrderByTokenQuery({variables: { token: token } });
	const order = data?.orderByToken;
	if (loading) return <p>Loading...</p>;

	const total = order?.total?.net?.amount || 0;
	const cur = order?.total?.net?.currency || 'USD';

	const resultTotal = formatPrice({amount: total as number, currencyCode: cur as string, locale: 'ru'});

	const created = new Date(order?.created);
	const year = created.getFullYear();
	const day = created.getDate() // 23
	const month = (created.getMonth()).toString().length > 1 ? created.getMonth() + 1 : `0${created.getMonth() + 1}`;
	const hour = created.getHours();
	const min = created.getMinutes();
	const date = `${day}.${month}.${year} ${hour}:${min}`;

	return (
		<div className="xl:px-32 2xl:px-44 3xl:px-56 py-16 lg:py-20 font-text text-secondary">
			<div className="border border-gray-300 bg-success text-base-100 px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-heading text-sm md:text-base mb-6 lg:mb-8">
				<span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-success flex items-center justify-center flex-shrink-0">
					<IoCheckmarkCircle className="w-5 h-5 text-base-100" />
				</span>
				{t("text-order-received")}
			</div>

			<ul className="border border-gray-300 bg-base-200 rounded-md flex flex-col md:flex-row mb-7 lg:mb-8 xl:mb-10">
				{/*<li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">*/}
				{/*	<span className="uppercase text-[11px] block text-body font-normal leading-5">*/}
				{/*		{t("text-order-number")}:*/}
				{/*	</span>*/}
				{/*	{data?.tracking_number}*/}
				{/*</li>*/}
				<li className="font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
					<span className="font-subtitle uppercase text-[11px] block text-body font-normal leading-5">
						{t("text-date")}:
					</span>
					{date}
				</li>
				<li className="font-semibold lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
					<span className="font-subtitle uppercase text-[11px] block font-normal leading-5">
						{t("text-email")}:
					</span>
					{order?.userEmail}
				</li>
				<li className="font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
					<span className="font-subtitle uppercase text-[11px] block font-normal leading-5">
						{t("text-total")}:
					</span>
					{resultTotal}
				</li>
				<li className="font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
					<span className="font-subtitle uppercase text-[11px] block font-normal leading-5">
						{t("text-payment-method")}:
					</span>
					При получении
				</li>
			</ul>

			<p className="text-sm md:text-base mb-8">
				{t("text-pay-cash")}
			</p>

			<OrderDetails data={order} loading={loading}/>
		</div>
	);
}
