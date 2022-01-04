import httpClient from "../../util/httpClient";

const downloadFileFn = async (filename) =>
    await httpClient.get(`/files/${filename}`);

export default downloadFileFn;