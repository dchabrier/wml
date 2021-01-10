
import { IResponse } from "./definitions/data.d";
import { request, gql } from 'graphql-request';
import { Request, Response } from "express";
import { retry } from "./utils";
import { brotliDecompressSync } from "zlib";

export let RequestGQL = request;
const url = 'https://developer.api.stg.walmart.com/api-proxy/service/Store-Services/Store-GraphQL-API/v1/graphql';

const _storesBySearchTerm = async (zip: string, rad: string): Promise<IResponse> => {
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
        searchOptions: { radius: ${radius}, maxResults: -1 }
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
    const data = await RequestGQL(url, query);
    if (data.error) {
      return {
        success: false,
        error: data.error
      };
    }
    return {
      success: true,
      body: data,
    };
  } catch (e) {
    return {
      success: false,
      error: 'Unexpected error occured.',
      body: e.response
    };
  }
};

export const storesBySearchTerm = async (req: Request | { params: any }, res: Response | { status: Function, json: Function }) => {
    return await retry(0, req, res, () =>
      _storesBySearchTerm(req.params.zipCode, req.params.radius));
};