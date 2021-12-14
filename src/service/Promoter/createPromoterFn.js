import httpClient from "../../util/httpClient";

const createPromoterFn = async (promoter) => await httpClient.post(`/promoters`, promoter);

export default createPromoterFn;