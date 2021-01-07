
import { IResponse } from "./definitions/data.d";
import { request, gql } from 'graphql-request';

const url = 'https://developer.api.stg.walmart.com/api-proxy/service/Store-Services/Store-GraphQL-API/v1/graphql';

export let Request = request;
export const storesBySearchTerm = async (zip: string, rad: string): Promise<IResponse> => {
    const zipCode = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/.test(zip) ? zip : false;
    if (!zipCode) {
        return {
            success: false,
            error: 'Invalid zip code.'
        };
    }

    const radius = +rad && +rad < 50 ? rad : 50;

    const query = gql`
    query {
      storesBySearchTerm(
        searchTerm: "${zipCode}"
        searchOptions: { radius: ${radius}, maxResults: 50 }
      ) {
        stores {
          id
          displayName
          address {
            postalCode
          }
          distance
        }
      }
    }`

    try {
        const data = await Request(url, query);
        return {
            success: true,
            body: data
        };
    } catch (e) {
        return {
            success: false,
            error: 'Unexpected error occured.'
        };
    }
}