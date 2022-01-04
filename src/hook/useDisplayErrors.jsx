import * as React from "react";
import { useSnackbar } from "notistack";

const useDisplayErrors = () => {

    const { enqueueSnackbar } = useSnackbar();

    const showErrors = (errors) => {
        if (Object.keys(errors).length > 1) enqueueSnackbar("Warning: fields cannot be empty.", { variant: "warning" });
        if (Object.keys(errors).length === 1) {
            for (let message of Object.values(errors)) {
                enqueueSnackbar("Warning: " + message, { variant: "warning" });
            }
        }
    }

    return { showErrors }
}

export default useDisplayErrors;