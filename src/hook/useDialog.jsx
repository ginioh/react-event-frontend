import * as React from "react";

const useDialog = () => {
    const [open, setOpen] = React.useState(false);
    // const [id, setId] = React.useState(undefined);

    // const openDialog = id => {
    //     setOpen(true);
    //     id && setId(id);
    // };

    // const closeDialog = () => {
    //     setOpen(false);
    //     setId(undefined);
    // };

    const handleOpen = (beforeCb, afterCb) => {
        // beforeCb && beforeCb();
        setOpen(true);
        // afterCb && afterCb();
    };

    const handleClose = (beforeCb, afterCb) => {
        // beforeCb && beforeCb();
        setOpen(false);
        // afterCb && afterCb();
    };

    return { open, handleOpen, handleClose };
};

export default useDialog;