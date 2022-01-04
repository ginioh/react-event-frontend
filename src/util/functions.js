import { isEmpty } from "lodash-es";

export const buildQs = (filters) => {
    let qs = "";
    if (!isEmpty(filters)) {
        qs = `?limit=${filters.limit}`;

        if (filters.offset > -1) {
            qs = qs + `&offset=${filters.offset}`;
        }

        if (filters.fields && filters.fields.length) {
            qs = qs + `&fields=${filters.fields.join(',')}`
        }
    }
    return qs;
}