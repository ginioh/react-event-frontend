import httpClient from "../../utils/httpClient";

const updateCategoryFn = async (id, category) => await httpClient.put(`/categories/${id}`, category);

export default updateCategoryFn;