import httpClient from "../../util/httpClient";

const readEventByIdFn = async (eventId) =>
    await httpClient.get(`/events/${eventId}`);

export default readEventByIdFn;