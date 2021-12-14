import httpClient from "../../util/httpClient";

const deletePromoterFn = async (id) =>
    await httpClient
        .delete(`/promoters/${id}`)

export default deletePromoterFn;