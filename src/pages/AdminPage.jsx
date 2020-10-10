import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import { csvImporter } from "../services/ApplicationContext";
import NotificationService from "../services/NotificationService";

/**
 *
 * @param {*} props
 */
function AdminPage() {
    const [loading, setLoading] = useState(false);

    const loadPersonCSV = (filePath) => {
        setLoading(true);
        csvImporter
            .importPerson(filePath)
            .then(() => {
                NotificationService.success(
                    "Sucesso",
                    "Importação de pessoas concluída com sucesso."
                );
            })
            .catch((error) => {
                NotificationService.error(
                    "Erro",
                    `Não foi possível importar a planilha de pessoas. ${error}`
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const loadEventTypeCSV = (filePath) => {
        setLoading(true);
        csvImporter
            .importEventType(filePath)
            .then(() => {
                NotificationService.success(
                    "Sucesso",
                    "Importação de tipos de evento concluída com sucesso."
                );
            })
            .catch((error) => {
                NotificationService.error(
                    "Erro",
                    `Não foi possível importar a planilha de tipos de evento. ${error}`
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const loadHanCSV = (filePath) => {
        setLoading(true);
        csvImporter
            .importHan(filePath)
            .then(() => {
                NotificationService.success(
                    "Sucesso",
                    "Importação de hans concluída com sucesso."
                );
            })
            .catch((error) => {
                NotificationService.error(
                    "Erro",
                    `Não foi possível importar a planilha de hans. ${error}`
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div role="main" className="w-100 vh-100">
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
                                <th scope="col">isMiKumite</th>
                                <th scope="col">isMtai</th>
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
                    {!loading && <FileUpload onFileUpload={loadPersonCSV} />}
                    {loading && <FontAwesomeIcon icon={faSpinner} spin />}
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
                    {!loading && <FileUpload onFileUpload={loadEventTypeCSV} />}
                    {loading && <FontAwesomeIcon icon={faSpinner} spin />}
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
                                <th scope="col">parentHanId</th>
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
                    {!loading && <FileUpload onFileUpload={loadHanCSV} />}
                    {loading && <FontAwesomeIcon icon={faSpinner} spin />}
                </section>
            </div>
        </div>
    );
}

export default AdminPage;
