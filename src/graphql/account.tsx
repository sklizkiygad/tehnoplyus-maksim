import {gql} from "@apollo/client";

const createUser = gql`
    mutation createUser($firstName: String, $email: String!, $password: String!){
        accountRegister(
            input: { firstName: $firstName, email: $email, password: $password, redirectUrl: "https://otlivant.com"}
        ) {
            accountErrors {
                field
                code
            }
            user {
                email
                isActive
            }
        }
    }
`;

const confirmUser = gql`
    mutation confirmUser($email: String!, $token: String!){
        confirmAccount(
            email: $email
            token: $token
        ) {
            accountErrors {
                field
                code
            }
            user {
                email
                isActive
            }
        }
    }
`;

const login = gql`
    mutation login($email: String!, $password: String!){
        tokenCreate(email: $email, password: $password) {
            token
            refreshToken
            csrfToken
            user {
                email
            }
            errors {
                field
                message
            }
        }
    }
`;

const logout = gql`
    mutation logout {
        tokensDeactivateAll {
            accountErrors {
                field
                message
                code
            }
        }
    }
`;

const changePass = gql`
    mutation changePass($oldPassword: String!, $newPassword: String!) {
        passwordChange(oldPassword: $oldPassword, newPassword: $newPassword) {
            accountErrors {
                field
                code
            }
        }
    }
`;

export const REFRESH_TOKEN = gql`
    mutation refreshToken($csrfToken: String!){
        tokenRefresh(csrfToken: $csrfToken) {
            token
            accountErrors {
                code
            }
        }
    }
`

export default {
    createUser,
    login,
    logout,
    changePass,
    confirmUser

};