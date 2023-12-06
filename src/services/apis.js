const BASE_URL = process.env.REACT_APP_BASE_URL;

export const testEndpoints = {
    fetchTestsList: BASE_URL + "/fetchTestsList",
    fetchTest: BASE_URL + "/fetchTest",
}

export const createTestEndpoint = BASE_URL + "/create";