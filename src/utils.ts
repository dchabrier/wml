import { Request, Response } from "express";
import { IResponse } from "./definitions/data";

export const WAIT = 4000;
const MAX_RETRY = 10;

export const sleep = require('util').promisify(setTimeout);

export const retry = async (nbRetry = 0, req: Request | { params: any }, res: Response | { status: Function, json: Function }, func: Function): Promise<any> => {
    try {
        const data: IResponse = await func();

        // response body when service is unavailable
        // {
        //   statusCode: 503,
        //   error: 'Service Unavailable',
        //   message: 'Service Unavailable',
        //   status: 520
        // }
        if (data.error) {
            if (nbRetry < MAX_RETRY && data.error) {
                nbRetry++;
                // console.log('timed out, retrying:', nbRetry);
                return await retry(nbRetry, req, res, func);
            } else {
                return res.status(500).json(data);
            }
        }
        return res.json(data);
    } catch (error) {
        if (nbRetry < MAX_RETRY) {
            nbRetry++;

            return await retry(nbRetry, req, res, func);
        } else {
            return {
                success: false,
                error: error.message
            };
        }
    }
};