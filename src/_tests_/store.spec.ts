import { IResponse } from "../definitions/data";
import { storesBySearchTerm, Request } from "../store";

describe("Walmart stores by location", () => {

    it("Should return 0 stores when zipCode and radius are empty", async () => {
        // data could be mocked here
        const stores: IResponse = await storesBySearchTerm('', '');
        expect(stores.error).toBe('Invalid zip code.');
        expect(stores.success).toBeFalsy();
    });

    it("Should return 50 store in Boca Raton area within 2 mile radius", async () => {
        // data could be mocked here
        const stores: IResponse = await storesBySearchTerm('33487', '2');
        expect(stores.body).toBeDefined();
        expect(stores.success).toBeTruthy();
        expect(stores.body.storesBySearchTerm.stores.length).toBe(50);
    });

    it("Should return 50 stores when radius is empty", async () => {
        // data could be mocked here
        const stores: IResponse = await storesBySearchTerm('33427', '');
        expect(stores.body).toBeDefined();
        expect(stores.success).toBeTruthy();
        expect(stores.body.storesBySearchTerm.stores.length).toBe(50)
    });

    it("Should return 29 stores in Boca Raton area within 20 mile radius", async () => {
        // data could be mocked here
        const stores: IResponse = await storesBySearchTerm('33487', '20');
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
        const mockedRequest = (Request as jest.Mocked<typeof Request>) = jest.fn();

        mockedRequest.mockImplementationOnce(async () => ({
            "storesBySearchTerm": {
                "stores": [
                    { "id": 2406, "displayName": "Delray Beach Neighborhood Market", "address": { "postalCode": "33483" }, "distance": 1.65 },
                    { "id": 1589, "displayName": "Delray Beach Supercenter", "address": { "postalCode": "33484" }, "distance": 2.64 }
                ]
            }
        }));

        const stores: IResponse = await storesBySearchTerm('33487', '20');
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
        // request function in storesBySearchTerm function  is mocked to not hit the API
        const mockedRequest = (Request as jest.Mocked<typeof Request>) = jest.fn();

        mockedRequest.mockImplementationOnce(async () => { throw new Error('Unexpected error occured.') });

        const stores: IResponse = await storesBySearchTerm('33487', '20');
        expect(stores.body).toBeUndefined()
        expect(stores.success).toBeFalsy();
        expect(stores.error).toBe('Unexpected error occured.')
    });
});