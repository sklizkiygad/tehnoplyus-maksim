import {gql} from "@apollo/client";

const allCollections = gql`
    query allCollections {
        collections(first:100){
            edges{
                node{
                    id
                    name
                    slug
                }
            }
        }
    }
`;

const collectionBySlug = gql`
    query collectionBySlug($slug: String, $after: String){
        collection(slug: $slug channel: "main-channel") {
            id
            name
            slug
            products(first: 20 after: $after) {
                pageInfo {
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
    }
`;

export default {
    allCollections,
    collectionBySlug
};