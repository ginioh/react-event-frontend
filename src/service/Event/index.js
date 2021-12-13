import React from "react";
import { useQuery, useMutation } from "react-query"
import createEventFn from "./createEventFn"
import deleteEventFn from "./deleteEventFn";
import readEventByIdFn from "./readEventByIdFn";
import readEventsFn from "./readEventsFn";
import updateEventFn from "./updateEventFn"

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

    const readEventById = useQuery(
        "readEventById",
        async (id) => await readEventByIdFn(id),
        {
          manual: true,
          enabled: false,
        }
      );

    const { mutate: createEvent, status: createEventInfo } = useMutation(
      async ({ data, createSuccessCb, createErrorCb }) => {
        return await createEventFn(data)
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

    const { mutate: updateEvent, status: updateEventInfo } = useMutation(
        async ({ data, createSuccessCb, createErrorCb }) => {
          return await updateEventFn(data)
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

    const { mutate: deleteEvent, status: deleteEventInfo } = useMutation(
      async ({ id, deleteSuccessCb, deleteErrorCb }) => {
        return await deleteEventFn(id)
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
        readEvents={readEvents}
        readEventById={readEventById}
        createEvent={createEvent}
        createEventInfo={createEventInfo}
        updateEvent={updateEvent}
        updateEventInfo={updateEventInfo}
        deleteEvent={deleteEvent}
        deleteEventInfo={deleteEventInfo}
        {...props}
      />
    );
  };
}

export default withEventService;