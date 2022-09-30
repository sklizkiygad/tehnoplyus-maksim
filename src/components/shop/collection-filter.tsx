// import {useRouter} from "next/router";
import React, { useRef } from "react";
// import {useTranslation} from "next-i18next";
import { AllProductsQuery, useAllProductsQuery } from '../../../generated/graphql';

interface attributeProps{
  __typename?: "AttributeValue" | undefined;
  id: string;
  name?: string | null | undefined;
  slug?: string | null | undefined;
}

export const CollectionFilter = () => {

  const { data } = useAllProductsQuery();

  const attributesArray = useRef<Array<string>>([]);

  const sortAttributes = (attribute: string) => {
    if(attributesArray.current.indexOf(attribute) === -1){
      attributesArray.current.push(attribute)
    }
  }
 
  const getAttributes = (data: AllProductsQuery | undefined) => {
      const firstData = data?.products?.edges.map((el) => {
        return(el.node.attributes[0].values);
      })

      firstData?.map((el) => {
        el.forEach((secEl: attributeProps) => {
          if(secEl.name !== undefined && secEl.name !== null){
            sortAttributes(secEl.name);
          }
        })
      })

      return(attributesArray.current.map((el: string) => {
        return(
          <li key={el} className="scent__attribute">
            <label htmlFor="" className="scent__label">
                <input type="radio" name="radio-2" className="scent__radio radio radio-primary" />
                <span className="scent_span">{el}</span>
            </label>
          </li>
      )
    }))
  }



  return (
    <div className="scent">
      <h3 className="scent__title">
        Группы ароматов
      </h3>
      <ul className="scent__list">
          {getAttributes(data)}
      </ul>
    </div>
  );
};