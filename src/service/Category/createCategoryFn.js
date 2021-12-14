import httpClient from "../../utils/httpClient";

const createCategoryFn = async (category) => await httpClient.post(`/categories`, category);

export default createCategoryFn;