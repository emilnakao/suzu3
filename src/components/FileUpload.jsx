import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({ onFileUpload }) {
    const onDrop = useCallback(
        (acceptedFiles) => {
            acceptedFiles.forEach((file) => {
                onFileUpload(file.path);
            });
        },
        [onFileUpload]
    );

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    /**
     * Already uploaded files
     */
    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <React.Fragment>
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Clique aqui ou arraste arquivos para cá</p>
            </div>
            <aside>
                <h4>Arquivos Selecionados</h4>
                <ul>{files}</ul>
            </aside>
        </React.Fragment>
    );
}
