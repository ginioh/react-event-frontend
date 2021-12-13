import React from "react";
import { useQuery, useMutation } from "react-query"


function withEventService(BaseComponent) {
  return function (props) {
    const readEvents = useQuery(
      "readEvents",
      async () => await readEventsFn(),
      {
        manual: true,
        enabled: false,
      }
    );

    const { mutate: createProduct, status: createProductInfo } = useMutation(
      async ({ data, createSuccessCb, createErrorCb }) => {
        return await createProductFn(data)
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

    const { mutate: deleteProduct, status: deleteProductInfo } = useMutation(
      async ({ id, deleteSuccessCb, deleteErrorCb }) => {
        return await deleteProductFn(id)
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
        readProducts={readProducts}
        createProduct={createProduct}
        createProductInfo={createProductInfo}
        deleteProduct={deleteProduct}
        deleteProductInfo={deleteProductInfo}
        {...props}
      />
    );
  };
}

export default withProductService;