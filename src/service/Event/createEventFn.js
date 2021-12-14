import httpClient from "../../util/httpClient";

const createEventFn = async (event) => await httpClient.post(`/events`, event);

export default createEventFn;