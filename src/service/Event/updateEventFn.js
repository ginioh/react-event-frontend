import httpClient from "../../util/httpClient";

const updateEventFn = async (id, event) => await httpClient.put(`/events/${id}`, event);

export default updateEventFn;