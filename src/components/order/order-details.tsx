import usePrice from "@framework/product/use-price";
import { useTranslation } from "next-i18next";
const OrderItemCard = (props: any) => {
	const { product } = props;
	const { price: itemTotal } = usePrice({
		amount: product?.unitPrice?.net?.amount * product?.quantity,
		currencyCode: product?.unitPrice?.currency,
	});
	return (
		<tr
			className="border-b font-normal border-gray-300 last:border-b-0"
		>
			<td className="p-4">
				{product.productName} * {product.quantity}
			</td>
			<td className="p-4">{itemTotal}</td>
		</tr>
	);
};
const OrderDetails: React.FC<{ className?: string, data: any, loading: any}> = ({
	className = "pt-10 lg:pt-12",
	data,
	loading
}) => {
	const { t } = useTranslation("common");
	if (loading) return <p>Loading...</p>;
	const { price: totalPrice } = usePrice({
		amount: data?.total?.net?.amount,
		currencyCode: data?.total?.net?.currency,
	});
	return (
		<div className={className}>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary font-subtitle mb-6 xl:mb-8">
				{t("text-order-details")}:
			</h2>
			<table className="w-full font-semibold text-sm lg:text-base">
				<thead>
					<tr>
						<th className="bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2">
							{t("text-product")}
						</th>
						<th className="bg-gray-150 p-4 text-start last:rounded-te-md w-1/2">
							{t("text-total")}
						</th>
					</tr>
				</thead>
				<tbody>
					{data?.lines?.map((item: any) => (
						<OrderItemCard key={item.id} product={item} />
					))}
				</tbody>
				<tfoot>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-sub-total")}:</td>
						<td className="p-4">{totalPrice}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-shipping")}:</td>
						<td className="p-4">
							Бесплатно
							{/*<span className="text-[13px] font-normal ps-1.5 inline-block">*/}
							{/*	via Flat rate*/}
							{/*</span>*/}
						</td>
					</tr>
					{/*<tr className="odd:bg-gray-150">*/}
					{/*	<td className="p-4 italic">{t("text-payment-method")}:</td>*/}
					{/*	<td className="p-4">{order?.payment_gateway}</td>*/}
					{/*</tr>*/}
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-total")}:</td>
						<td className="p-4">{totalPrice}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-note")}:</td>
						<td className="p-4">{data?.note}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default OrderDetails;
