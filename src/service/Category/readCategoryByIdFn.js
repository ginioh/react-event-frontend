import httpClient from "../../utils/httpClient";

export default async (id) =>
    await httpClient.get(`/categories/${id}`);