import {gql} from "@apollo/client";

const productsByCategory = gql`
    query productsByCategory($id: ID!, $lte: Float, $gte: Float, $direction: OrderDirection!, $field: ProductOrderField, $after: String){
        products(first: 20, filter: { categories: [ $id ], price: { lte: $lte, gte: $gte } }, sortBy: { direction: $direction field: $field }, after: $after, channel: "main-channel" ) {
            pageInfo{
                hasNextPage
                endCursor
            }
            totalCount
            edges {
                node {
                    id
                    name
                    slug
                    description
                    media {
                        url
                    }
                    thumbnail {
                        url
                    }
                    pricing {
                        onSale
                        discount {
                            currency
                            gross {
                                currency
                                amount
                            }
                            net {
                                currency
                                amount
                            }
                            tax {
                                currency
                                amount
                            }
                        }
                        priceRange {
                            start {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                            stop {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                        }
                    }
                    variants{
                        id
                        name
                        attributes{
                            attribute{
                                id
                                name
                            }
                        }
                    }
                    attributes{
                        attribute{
                            id
                            name
                            slug
                        }
                        values{
                            id
                            name
                            slug
                            value
                        }
                    }
                    category{
                        id
                        name
                    }
                    
                    defaultVariant{
                        sku
                    }
                }
            }
        }
    }
`;

const productsByMainCategory = gql`
    query productsByMainCategory($id: ID!, $after: String ){
        products(first: 20, filter: { categories: [ $id ] }, after: $after, channel: "main-channel",) {
            pageInfo{
                hasNextPage
                endCursor
            }
            totalCount
            edges {
                node {
                    id
                    name
                    slug
                    description
                    media {
                        url
                    }
                    thumbnail {
                        url
                    }
                    pricing {
                        onSale
                        discount {
                            currency
                            gross {
                                currency
                                amount
                            }
                            net {
                                currency
                                amount
                            }
                            tax {
                                currency
                                amount
                            }
                        }
                        priceRange {
                            start {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                            stop {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                        }
                    }
                    variants{
                        id
                        name
                        attributes{
                            attribute{
                                id
                                name
                            }
                        }
                    }
                    attributes{
                        attribute{
                            id
                            name
                            slug
                        }
                        values{
                            id
                            name
                            slug
                            value
                        }
                    }
                    category{
                        id
                        name
                    }

                    defaultVariant{
                        sku
                    }
                }
            }
        }
    }
`;


const productByName = gql`
    query productByName($search: String){
        products(first: 1, filter: { search: $search }, channel: "main-channel",) {
            edges {
                node {
                    id
                    name
                    slug
                    description
                    media {
                        url
                    }
                    thumbnail {
                        url
                    }
                    pricing {
                        onSale
                        discount {
                            currency
                            gross {
                                currency
                                amount
                            }
                            net {
                                currency
                                amount
                            }
                            tax {
                                currency
                                amount
                            }
                        }
                        priceRange {
                            start {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                            stop {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                        }
                    }
                    variants{
                        id
                        name
                        attributes{
                            attribute{
                                id
                                name
                            }
                        }
                    }
                    attributes{
                        attribute{
                            id
                            name
                            slug
                        }
                        values{
                            id
                            name
                            slug
                            value
                        }
                    }
                    category{
                        id
                        name
                    }
                    defaultVariant{
                        sku
                    }
                    metadata{
                        key
                        value
                    }
                }
            }
        }
    }
`;

const relatedProducts = gql`
    query relatedProducts($id: ID!) {
        products(first: 5, filter: { categories: [ $id ] }, channel: "main-channel",) {
            pageInfo{
                hasNextPage
                hasPreviousPage
            }
            edges {
                node {
                    id
                    name
                    slug
                    description
                    media {
                        url
                    }
                    thumbnail {
                        url
                    }
                    pricing {
                        onSale
                        discount {
                            currency
                            gross {
                                currency
                                amount
                            }
                            net {
                                currency
                                amount
                            }
                            tax {
                                currency
                                amount
                            }
                        }
                        priceRange {
                            start {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                            stop {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                        }
                    }
                    variants{
                        id
                        name
                        attributes{
                            attribute{
                                id
                                name
                            }
                        }
                    }
                    attributes{
                        attribute{
                            id
                            name
                            slug
                        }
                        values{
                            id
                            name
                            slug
                            value
                        }
                    }
                    category{
                        id
                        name
                    }
                    defaultVariant{
                        sku
                    }
                }
            }
        }
    }
`;

const featuredProducts = gql`
    query featuredProducts{
        products(first: 5, sortBy: { direction: DESC, field: RATING }, channel: "main-channel",) {
            pageInfo{
                hasNextPage
                hasPreviousPage
            }
            edges {
                node {
                    id
                    name
                    slug
                    rating
                    description
                    media {
                        url
                    }
                    thumbnail {
                        url
                    }
                    variants{
                        id
                        name
                        attributes{
                            attribute{
                                id
                                name
                            }
                        }
                    }
                    attributes{
                        attribute{
                            id
                            name
                            slug
                        }
                        values{
                            id
                            name
                            slug
                            value
                        }
                    }
                    category{
                        id
                        name
                    }
                    defaultVariant{
                        sku
                    }
                    pricing {
                        onSale
                        discount {
                            currency
                            gross {
                                currency
                                amount
                            }
                            net {
                                currency
                                amount
                            }
                            tax {
                                currency
                                amount
                            }
                        }
                        priceRange {
                            start {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                            stop {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                        }
                    }
                }
            }
        }
    }

`;

