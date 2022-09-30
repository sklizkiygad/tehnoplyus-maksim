import {gql} from "@apollo/client";

const createCheckout = gql`
    mutation createCheckout(
        $email: String
        $firstName: String
        $lastName: String
        $streetAddress1: String
        $city: String
        $country: CountryCode!
        $countryArea: String
        $postalCode: String
        $lines: [CheckoutLineInput!]!
        $phone: String
    ){
        checkoutCreate(
            input: {
                email: $email
                lines: $lines
                shippingAddress: {
                    firstName: $firstName
                    lastName: $lastName
                    streetAddress1: $streetAddress1
                    city: $city
                    country: $country
                    countryArea: $countryArea
                    postalCode: $postalCode
                    phone: $phone
                }
                billingAddress: {
                    firstName: $firstName
                    lastName: $lastName
                    streetAddress1: $streetAddress1
                    city: $city
                    country: $country
                    countryArea: $countryArea
                    postalCode: $postalCode
                    phone: $phone
                }
            }
        ) {
            checkout {
                id
                token
                email
                created
                totalPrice {
                    net {
                        amount
                        currency
                    }
                }
                isShippingRequired
                availableShippingMethods {
                    id
                    name
                }
                availablePaymentGateways {
                    id
                    name
                    config {
                        field
                        value
                    }
                }
            }
            checkoutErrors {
                field
                code
            }
        }
    }
`;

const checkout = gql`
    query checkout( $token: UUID){
        checkout(token: $token) {
            id
            token
            created
            email
            totalPrice {
                net {
                    currency
                    amount
                }
            }
            isShippingRequired
            availableShippingMethods {
                id
                name
            }
            availablePaymentGateways {
                id
                name
                config {
                    field
                    value
                }
            }
            lines{
                id
                quantity
            }
            user{
                email
            }
        }
    }
`;

const order = gql`
    query orderByToken($token: UUID!){
        orderByToken(token: $token) {
            id
            token
            created
            userEmail
            total {
                net {
                    currency
                    amount
                }
            }
            lines{
                id
                quantity
                unitPrice{
                    currency
                    net{
                      currency
                      amount
                    }
                }
                productName
                variantName
            } 
        }
    }
`;


const assignShippingMethod = gql`
    mutation assignShippingMethod($token: UUID, $shippingMethodId: ID!){
      checkoutShippingMethodUpdate(
        token: $token
        shippingMethodId: $shippingMethodId
      ) {
        checkout {
          id
          shippingMethod {
            name
          }
          totalPrice {
            net {
              amount
              currency
            }
          }
        }
        checkoutErrors {
          field
          message
        }
      }
}
`;

const createPayment = gql`
    mutation checkoutPaymentCreate($token: UUID, $total: PositiveDecimal, $gateway: String!){
      checkoutPaymentCreate(
        token: $token
        input: {
          gateway: $gateway
          amount: $total
          token: "tokencc_bh_s3bjkh_24smq8_6c6zhq_w4v6b9_8vz"
        }
      ) {
        payment {
          id
          chargeStatus
        }
        paymentErrors {
          field
          message
        }
      }
}
`;


const completeCheckout = gql`
mutation completeCheckout($tokenCheckout: UUID) {
  checkoutComplete(token: $tokenCheckout) {
    order {
      id
      status
      token
      total {
        net {
          amount
          currency
        }
      }
      created
      userEmail
      lines {
        id
        quantity
      }
    }
    checkoutErrors {
      field
      message
    }
  }
}
`;


const draftOrderCreate = gql`
    mutation draftOrderCreate(
        $firstName: String
        $lastName: String
        $userEmail: String
        $phone: String
        $streetAddress1: String
        $city: String
        $country: CountryCode!
        $countryArea: String
        $postalCode: String
        $lines: [OrderLineCreateInput!]!
        $customerNote: String
    ){
        draftOrderCreate(
            input: {
                userEmail: $userEmail
                lines: $lines
                customerNote: $customerNote
                shippingAddress: {
                    firstName: $firstName
                    lastName: $lastName
                    streetAddress1: $streetAddress1
                    city: $city
                    phone: $phone
                    country: $country
                    countryArea: $countryArea
                    postalCode: $postalCode
                }
                billingAddress: {
                    firstName: $firstName
                    lastName: $lastName
                    streetAddress1: $streetAddress1
                    city: $city
                    phone: $phone
                    country: $country
                    countryArea: $countryArea
                    postalCode: $postalCode
                }
            }
        ) {
            order {
                id
                token
                userEmail
                created
                total {
                    net {
                        amount
                        currency
                    }
                }
                isShippingRequired
            }
            errors {
                field
                code
            }
        }
    }
`;

export default {
    checkout,
    order,
    createCheckout,
    draftOrderCreate,
    completeCheckout,
    assignShippingMethod,
    createPayment
};
