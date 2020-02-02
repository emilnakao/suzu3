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
                    <p>Exemplo de planilha (no formato .csv)</p>
                    <table class="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">is_mikumite</th>
                                <th scope="col">is_mtai</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Kátia Leite</td>
                                <td>true</td>
                                <td>false</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Café Neto</td>
                                <td>false</td>
                                <td>true</td>
                            </tr>
                        </tbody>
                    </table>
                    <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>Clique aqui ou arraste arquivos para cá</p>
                    </div>
                    <aside>
                        <h4>Arquivos Selecionados</h4>
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
