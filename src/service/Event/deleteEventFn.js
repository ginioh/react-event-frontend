import httpClient from "../../util/httpClient";

const deleteEventFn = async (eventId) => {
    return await httpClient
        .delete(`/events/${eventId}`)
};

export default deleteEventFn;
