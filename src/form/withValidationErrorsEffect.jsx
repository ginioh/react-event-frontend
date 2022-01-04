import React from "react";
import { get, isEmpty } from "lodash-es";
import { useSnackbar } from "notistack";

function withValidationErrorsEffect(BaseComponent) {
    return function (props) {
        const { enqueueSnackbar } = useSnackbar();

        React.useEffect(() => {
            const errors = get(props.form, "formState.errors", {});
            if (!isEmpty(errors)) {
                if (Object.values(errors).filter(i => i.type === "required").length > 1) {
                    enqueueSnackbar("Attenzione", "I campi non possono essere vuoti.", { variant: "warning" });
                } else {
                    for (let [, value] of Object.entries(errors)) {
                        enqueueSnackbar("Attenzione" + value.message, { variant: "warning" });
                    }
                }
            }
        }, [props.form.formState.errors]);

        return <BaseComponent {...props} />;
    };
}

export default withValidationErrorsEffect;
