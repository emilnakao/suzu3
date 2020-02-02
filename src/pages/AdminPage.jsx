import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CSVImporter from "../services/CSVImporter";

function AdminPage(props) {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
        CSVImporter.importPerson(file.path);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div role="main" className="w-100 vh-100 jumbotron">
      <div className="col-md-12">
        <h3>Importação de Pessoas</h3>
        <section className="container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </section>
        <hr />
        <h3>Importação de Cidades, Estado, País</h3>
        <hr />
        <h3>Importação de Regionais</h3>
        <hr />
        <h3>Importação de Tipos de Evento</h3>
      </div>
    </div>
  );
}

export default AdminPage;
