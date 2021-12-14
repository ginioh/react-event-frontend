import httpClient from "../../util/httpClient";

const readPromoterByIdFn = async (id) =>
    await httpClient.get(`/promoters/${id}`);

export default readPromoterByIdFn;