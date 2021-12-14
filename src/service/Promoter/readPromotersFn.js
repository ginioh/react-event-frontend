import httpClient from "../../util/httpClient";

const readPromotersFn = async () => await httpClient.get(`/promoters`);

export default readPromotersFn;