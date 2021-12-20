import httpClient from "../../util/httpClient"

const readCategoryByIdFn = async ({ id }) => await httpClient.get(`/categories/${id}`);

export default readCategoryByIdFn;
