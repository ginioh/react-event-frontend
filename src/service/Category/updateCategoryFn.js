import httpClient from "../../util/httpClient"

const updateCategoryFn = async (id, category) => await httpClient.put(`/categories/${id}`, category);

export default updateCategoryFn;