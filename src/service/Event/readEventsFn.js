import httpClient from "../../util/httpClient";

const readEventsFn = async () =>
    await httpClient.get(`/events`);

export default readEventsFn;