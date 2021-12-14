import httpClient from "../../util/httpClient";

const updatePromoterFn = async (id, category) => await httpClient.put(`/promoters/${id}`, category);

export default updatePromoterFn;