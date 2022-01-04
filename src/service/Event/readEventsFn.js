import httpClient from "../../util/httpClient";
import { buildQs } from "../../util/functions";

const readEventsFn = async ({ filters }) => {
    const qs = buildQs(filters);
    console.log('qs', qs)
    return await httpClient.get(`/events${qs}`);
}

export default readEventsFn;