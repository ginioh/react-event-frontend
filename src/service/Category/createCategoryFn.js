import httpClient from "../../util/httpClient"

const createCategoryFn = async (category) => await httpClient.post(`/categories`, category);

export default createCategoryFn;