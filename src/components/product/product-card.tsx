import cn from "classnames";
//import Image from "next/image";
import type { FC } from "react";
import { useUI } from "@contexts/ui.context";
import { Product } from "@framework/types";
import {formatPrice} from "@framework/product/use-price";
import React from "react";

interface ProductProps {
	product: Product;
	className?: string;
	contactClassName?: string;
	imageContentClassName?: string;
	variant?: "grid" | "gridSlim" | "list" | "listSmall";
	imgWidth?: number | string;
	imgHeight?: number | string;
	imgLoading?: "eager" | "lazy";
}

const ProductCard: FC<ProductProps> = ({
	product,
	className = "",
	contactClassName = "",
	imageContentClassName = "",
	variant = "list",
	imgWidth = 340,
	imgHeight = 440,
}) => {
	const { openModal, setModalView, setModalData } = useUI();
	const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;

	const { pricing, variants } = product;
	const discount = pricing?.onSale;
	const price = pricing?.priceRange?.stop?.net.amount;
	const basePrice = pricing?.discount?.net.amount + pricing?.priceRange?.stop?.net.amount;
	const currency = pricing?.priceRange?.stop?.net.currency;

	const image = product && product.media && product.media.length && product.media[0]?.url;

	const parsedDesc = JSON.parse(product?.description as string).blocks[0].data.text;


	function handlePopupView() {
		const data = {
			...product,
			description: parsedDesc,
			discount,
			price,
			basePrice,
			image,
			variants
		}
		setModalData({ data });
		setModalView("PRODUCT_VIEW");
		return openModal();
	}
	return (
		<div
			className={cn(
				"group box-border overflow-hidden flex rounded-md cursor-pointer text-secondary pe-0 pb-2 lg:pb-3 flex-col items-start bg-base-200 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product",
				className
			)}
			onClick={handlePopupView}
			role="button"
			title={product?.name}
		>
			<div
				className={cn(
					"flex",
					{
						"mb-3 md:mb-3.5": variant === "grid",
						"mb-3 md:mb-3.5 pb-0": variant === "gridSlim",
						"flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
							variant === "listSmall",
					},
					imageContentClassName
				)}
			>
				<img
					src={image ?? placeholderImage}
					width={imgWidth}
					height={imgHeight}
					alt={product?.name || "Product Image"}
					className={cn("object-cover rounded-s-md", {
						"w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none":
							variant === "grid",
						"rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
							variant === "gridSlim",
						"rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
							variant === "list",
					})}
				/>
			</div>
			<div
				className={cn(
					"w-full overflow-hidden",
					{
						"ps-0 lg:ps-2.5 xl:ps-4 pe-2.5 xl:pe-4": variant === "grid",
						"ps-0": variant === "gridSlim",
						"px-4 lg:px-5 2xl:px-4": variant === "listSmall",
					},
					contactClassName
				)}
			>
				<h2
					className={cn("font-semibold font-text truncate mb-1", {
						"text-sm": variant === "grid",
						"md:mb-1.5 text-sm sm:text-base md:text-sm xl:text-lg":
							variant === "gridSlim",
						"text-sm md:mb-1.5 pb-0 text-secondary ": variant === "listSmall",
						"text-sm md:text-sm xl:text-lg md:mb-1.5":
							variant === "list",
					})}
				>
					{product?.name}
				</h2>
				{product?.description && (
					<p className="font-text text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
						{JSON.parse(product?.description).blocks[0].data.text}
					</p>
				)}
				<div
					className={`font-text font-semibold text-sm sm:text-base mt-1.5 space-s-2 flex ${
						variant === "grid"
							? "lg:text-lg lg:mt-2.5"
							: "sm:text-xl md:text-base lg:text-xl md:mt-2.5 2xl:mt-3"
					}`}
				>
					{price && <span className="inline-block">{price} р. </span>}
					<button className="product__button-buy" >В корзину</button>
					{discount && (
						<del className="sm:text-base text-info font-text">
							{formatPrice({amount: basePrice, currencyCode: currency, locale: 'en'})}
						</del>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
