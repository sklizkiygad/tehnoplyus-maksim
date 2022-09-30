import isEmpty from "lodash/isEmpty";

interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: string | undefined;
  price: number;
  [key: string]: unknown;
  currency: string;
}
export function generateCartItem(item: Item, variant: any) {
  const { id, name, slug, image, price, currency } = item;
  return {
    id: !isEmpty(variant)
      ? `${(Object.values(variant)[0] as any).id }`
      : id,
    name: !isEmpty(variant)
        ? `${name} - ${(Object.values(variant)[0] as any).name}`
        : name,
    slug,
    image,
    price,
    variant,
    currency
  };
}
