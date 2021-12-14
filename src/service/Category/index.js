import React from "react";
import { useQuery, useMutation } from "react-query"
import readCategoriesFn from "./readCategoriesFn";
import readCategoryByIdFn from "./readCategoryByIdFn";
import createCategoryFn from "./createCategoryFn";
import updateCategoryFn from "./updateCategoryFn";
import deleteCategoryFn from "./deleteCategoryFn";

function withCategoryService(BaseComponent) {
  return function (props) {
    const readCategories = useQuery(
      "readCategories",
      async () => await readCategoriesFn(),
      {
        manual: true,
        enabled: false,
      }
    );

    const readCategoryById = useQuery(
        "readCategoryById",
        async (id) => await readCategoryByIdFn(id),
        {
          manual: true,
          enabled: false,
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

    return (
      <BaseComponent
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