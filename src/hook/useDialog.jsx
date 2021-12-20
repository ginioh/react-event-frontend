import * as React from "react";

const useDialog = () => {
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(undefined);

    // const openDialog = id => {
    //     setOpen(true);
    //     id && setId(id);
    // };

    // const closeDialog = () => {
    //     setOpen(false);
    //     setId(undefined);
    // };

    const handleOpen = (id, beforeCb, afterCb) => {
        // beforeCb && beforeCb();
        id && setId(id)
        setOpen(true);
        // afterCb && afterCb();
    };

    const handleClose = (beforeCb, afterCb) => {
        // beforeCb && beforeCb();
        setId(undefined)
        setOpen(false);
        // afterCb && afterCb();
    };

    return { open, handleOpen, handleClose, id };
};

export default useDialog;