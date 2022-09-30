import React, { useState } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "@components/product/product-attributes";
import { generateCartItem } from "@utils/generate-cart-item";
import { useTranslation } from "next-i18next";
import {formatPrice} from "@framework/product/use-price";
import { LoaderComponent } from "@components/loader/loader";
import {toast} from "react-toastify";

export default function ProductPopup() {
	const { t } = useTranslation("common");
	const {
		modalData: { data },
		closeModal,
		openCart,
	} = useUI();
	const router = useRouter();
	const { addItemToCart } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [selected, setSelected] = useState< { [key: string]: { id: string, name: string }} | null>(null);
	const { pricing } = data;
	const discount = pricing?.onSale;
	const basePrice = pricing?.discount?.net.amount + pricing?.priceRange?.stop?.net.amount;
	const currency = pricing?.priceRange?.stop?.net.currency;


	const image = data?.thumbnail?.url;
	const id = data?.id;
	const name = data?.name;
	const slug = data?.slug;
	const price = pricing?.priceRange?.stop?.net.amount;
	const description =  data.description
	const variants = data.variants[0]

	// const hasVariants = variants?.length > 0 && variants[0].attributes.length > 0 
	const title = variants && variants[0]?.attributes[0]?.attribute?.name;

	

	function addToCart(product: any) {
    
        if (product) {
            const item = generateCartItem(
                {
                    id,
                    name,
                    slug: slug || '',
                    image: image,
                    price,
                    currency
                }, null);
            addItemToCart(item, 1);
            toast("Добавлено в корзину", {
                type: "success",
                progressClassName: "fancy-progress-bar",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }

	function navigateToProductPage() {
		LoaderComponent.setLoadingState(true)
		closeModal();
		router.push(`${ROUTES.PRODUCT}/${name.toLowerCase().split(' ').join('-') }`, undefined, {
			locale: router.locale,
		});
	}

	function handleAttribute(attribute: any) {
		setSelected(attribute);
	}

	function navigateToCartPage() {
		closeModal();
		setTimeout(() => {
			openCart();
		}, 300);
	}

	return (
		<div className="rounded-lg bg-base-200 text-secondary font-text">
			<div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
				<div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-base-200">
					<img
						src={
							image ??
							"/assets/placeholder/products/product-thumbnail.svg"
						}
						alt={name}
						className="lg:object-cover lg:w-full lg:h-full h-64"
					/>
				</div>

				<div className="flex flex-col p-5 md:p-8 w-full">
					<div className="pb-5">
						<div
							className="mb-2 md:mb-2.5 block -mt-1.5"
							onClick={navigateToProductPage}
							role="button"
						>
							<h2 className="text-lg md:text-xl lg:text-2xl font-semibold hover:text-black font-subtitle">
								{name}
							</h2>
						</div>
						<p className="text-sm leading-6 md:text-body md:leading-7">
							{description}
						</p>

						<div className="flex items-center mt-3">
							<div className="font-semibold md:text-xl lg:text-2xl">
								{price && <span className="inline-block">{formatPrice({amount: price, currencyCode: currency, locale: 'ru-RU'})}</span>}
							</div>
							{discount && (
								<del className="lg:text-xl ps-2.5 -mt-0.5 md:mt-0 text-info">
									{formatPrice({amount: basePrice, currencyCode: currency, locale: 'en'})}
								</del>
							)}
						</div>
					</div>

					{variants && variants.length > 0 && variants[0].attributes.length > 0 && (
							<ProductAttributes
								title={title}
								attributes={variants}
								active={selected as any}
								onClick={handleAttribute}
							/> )
					}

					<div className="pt-2 md:pt-4">
						<div className="flex items-center justify-between mb-4 space-s-3 sm:space-s-4">
							<Counter
								quantity={quantity}
								onIncrement={() => setQuantity((prev) => prev + 1)}
								onDecrement={() =>
									setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
								}
								disableDecrement={quantity === 1}
							/>
							<button className="product__button-buy" onClick={addToCart}>В корзину</button>
						</div>

						{false && (
							<button
								onClick={navigateToCartPage}
								className="w-full mb-4 h-11 md:h-12 rounded bg-base-200 focus:outline-none border border-secondary transition-colors"
							>
								{t("text-view-cart")}
							</button>
						)}

						<Button
							onClick={navigateToProductPage}
							variant="flat"
							className="w-full h-11 md:h-12 bg-accent text-info hover:bg-primary-focus"
						>
							{t("text-view-details")}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
