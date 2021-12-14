import httpClient from "../../utils/httpClient";

export default async (id, event) => await httpClient.put(`/events/${id}`, event);
