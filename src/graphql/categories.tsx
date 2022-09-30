import {gql} from "@apollo/client";
const categories = gql`
    query Categories {
        categories(first: 30 level: 0) {
            edges {
                node {
                    id
                    name
                    slug
                    level
                    children(first: 30) {
                        edges {
                            node {
                                id
                                name
                                slug
                                children(first: 30) {
                                    edges {
                                        node {
                                            id
                                            name
                                            slug
                                        }
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

const categoriesByLevel = gql`
    query categoriesByLevel($level: Int) {
        categories(first: 8 level: $level) {
            edges {
                node {
                    id
                    name
                    slug
                    level
                    backgroundImage{
                        url
                    }
                }
            }
        }
    }
`;

const categoryBySlug = gql`
    query categoryBySlug($slug: String, $after: String) {
        category(slug: $slug){
            name
            slug
            id
            backgroundImage{
                url
            }
            products(first: 1, after: $after ) {
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
    }
`;


export default {
    categories,
    categoriesByLevel,
    categoryBySlug
}