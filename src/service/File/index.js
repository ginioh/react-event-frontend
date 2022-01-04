import * as React from "react";
import { useQuery, useMutation } from "react-query"
import downloadFileFn from "./downloadFileFn";
import uploadFileFn from "./uploadFileFn";

function withFileService(BaseComponent) {
    return function (props) {

        const downloadFile = useQuery(
            "downloadFile",
            async (filename) => await downloadFileFn(filename),
            {
                manueal: true,
                enabled: false
            }
        )

        const { mutate: uploadFile, status: uploadFileInfo } = useMutation(
            async ({ file, createSuccessCb, createErrorCb }) => {
                return await uploadFileFn(file)
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

        const { mutate: multiUploadFile, status: multiUploadFileInfo } = useMutation(
            async ({ file, createSuccessCb, createErrorCb }) => {
                return await uploadFileFn(file)
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

        return (
            <BaseComponent
                downloadFile={downloadFile}
                uploadFile={uploadFile}
                uploadFileInfo={uploadFileInfo}
                multiUploadFile={multiUploadFile}
                multiUploadFileInfo={multiUploadFileInfo}
                {...props}
            />
        );
    }
}

export default withFileService;