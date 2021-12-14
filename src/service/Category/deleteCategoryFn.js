import httpClient from "../../util/httpClient";

const deleteCategoryFn = async (id) =>
    await httpClient
        .delete(`/categories/${id}`)

export default deleteCategoryFn;