export default async (eventId) => {
    return await httpClient
        .delete(`/events/${eventId}`)
};