const newProducts = gql`
    query newProducts{
        products(first: 10 sortBy: { direction: DESC field: PUBLICATION_DATE }, channel: "main-channel",){
            edges {
                node {
                    id
                    name
                    slug
                    description
                    media {
                        url
                    }
                    thumbnail {
                        url
                    }
                    pricing {
                        onSale
                        discount {
                            currency
                            gross {
                                currency
                                amount
                            }
                            net {
                                currency
                                amount
                            }
                            tax {
                                currency
                                amount
                            }
                        }
                        priceRange {
                            start {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                            stop {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                        }
                    }
                    variants{
                        id
                        name
                        attributes{
                            attribute{
                                id
                                name
                            }
                        }
                    }
                    attributes{
                        attribute{
                            id
                            name
                            slug
                        }
                        values{
                            id
                            name
                            slug
                            value
                        }
                    }
                    category{
                        id
                        name
                    }
                    defaultVariant{
                        sku
                    }
                }
            }
        }
    }
`;

const products = gql`
    query products($lte: Float, $gte: Float, $direction: OrderDirection!, $field: ProductOrderField, $after: String, $collection: [ID!]){
        products(first: 20 sortBy: { direction: $direction field: $field } after: $after filter: { price: { lte: $lte, gte: $gte }, collections: $collection }, channel: "main-channel",) {
            pageInfo{
                hasNextPage
                endCursor
            }
            totalCount
            edges {
                node {
                    id
                    name
                    slug
                    rating
                    description
                    media {
                        url
                    }
                    thumbnail {
                        url
                    }
                    variants {
                        id
                        name
                        attributes {
                            attribute {
                                id
                                name
                            }
                        }
                    }
                    attributes{
                        attribute{
                            id
                            name
                            slug
                        }
                        values{
                            id
                            name
                            slug
                        }
                    }
                    pricing {
                        onSale
                        discount {
                            currency
                            gross {
                                currency
                                amount
                            }
                            net {
                                currency
                                amount
                            }
                            tax {
                                currency
                                amount
                            }
                        }
                        priceRange {
                            start {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                            stop {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const allProducts = gql`
    query allProducts($lte: Float, $gte: Float, $after: String, $collection: [ID!]){
        products(first: 20 after: $after filter: { price: { lte: $lte, gte: $gte }, collections: $collection }, channel: "main-channel",) {
            pageInfo{
                hasNextPage
                endCursor
            }
            totalCount
            edges {
                node {
                    id
                    name
                    slug
                    rating
                    description
                    media {
                        url
                    }
                    thumbnail {
                        url
                    }
                    variants {
                        id
                        name
                        attributes {
                            attribute {
                                id
                                name
                            }
                        }
                    }
                    attributes{
                        attribute{
                            id
                            name
                            slug
                        }
                        values{
                            id
                            name
                            slug
                        }
                    }
                    pricing {
                        onSale
                        discount {
                            currency
                            gross {
                                currency
                                amount
                            }
                            net {
                                currency
                                amount
                            }
                            tax {
                                currency
                                amount
                            }
                        }
                        priceRange {
                            start {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                            stop {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;


const searchProducts = gql`
    query searchProducts($search: String){
        products(first: 20, filter: { search: $search }, channel: "main-channel",) {
            pageInfo{
                hasNextPage
                endCursor
            }
            edges {
                node {
                    id
                    name
                    slug
                    thumbnail {
                        url
                    }
                    variants {
                        id
                        name
                        attributes {
                            attribute {
                                id
                                name
                            }
                        }
                    }
                    attributes{
                        attribute{
                            id
                            name
                            slug
                        }
                        values{
                            id
                            name
                            slug
                        }
                    }
                    pricing {
                        onSale
                        discount {
                            currency
                            gross {
                                currency
                                amount
                            }
                            net {
                                currency
                                amount
                            }
                        }
                        priceRange {
                            start {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                            }
                            stop {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                            }
                        }
                    }
                }
            }
        }
    }

`;

const bestSellers = gql`
    query bestSellers{
        reportProductSales(period: THIS_MONTH, channel: "main-channel", first: 8) {
            edges {
                node {
                    id
                    product {
                        id
                        name
                        slug
                        description
                        media {
                            url
                        }
                        thumbnail {
                            url
                        }
                        pricing {
                            onSale
                            discount {
                                currency
                                gross {
                                    currency
                                    amount
                                }
                                net {
                                    currency
                                    amount
                                }
                                tax {
                                    currency
                                    amount
                                }
                            }
                            priceRange {
                                start {
                                    currency
                                    gross {
                                        currency
                                        amount
                                    }
                                    net {
                                        currency
                                        amount
                                    }
                                    tax {
                                        currency
                                        amount
                                    }
                                }
                                stop {
                                    currency
                                    gross {
                                        currency
                                        amount
                                    }
                                    net {
                                        currency
                                        amount
                                    }
                                    tax {
                                        currency
                                        amount
                                    }
                                }
                            }
                        }
                        variants {
                            id
                            name
                            attributes {
                                attribute {
                                    id
                                    name
                                }
                            }
                        }
                        attributes {
                            attribute {
                                id
                                name
                                slug
                            }
                            values {
                                id
                                name
                                slug
                                value
                            }
                        }
                        category {
                            id
                            name
                        }

                        defaultVariant {
                            sku
                        }
                    }
                }
            }
        }
    }
`;

export default {
    productsByCategory,
    productsByMainCategory,
    productByName,
    relatedProducts,
    featuredProducts,
    newProducts,
    products,
    allProducts,
    searchProducts,
    bestSellers
};
