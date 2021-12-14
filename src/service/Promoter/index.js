import React from "react";
import { useQuery, useMutation } from "react-query"
import readPromoterByIdFn from "./readPromoterByIdFn";
import readPromotersFn from "./readPromotersFn";
import createPromoterFn from "./createPromoterFn";
import updatePromoterFn from "./updatePromoterFn";
import deletePromoterFn from "./deletePromoterFn";

function withPromoterService(BaseComponent) {
  return function (props) {
    const [id, setId] = React.useState(undefined);
    
    const readPromoters = useQuery(
      "readPromoters",
      async () => await readPromotersFn(),
      {
        manual: true,
        enabled: false,
      }
    );

    const readPromoterById = useQuery(
        ["readPromoterById", {id}],
        async (id) => await readPromoterByIdFn(id),
        {
          manual: true,
          enabled: !!id,
        }
      );

    const { mutate: createPromoter, status: createPromoterInfo } = useMutation(
      async ({ data, createSuccessCb, createErrorCb }) => {
        return await createPromoterFn(data)
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

    const { mutate: updatePromoter, status: updatePromoterInfo } = useMutation(
        async ({ data, createSuccessCb, createErrorCb }) => {
          return await updatePromoterFn(data)
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

    const { mutate: deletePromoter, status: deletePromoterInfo } = useMutation(
      async ({ id, deleteSuccessCb, deleteErrorCb }) => {
        return await deletePromoterFn(id)
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
        readPromoters={readPromoters}
        readPromoterById={readPromoterById}
        createPromoter={createPromoter}
        createPromoterInfo={createPromoterInfo}
        updatePromoter={updatePromoter}
        updatePromoterInfo={updatePromoterInfo}
        deletePromoter={deletePromoter}
        deletePromoterInfo={deletePromoterInfo}
        {...props}
      />
    );
  };
}

export default withPromoterService;