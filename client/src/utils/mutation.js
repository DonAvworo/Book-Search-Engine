// import the graphql-tag dependency
import { gql } from '@apollo/client';

// use the gql tag to parse our query string into a query document
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {  // define the mutation with its parameters (email and password)
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser(username: String!, $password: String!) {  // define the mutation with its parameters (username and password)
        addUser(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {  // define the mutation with its parameter (bookData)
        saveBook(bookData: $bookData) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {  // define the mutation with its parameter (bookId)
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;




