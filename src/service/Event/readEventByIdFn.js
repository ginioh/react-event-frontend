import httpClient from "../../utils/httpClient";

export default async (eventId) =>
    await httpClient.get(`/events/${eventId}`);