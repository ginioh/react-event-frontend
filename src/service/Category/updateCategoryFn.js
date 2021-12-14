import httpClient from "../../utils/httpClient";

export default async (id, category) => await httpClient.put(`/categories/${id}`, category);
