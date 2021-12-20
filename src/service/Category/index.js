import React from "react";
import { useQuery, useMutation, QueryClient, useQueryClient } from "react-query"
import readCategoriesFn from "./readCategoriesFn";
import readCategoryByIdFn from "./readCategoryByIdFn";
import createCategoryFn from "./createCategoryFn";
import updateCategoryFn from "./updateCategoryFn";
import deleteCategoryFn from "./deleteCategoryFn";

function withCategoryService(BaseComponent) {
  return function (props) {
    const queryClient = useQueryClient();

    const [id, setId] = React.useState(undefined);

    const readCategories = useQuery(
      "readCategories",
      async () => await readCategoriesFn(),
      {
        manual: true,
        enabled: false,
      }
    );

    const readCategoryById = useQuery(
      ["readCategoryById", id],
      async () => {
        const { data } = await readCategoryByIdFn({ id })
        return data;
      },
      {
        manual: true,
        enabled: id ? true : false,
      }
    );

    const { mutate: createCategory, status: createCategoryInfo } = useMutation(
      async ({ data, createSuccessCb, createErrorCb }) => {
        return await createCategoryFn(data)
          .then((res) => {
            createSuccessCb();
            return res;
          })
          .catch((err) => {
            createErrorCb();
            return err;
          });
      }
    );

    const { mutate: updateCategory, status: updateCategoryInfo } = useMutation(
      async ({ data, createSuccessCb, createErrorCb }) => {
        return await updateCategoryFn(data)
          .then((res) => {
            createSuccessCb();
            return res;
          })
          .catch((err) => {
            createErrorCb();
            return err;
          });
      }
    );

    const { mutate: deleteCategory, status: deleteCategoryInfo } = useMutation(
      async ({ id, deleteSuccessCb, deleteErrorCb }) => {
        return await deleteCategoryFn(id)
          .then((res) => {
            deleteSuccessCb();
            return res;
          })
          .catch((err) => {
            deleteErrorCb();
            return err;
          });
      }
    );

    React.useEffect(() => {
      id === undefined && queryClient.invalidateQueries("readCategoryById");
    }, [id]);

    return (
      <BaseComponent
        id={id}
        setId={setId}
        readCategories={readCategories}
        readCategoryById={readCategoryById}
        createCategory={createCategory}
        createCategoryInfo={createCategoryInfo}
        updateCategory={updateCategory}
        updateCategoryInfo={updateCategoryInfo}
        deleteCategory={deleteCategory}
        deleteCategoryInfo={deleteCategoryInfo}
        {...props}
      />
    );
  };
}

export default withCategoryService;