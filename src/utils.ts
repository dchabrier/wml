import { Request, Response } from "express";
import { IResponse } from "./definitions/data";

const WAIT = 5000000;
const MAX_RETRY = 3;
export const sleep = (m: number) => new Promise(r => setTimeout(r, m));

export const retry = async (nbRetry = 0, req: Request | { params: any }, res: Response | { status: Function, json: Function }, func: Function): Promise<any> => {
    if (nbRetry) {
        sleep(WAIT); // we are waiting 5 sec before
    }
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