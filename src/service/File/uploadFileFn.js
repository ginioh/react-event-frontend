import httpClient from "../../util/httpClient";

const uploadFileFn = async (file) => {
    let formData = new FormData();
    formData.append("file", file)
    return await httpClient.post(`/files/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

export default uploadFileFn;