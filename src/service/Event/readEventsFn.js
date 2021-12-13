import httpClient from "../../util/httpClient";

export default async () =>
    await httpClient.get(`/events`);