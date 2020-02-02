import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CSVImporter from "../services/CSVImporter";
import FileUpload from "../components/FileUpload";

/**
 *
 * @param {*} props
 */
function AdminPage(props) {
    const loadPersonCSV = filePath => {
        CSVImporter.importPerson(filePath);
    };

    const loadEventTypeCSV = filePath => {
        CSVImporter.importEventType(filePath);
    };

    return (
        <div role="main" className="w-100 vh-100 jumbotron">
            <div className="col-md-12">
                {/* *********************************************************** */}
                {/* Person Import */}
                {/* *********************************************************** */}
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
                    <FileUpload onFileUpload={loadPersonCSV} />
                </section>
                <hr />
                {/* *********************************************************** */}
                {/* Event Type Import */}
                {/* *********************************************************** */}
                <h3>Importação de Tipos de Evento</h3>
                <section className="container">
                    <p>Exemplo de planilha (no formato .csv)</p>
                    <table class="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Cerimônia Mensal</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Dia Normal</td>
                            </tr>
                        </tbody>
                    </table>
                    <FileUpload onFileUpload={loadEventTypeCSV} />
                </section>
                <hr />
                {/* *********************************************************** */}
                {/* Han Import */}
                {/* *********************************************************** */}
                <h3>Importação de Hans</h3>
                <section className="container">
                    <p>Exemplo de planilha (no formato .csv)</p>
                    <table class="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">parent_han_id</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Núcleo Libélula</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Han do Sewagakari Joaquim</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>
                    <FileUpload onFileUpload={loadEventTypeCSV} />
                </section>
            </div>
        </div>
    );
}

export default AdminPage;
