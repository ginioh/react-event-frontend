import React from "react";
import { useQuery, useMutation } from "react-query"
import readEventsFn from "./Event/readEventsFn";
import createEventFn from "./Event/createEventFn";
import deleteEventFn from "./Event/deleteEventFn";
import updateEventFn from "./Event/updateEventFn";
import deleteEventFn from "./Event/deleteEventFn";
import { withSnackbar } from 'notistack';

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
      async (id) => await readEventsFn(id),
      {
        manual: true,
        enabled: false,
      }
    );

    const { mutate: createEvent, status: createEventInfo } = useMutation(
      async ({ data, createSuccessCb, createErrorCb }) => {
        return await createEventFn(data)
          .then((res) => {
              props.enqueueSnackbar(res.message)
            //createSuccessCb();
            return res;
          })
          .catch((err) => {
            createErrorCb();
            return err;
          });
      }
    );

    const { mutate: updateEvent, status: updateEventInfo } = useMutation(
      async ({ id, data, createSuccessCb, createErrorCb }) => {
        return await updateEventFn(id, data)
          .then((res) => {
            props.enqueueSnackbar(res.message)
            //createSuccessCb();
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
            props.enqueueSnackbar(res.message)
            //deleteSuccessCb();
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

export default withSnackbar(withEventService);