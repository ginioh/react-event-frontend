import { Backdrop, CircularProgress } from "@mui/material";
import { get, isEmpty } from "lodash-es";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query"
import { AuthContext } from "../../context/Auth/authContext";
import createEventFn from "./createEventFn"
import deleteEventFn from "./deleteEventFn";
import readEventByIdFn from "./readEventByIdFn";
import readEventsFn from "./readEventsFn";
import readEventsMineFn from "./readEventsMineFn";
import updateEventFn from "./updateEventFn"

function withEventService(BaseComponent) {
  return function (props) {
    const [id, setEventId] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    const { isAuthorized } = React.useContext(AuthContext);
    const [readEventsFilters, setReadEventsFilters] = React.useState({});
    const [readEventsMineFilters, setReadEventsMineFilters] = React.useState({});

    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const readEvents = useQuery(
      "readEvents",
      async () => {
        const { data } = await readEventsFn({ filters: readEventsFilters });
        return data;
      },
      {
        manual: true,
        enabled: readEventsFilters && !isEmpty(readEventsFilters) ? true : false,
      }
    );

    const readEventsMine = useQuery(
      "readEventsMine",
      async () => await readEventsMineFn({ readEventsFilters }),
      {
        manual: false,
        enabled: readEventsMineFilters && !isEmpty(readEventsMineFilters) ? true : false,
      }
    );

    const readEventById = useQuery(
      ["readEventById", id],
      async () => {
        const { data } = await readEventByIdFn({ id });
        return data;
      },
      {
        manual: true,
        enabled: id ? true : false,
      }
    );

    // TODO: Handle not authorized error
    const { mutate: createEvent, status: createEventInfo } = useMutation(
      async ({ data, createSuccessCb, createErrorCb }) => {
        return isAuthorized(["admin"]) && await createEventFn(data)
          .then((res) => {
            const message = get(res, "data.message", null);
            message && enqueueSnackbar(message, { variant: "success" });
            queryClient.invalidateQueries("readEvents");
            if (createSuccessCb) createSuccessCb();
            return res;
          })
          .catch((e) => {
            console.log(e)
            enqueueSnackbar("Error: event cannot be created", { variant: "error" })
            if (createErrorCb) createErrorCb();
            return e;
          });
      }
    );

    const { mutate: updateEvent, status: updateEventInfo } = useMutation(
      async ({ data, createSuccessCb, createErrorCb }) => {
        return isAuthorized(["admin"]) && await updateEventFn(data)
          .then((res) => {
            const message = get(res, "data.message", null);
            message && enqueueSnackbar(message, { variant: "success" });
            queryClient.invalidateQueries("readEvents");
            if (createSuccessCb) createSuccessCb();
            return res;
          })
          .catch((e) => {
            console.log(e)
            enqueueSnackbar("Error: event cannot be updated", { variant: "error" })
            if (createErrorCb) createErrorCb();
            return e;
          });
      }
    );

    const { mutate: deleteEvent, status: deleteEventInfo } = useMutation(
      async ({ id, deleteSuccessCb, deleteErrorCb }) => {
        return isAuthorized(["admin"]) && await deleteEventFn(id)
          .then((res) => {
            deleteSuccessCb();
            return res;
          })
          .catch((e) => {
            deleteErrorCb();
            return e;
          });
      }
    );

    React.useEffect(() => {
      if (readEventsFilters && !isEmpty(readEventsFilters)) readEvents.refetch();
    }, [readEventsFilters])

    React.useEffect(() => {
      if (readEventsMineFilters && !isEmpty(readEventsMineFilters)) readEventsMine.refetch();
    }, [readEventsMineFilters])

    React.useEffect(() => {
      id === undefined && queryClient.invalidateQueries("readEventById");
    }, [id]);

    React.useEffect(() => {
      const queryStatus = [readEvents.isLoading, readEventsMine.isLoading, readEventById.isLoading];
      const mutationStatus = [createEventInfo.status, updateEventInfo.status, deleteEventInfo.status];
      const isLoading = item => item === "loading";
      const isTrue = item => item === true;
      mutationStatus.some(isLoading) || queryStatus.some(isTrue) ? setLoading(true) : setLoading(false);
    }, [readEvents.isLoading, readEventsMine.isLoading, readEventById.isLoading, createEventInfo.status, updateEventInfo.status, deleteEventInfo.status]);

    return (
      <>
        {/* <Backdrop
          open={loading}
          sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.1)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="primary" />
        </Backdrop> */}
        <BaseComponent
          readEvents={readEvents}
          readEventById={readEventById}
          createEvent={createEvent}
          createEventInfo={createEventInfo}
          updateEvent={updateEvent}
          updateEventInfo={updateEventInfo}
          deleteEvent={deleteEvent}
          deleteEventInfo={deleteEventInfo}
          setEventId={setEventId}
          setReadEventsFilters={setReadEventsFilters}
          setReadEventsMineFilters={setReadEventsMineFilters}
          {...props}
        />
      </>
    );
  };
}

export default withEventService;