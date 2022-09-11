import { gql } from '@apollo/client';

export const QUERY_ME = gql` // define the query with no parameters
    {
        me {      // define the query with its field
            user  // define the field with its subfields
        }
    }
`;
