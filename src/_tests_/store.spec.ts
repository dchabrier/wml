import { IResponse } from "../definitions/data";
import { storesBySearchTerm, RequestGQL } from "../store";
import { retry } from "../utils";

const res = {
    status: () => { return { json: (d: any) => d } },
    json: (d: any) => d
};
describe("Walmart stores by location", () => {

    it("Should return 0 stores when zipCode and radius are empty", async () => {
        const params = { params: { zipCode: '', radius: '' } };
        // data could be mocked here
        const stores: IResponse = await storesBySearchTerm(params, res);
        expect(stores.error).toBe('Invalid zip code.');
        expect(stores.success).toBeFalsy();
    });

    it("Should return 50 store in Boca Raton area within 2 mile radius", async () => {
        const params = { params: { zipCode: '33487', radius: '2' } };
        // data could be mocked here
        const stores: IResponse = await storesBySearchTerm(params, res);
        expect(stores.body).toBeDefined();
        expect(stores.success).toBeTruthy();
        expect(stores.body.storesBySearchTerm.stores.length).toBe(59);
    });

    it("Should return 50 stores when radius is empty", async () => {
        const params = { params: { zipCode: '33427', radius: '' } };
        // data could be mocked here
        const stores: IResponse = await storesBySearchTerm(params, res);
        expect(stores.body).toBeDefined();
        expect(stores.success).toBeTruthy();
        expect(stores.body.storesBySearchTerm.stores.length).toBe(60)
    });

    it("Should return 29 stores in Boca Raton area within 20 mile radius", async () => {
        const params = { params: { zipCode: '33487', radius: '20' } };
        // data could be mocked here
        const stores: IResponse = await storesBySearchTerm(params, res);
        expect(stores.body).toBeDefined();
        expect(stores.success).toBeTruthy();
        expect(stores.body.storesBySearchTerm.stores.length).toBe(29)
        expect(stores.body).toStrictEqual({
            "storesBySearchTerm": {
                "stores": [
                    { "id": 2406, "displayName": "Delray Beach Neighborhood Market", "address": { "postalCode": "33483" }, "distance": 1.65 },
                    { "id": 1589, "displayName": "Delray Beach Supercenter", "address": { "postalCode": "33484" }, "distance": 2.64 },
                    { "id": 2396, "displayName": "Boynton Beach Neighborhood Market", "address": { "postalCode": "33436" }, "distance": 5.68 },
                    { "id": 5911, "displayName": "Boynton Beach Supercenter", "address": { "postalCode": "33435" }, "distance": 5.92 },
                    { "id": 3104, "displayName": "Deerfield Beach Neighborhood Market", "address": { "postalCode": "33442" }, "distance": 7.86 },
                    { "id": 3858, "displayName": "Boca Raton Supercenter", "address": { "postalCode": "33428" }, "distance": 7.97 },
                    { "id": 1517, "displayName": "Pompano Beach Supercenter", "address": { "postalCode": "33064" }, "distance": 8.14 },
                    { "id": 2789, "displayName": "Boynton Beach Supercenter", "address": { "postalCode": "33436" }, "distance": 8.15 },
                    { "id": 3011, "displayName": "Boynton Beach Neighborhood Market", "address": { "postalCode": "33436" }, "distance": 8.35 },
                    { "id": 1916, "displayName": "Coconut Creek Supercenter", "address": { "postalCode": "33073" }, "distance": 9.23 },
                    { "id": 1398, "displayName": "Lake Worth Supercenter", "address": { "postalCode": "33463" }, "distance": 11.41 },
                    { "id": 1387, "displayName": "Coral Springs Supercenter", "address": { "postalCode": "33067" }, "distance": 11.44 },
                    { "id": 5759, "displayName": "Lake Worth Neighborhood Market", "address": { "postalCode": "33467" }, "distance": 12.68 },
                    { "id": 4498, "displayName": "Coral Springs Neighborhood Market", "address": { "postalCode": "33067" }, "distance": 13.03 },
                    { "id": 2962, "displayName": "Pompano Beach Supercenter", "address": { "postalCode": "33069" }, "distance": 13.23 },
                    { "id": 4617, "displayName": "Pompano Beach Neighborhood Market", "address": { "postalCode": "33062" }, "distance": 13.51 },
                    { "id": 2963, "displayName": "Coral Springs Supercenter", "address": { "postalCode": "33076" }, "distance": 13.55 },
                    { "id": 5325, "displayName": "Margate Supercenter", "address": { "postalCode": "33063" }, "distance": 13.8 },
                    { "id": 5758, "displayName": "Greenacres Neighborhood Market", "address": { "postalCode": "33467" }, "distance": 14.93 },
                    { "id": 5882, "displayName": "Palm Springs Supercenter", "address": { "postalCode": "33461" }, "distance": 15.2 },
                    { "id": 4380, "displayName": "Coral Springs Neighborhood Market", "address": { "postalCode": "33071" }, "distance": 15.91 },
                    { "id": 6967, "displayName": "Lake Worth Neighborhood Market", "address": { "postalCode": "33449" }, "distance": 15.99 },
                    { "id": 4441, "displayName": "Palm Springs Village Neighborhood Market", "address": { "postalCode": "33406" }, "distance": 16.56 },
                    { "id": 1851, "displayName": "North Lauderdale Supercenter", "address": { "postalCode": "33068" }, "distance": 16.56 },
                    { "id": 1436, "displayName": "Greenacres Supercenter", "address": { "postalCode": "33415" }, "distance": 16.76 },
                    { "id": 2930, "displayName": "Tamarac Neighborhood Market", "address": { "postalCode": "33321" }, "distance": 17.78 },
                    { "id": 3625, "displayName": "Lauderdale Lakes Supercenter", "address": { "postalCode": "33313" }, "distance": 18.54 },
                    { "id": 1349, "displayName": "Sunrise Supercenter", "address": { "postalCode": "33351" }, "distance": 19.55 },
                    { "id": 5301, "displayName": "West Palm Beach Supercenter", "address": { "postalCode": "33406" }, "distance": 19.57 }
                ]
            }
        });
    });

    it("Should return 2 stores in Boca Raton area within 20 mile radius with mocked data", async () => {
        // request function in storesBySearchTerm function  is mocked to not hit the API
        const mockedRequest = (RequestGQL as jest.Mocked<typeof RequestGQL>) = jest.fn();

        mockedRequest.mockImplementationOnce(async () => ({
            "storesBySearchTerm": {
                "stores": [
                    { "id": 2406, "displayName": "Delray Beach Neighborhood Market", "address": { "postalCode": "33483" }, "distance": 1.65 },
                    { "id": 1589, "displayName": "Delray Beach Supercenter", "address": { "postalCode": "33484" }, "distance": 2.64 }
                ]
            }
        }));

        const params = { params: { zipCode: '33487', radius: '20' } };
        const stores: IResponse = await storesBySearchTerm(params, res);
        expect(stores.body).toBeDefined();
        expect(stores.success).toBeTruthy();
        expect(stores.body.storesBySearchTerm.stores.length).toBe(2)
        expect(stores.body).toStrictEqual({
            "storesBySearchTerm": {
                "stores": [
                    { "id": 2406, "displayName": "Delray Beach Neighborhood Market", "address": { "postalCode": "33483" }, "distance": 1.65 },
                    { "id": 1589, "displayName": "Delray Beach Supercenter", "address": { "postalCode": "33484" }, "distance": 2.64 }
                ]
            }
        });
    });

    it("Should return 'Unexpected error occured.'", async () => {
        const params = { params: { zipCode: '33487', radius: '20' } };
        // request function in storesBySearchTerm function  is mocked to not hit the API
        const mockedRequest = (RequestGQL as jest.Mocked<typeof RequestGQL>) = jest.fn();
        // const mockedRetry = (retry as jest.Mocked<typeof retry>) = jest.fn();

        // mockedRequest.mockImplementationOnce((d: any) => d);
        mockedRequest.mockImplementationOnce(() => { throw new Error('Unexpected error occured.'); });

        const stores: IResponse = await storesBySearchTerm(params, res);
        expect(stores.body).toBeUndefined()
        expect(stores.success).toBeFalsy();
        expect(stores.error).toBe('Unexpected error occured.')
    });

    it("Should return errors", async () => {
        // request function in storesBySearchTerm function  is mocked to not hit the API
        const mockedRequest = (RequestGQL as jest.Mocked<typeof RequestGQL>) = jest.fn();

        mockedRequest.mockImplementationOnce(async () => ({
            "errors": [
                {
                    "message": "child \"distance\" fails because [\"distance\" must be a positive number]",
                    "locations": [
                        {
                            "line": 3,
                            "column": 7
                        }
                    ],
                    "path": [
                        "storesBySearchTerm"
                    ]
                }
            ]
        }));

        const params = { params: { zipCode: '33487', radius: '-1' } };
        const stores: IResponse = await storesBySearchTerm(params, res);
        expect(stores.body).toBeDefined();
        expect(stores.success).toBeTruthy();
        expect(stores.body.errors.length).toBe(1)
    });

    it("Should return an error and retry", async () => {
        // request function in storesBySearchTerm function  is mocked to not hit the API
        const mockedRequest = (RequestGQL as jest.Mocked<typeof RequestGQL>) = jest.fn();
        const body = {
            "storesBySearchTerm": {
                "stores": [
                    { "id": 2406, "displayName": "Delray Beach Neighborhood Market", "address": { "postalCode": "33483" }, "distance": 1.65 },
                    { "id": 1589, "displayName": "Delray Beach Supercenter", "address": { "postalCode": "33484" }, "distance": 2.64 }
                ]
            }
        }
        mockedRequest
            .mockImplementationOnce(async () => ({
                statusCode: 503,
                error: 'Service Unavailable',
                message: 'Service Unavailable',
                status: 520
            }))
            .mockImplementationOnce(async () => body);

        const params = { params: { zipCode: '72712', radius: '30' } };
        const stores: IResponse = await storesBySearchTerm(params, res);

        expect(stores.body).toBeDefined();
        expect(stores.success).toBeTruthy();
        expect(stores.body.storesBySearchTerm.stores.length).toBe(2);
        expect(stores.body).toStrictEqual(body);
    });

    it("Should return an error on retry function", async () => {
        // request function in storesBySearchTerm function  is mocked to not hit the API
        const mockedRequest = (RequestGQL as jest.Mocked<typeof RequestGQL>) = jest.fn();
        const mockedStoresBySearchTerm = (storesBySearchTerm as jest.Mocked<typeof storesBySearchTerm>) = jest.fn();
      
        mockedStoresBySearchTerm
            .mockImplementationOnce(async () => {});

        const params = { params: { zipCode: '72712', radius: '30' } };
        const stores: IResponse = await retry(0, params, res,() => {
            throw new Error("Random error.")
        } );

        expect(stores.success).toBeFalsy();
        expect(stores.error).toBe('Random error.');
    });
});