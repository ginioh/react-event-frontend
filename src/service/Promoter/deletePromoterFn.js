export default async (id) =>
    await httpClient
        .delete(`/categories/${id}`)
