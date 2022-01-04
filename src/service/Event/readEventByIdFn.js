import httpClient from "../../util/httpClient";

const readEventByIdFn = async ({ id }) =>
    await httpClient.get(`/events/${id}`);

export default readEventByIdFn;