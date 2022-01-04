import httpClient from "../../util/httpClient";
import { buildQs } from "../../util/functions";

const readEventsMineFn = async ({ filters }) => {
    const qs = buildQs(filters);
    return await httpClient.get(`/events/mine${qs}`);
}

export default readEventsMineFn;