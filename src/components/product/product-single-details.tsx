import React, {useState} from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import {useCart} from "@contexts/cart/cart.context";
import {generateCartItem} from "@utils/generate-cart-item";
import {ProductAttributes} from "./product-attributes";
import Link from "@components/ui/link";
import {toast} from "react-toastify";
import {useWindowSize} from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import {SwiperSlide} from "swiper/react";
import {Product} from "@framework/types";
import ProductMetaReview from "@components/product/product-meta-review";
import {formatPrice} from "@framework/product/use-price";
import {useTranslation} from "next-i18next";

const productmediaCarouselResponsive = {
    "768": {
        slidesPerView: 2,
    },
    "0": {
        slidesPerView: 1,
    },
};

interface ProductsProps {
    product: Product;
    loading: any;
}

const ProductSingleDetails: React.FC<ProductsProps> = (
    {
        product,

    }) => {
    const {width} = useWindowSize();
    const { t } = useTranslation("common");
    const {addItemToCart} = useCart();
    const [selected, setSelected] = useState<{ [key: string]: { id: string, name: string } } | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

    const pricing = product?.pricing;
    const variants = product?.variants;

    const discount = pricing?.onSale;
    const price = pricing?.priceRange?.stop?.net.amount;
    const basePrice = pricing?.discount?.net?.amount + pricing?.priceRange?.stop?.net?.amount;
    const currency = pricing?.priceRange?.stop?.net.currency;

    const hasVariants = variants?.length > 0 && variants[0]?.attributes?.length > 0
    const title = variants && variants[0]?.attributes[0]?.attribute?.name;

    function addToCart(product: any) {
        if (hasVariants){
            if (!selected) return;
            // to show btn feedback while product carting
            setAddToCartLoader(true);
            setTimeout(() => {
                setAddToCartLoader(false);
            }, 600);

            if (product) {
                const {id, name, slug, thumbnail} = product;

                const item = generateCartItem(
                    {
                        id,
                        name,
                        slug: slug || '',
                        image: thumbnail?.url,
                        price,
                        currency
                    }, selected);
                addItemToCart(item, quantity);
                toast("Добавлено в корзину", {
                    type: "success",
                    progressClassName: "fancy-progress-bar",
                    position: width > 768 ? "bottom-right" : "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } else {
            setAddToCartLoader(true);
            setTimeout(() => {
                setAddToCartLoader(false);
            }, 600);

            const {name, slug, thumbnail} = product;
            const item = generateCartItem(
                {
                    id: variants[0].id,
                    name,
                    slug: slug || '',
                    image: thumbnail.url,
                    price,
                    currency
                }, selected);
            addItemToCart(item, quantity);
            toast("Добавлено в корзину", {
                type: "success",
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }

    }

    function handleAttribute(attribute: any) {
        setSelected(attribute);
    }


    return (
        <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
            {width < 1025 ? (
                <Carousel
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={productmediaCarouselResponsive}
                    className="product-media"
                    buttonClassName="hidden"
                >
                    {product?.media?.map((item, index: number) => (
                        <SwiperSlide key={`product-media-key-${index}`}>
                            <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                                <img
                                    src={
                                        item?.url ??
                                        "/assets/placeholder/products/product-media.svg"
                                    }
                                    alt={`${product?.name}--${index}`}
                                    className="object-cover w-full"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Carousel>
            ) : (
                <div className="col-span-5 grid grid-cols-2 gap-2.5">
                    {product?.media?.map((item, index: number) => (
                        <div
                            key={index}
                            className="col-span-1 transition duration-150 ease-in hover:opacity-90"
                        >
                            <img
                                src={
                                    item?.url ??
                                    "/assets/placeholder/products/product-media.svg"
                                }
                                alt={`${product?.name}--${index}`}
                                className="object-cover w-full"
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="col-span-4 pt-8 lg:pt-0 text-secondary font-text">
                <div className="pb-7 border-b border-gray-300">
                    <h2 className="font-subtitle text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
                        {product?.name}
                    </h2>
                    <p className="text-sm lg:text-base leading-6 lg:leading-8">
                        {/* {product?.description?.blocks[0].data.text} */}
                    </p>
                    <div className="flex items-center mt-5">
                        <div
                            className="font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
                            {formatPrice({amount: price, currencyCode: currency, locale: 'ru-RU'})}
                        </div>
                        {discount && (
                            <span
                                className="text-info line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
							{formatPrice({amount: basePrice, currencyCode: currency, locale: 'en'})}
							</span>
                        )}
                    </div>
                </div>


                { variants && variants.length > 0 && variants[0].attributes.length > 0 && (
                    <div className="pb-3 pt-7 border-b border-gray-300">
                        <ProductAttributes
                            title={title}
                            attributes={variants}
                            active={selected}
                            onClick={handleAttribute}
                        />
                    </div>
                )}
                <div
                    className="flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b border-gray-300 py-8">
                    <Counter
                        quantity={quantity}
                        onIncrement={() => setQuantity((prev) => prev + 1)}
                        onDecrement={() =>
                            setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                        }
                        disableDecrement={quantity === 1}
                    />
                    <Button
                        onClick={() => addToCart(product)}
                        variant="flat"
                        className={`bg-primary w-full h-11 md:h-12 px-1.5 hover:bg-primary-focus ${
                            (hasVariants && !selected) && "bg-secondary hover:bg-secondary"
                        }`}
                        disabled={hasVariants && !selected}
                        loading={addToCartLoader}
                    >
                        {t("text-add-to-cart")}
                    </Button>
                </div>
                <div className="py-6">
                    <ul className="text-sm space-y-5 pb-1">
                        <li className="text-info">
							<span className="font-semibold inline-block pe-2 text-secondary">
								SKU:
							</span>
                            {product?.defaultVariant?.sku}
                        </li>
                        <li>
							<span className="font-semibold text-heading inline-block pe-2 text-secondary">
								Category:
							</span>
                            <Link
                                href="/"
                                className="transition hover:underline hover:text-heading text-info"
                            >
                                {product?.category?.name}
                            </Link>
                        </li>
                        {/*{product?.tags && Array.isArray(data.tags) && (*/}
                        {/*	<li className="productTags">*/}
                        {/*		<span className="font-semibold text-heading inline-block pe-2">*/}
                        {/*			Tags:*/}
                        {/*		</span>*/}
                        {/*		{data.tags.map((tag) => (*/}
                        {/*			<Link*/}
                        {/*				key={tag.id}*/}
                        {/*				href={tag.slug}*/}
                        {/*				className="inline-block pe-1.5 transition hover:underline hover:text-heading last:pe-0"*/}
                        {/*			>*/}
                        {/*				{tag.name}*/}
                        {/*				<span className="text-heading">,</span>*/}
                        {/*			</Link>*/}
                        {/*		))}*/}
                        {/*	</li>*/}
                        {/*)}*/}
                    </ul>
                </div>

                <ProductMetaReview data={product}/>

            </div>
        </div>
    );
};

export default ProductSingleDetails;
