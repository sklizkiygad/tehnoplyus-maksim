//import Image from 'next/image';
import { useUI } from '@contexts/ui.context';
import { Product } from '@framework/types';
import {generateCartItem} from "@utils/generate-cart-item";
import {useCart} from "@contexts/cart/cart.context";
import {toast} from "react-toastify";

interface ProductProps {
  product: Product;
  index: number;
  imgLoading?: 'eager' | 'lazy';
  variant?: 'left' | 'center' | 'combined';
}

const ProductOverlayCard: React.FC<ProductProps> = ({
  product,
}) => {

  const { pricing, variants } = product;
  const discount = pricing?.onSale;
  const basePrice = pricing?.discount?.net.amount + pricing?.priceRange?.stop?.net.amount;

  const image = product?.thumbnail?.url;
  const id = product?.id;
  const name = product?.name;
  const slug = product?.slug;
  const price = pricing?.priceRange?.stop?.net.amount;


  const classes  = 'col-span-2 lg:col-span-1';

  const { openModal, setModalView, setModalData } = useUI();


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
    setModalView('PRODUCT_VIEW');
    return openModal();
  }

  const currency = pricing?.priceRange?.stop?.net.currency;
  const {addItemToCart} = useCart();


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
    

  return (
    <div
      className={`${classes} cursor-pointer flex flex-col rounded-md relative items-center justify-between overflow-hidden`}
    >
      <div
        onClick={handlePopupView}
        className="flex justify-center items-center p-4 h-full 3xl:min-h-[330px] group"
        title={product?.name}
      >
        <img
          src={
            image
          }
          width="100%"
          height="auto"
          alt={product?.name || 'Product Image'}
          className="transition duration-500 ease-in-out transform group-hover:scale-110"
        />
      </div>

      <div
        className="block  md:items-center lg:items-start 2xl:items-center w-full px-4 md:px-5 3xl:px-7 pb-4 md:pb-5 3xl:pb-7"
        title={product?.name}
      >
        <div className="md:pe-2 lg:pe-0 2xl:pe-2 overflow-hidden">
          <h2 className="text-heading font-semibold text-sm md:text-base xl:text-lg mb-1 truncate">
            {product?.name}
          </h2>
          <p className="text-body text-xs xl:text-sm leading-normal xl:leading-relaxed truncate max-w-[250px]">
            {parsedDesc}
          </p>
        </div>
        <div className="flex justify-between mt-2 h-[48px]">
          <div className="product__price-container">
            <span className="product__price">{price} р.</span>
            {/* <span className="old-price">{basePrice} р.</span> */}
            <span className="product__old-price">10000 р.</span>
          </div>
          <button className="product__button-buy" onClick={addToCart}>В корзину</button>
        </div>
      </div>
    </div>
  );
};

export default ProductOverlayCard;
