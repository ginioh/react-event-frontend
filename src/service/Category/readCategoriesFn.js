import httpClient from "../../util/httpClient";

const readCategoriesFn = async () =>
    await httpClient.get(`/categories`);

export default readCategoriesFn;