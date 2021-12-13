import httpClient from "../../utils/httpClient";

export default async (event) => await httpClient.post(`/events`, event);
