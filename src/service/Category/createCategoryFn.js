import httpClient from "../../utils/httpClient";

export default async (category) => await httpClient.post(`/categories`, category);
