import Input from '@components/ui/input';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/text-area';
import { CheckBox } from '@components/ui/checkbox';
import Button from '@components/ui/button';
import Router from 'next/router';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { useCart } from '@contexts/cart/cart.context';
import {
  CountryCode,
  useAssignShippingMethodMutation,
  useCheckoutPaymentCreateMutation,
  useCompleteCheckoutMutation,
  useCreateCheckoutMutation
} from '../../../generated/graphql';
import React from 'react';
import { countryAreas } from '@framework/static/country-area';

interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
  country: string;
  countryArea: string;
}

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation();
  const { items, resetCart } = useCart();
  const [ checkout, { loading } ] = useCreateCheckoutMutation();
  const [ assignShipping, {} ] = useAssignShippingMethodMutation();
  const [ completeCheckout, {} ] = useCompleteCheckoutMutation();
  const [ payment, {} ] = useCheckoutPaymentCreateMutation();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();

  function onSubmit() {
    const value = getValues();
    const {
      firstName,
      lastName,
      email,
      zipCode,
      city,
      countryArea,
      address,
      phone
    } = value;

    checkout({
      variables: {
        email: email,
        phone,
        firstName,
        lastName,
        postalCode: zipCode,
        city,
        country: CountryCode.Ru,
        countryArea,
        streetAddress1: address,
        lines: items.map((item) => {
          return {
            variantId: item.id,
            quantity: item.quantity
          } as any;
        })
      }
    }).then(({ data }) => {
      if (data?.checkoutCreate?.checkout) {
        const checkout = data?.checkoutCreate?.checkout;
        const token = checkout?.token;
        const paymentMethod = checkout.availablePaymentGateways[0]?.id;
        const shippingMethod = checkout?.availableShippingMethods[0]?.id;
        assignShipping({ variables: { token, shippingMethodId: shippingMethod } })
          .then(({ data }) => {
            const total = data?.checkoutShippingMethodUpdate?.checkout?.totalPrice?.net?.amount;
            payment({ variables: { token, total, gateway: paymentMethod } }).then(({}) => {
              completeCheckout({ variables: { tokenCheckout: token } }).then(({ data }) => {
                if (!data?.checkoutComplete?.checkoutErrors.length) {
                  if (data?.checkoutComplete?.order) {
                    const orderToken = data?.checkoutComplete?.order?.token;
                    Router.push(ROUTES.ORDER + '?token=' + orderToken);
                    resetCart();
                  }
                }
              });
            });
          });
      }
    });
  }

  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold font-subtitle mb-6 xl:mb-8">
        {t('text-shipping-address')}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-first-name"
              {...register('firstName', {
                required: 'forms:first-name-required',
              })}
              errorKey={errors.firstName?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              labelKey="forms:label-last-name"
              {...register('lastName', {
                required: 'forms:last-name-required',
              })}
              errorKey={errors.lastName?.message}
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div>
          <Input
            labelKey="forms:label-address"
            {...register('address', {
              required: 'forms:address-required',
            })}
            errorKey={errors.address?.message}
            variant="solid"
          />
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              type="tel"
              labelKey="forms:label-phone"
              {...register('phone', {
                required: 'forms:phone-required',
                pattern: {
                  value: /^(\+7|8)[\s(]*\d{3}[)\s]*\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
                  message: 'forms:phone-error'
                }
              })}
              errorKey={errors.phone?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              type="email"
              labelKey="forms:label-email-star"
              {...register('email', {
                required: 'forms:email-required',
                pattern: {
                  value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'forms:email-error',
                },
              })}
              errorKey={errors.email?.message}
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div>
          <div className="flex flex-col space-y-4 lg:space-y-0">
            {/*<Input*/}
            {/*    labelKey="forms:label-country"*/}
            {/*    {...register("country")}*/}
            {/*    variant="solid"*/}
            {/*    className="w-full lg:w-1/2 "*/}
            {/*/>*/}

            <label
              htmlFor={'countryArea'}
              className="block text-secondary font-semibold text-sm leading-none mb-3 cursor-pointer"
            >
              {t('forms:label-country-area')}
            </label>
            <select
              {...register('countryArea')}
              className="scroll w-full lg:w-1/2 py-2 px-4 md:px-5 w-full transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
            >
              <option value={undefined} hidden>
                Выбрать область...
              </option>
              {countryAreas.map((item) => {
                return (
                  <option
                    key={item}
                    className="my-2"
                    value={item}
                  >
                    {item}
                  </option>
                );
              })}


            </select>

          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-city"
              {...register('city')}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              labelKey="forms:label-postcode"
              {...register('zipCode')}
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div>
          <div className="relative flex items-center ">
            <CheckBox labelKey="forms:label-save-information"/>
          </div>
          <TextArea
            labelKey="forms:label-order-notes"
            {...register('note')}
            placeholderKey="forms:placeholder-order-notes"
            className="relative pt-3 xl:pt-6"
          />
          <div className="flex w-full justify-end">
            <Button
              className="w-full sm:w-auto bg-primary hover:bg-primary-focus"
              loading={loading}
              disabled={loading}
            >
              {t('common:button-place-order')}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
