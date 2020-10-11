import { useState, useEffect } from "react";
import NotificationService from "../services/NotificationService";

/**
 * Custom hook to fetch data from a given url.
 * 
 * Based on https://stackoverflow.com/questions/53059059/react-hooks-making-an-ajax-request
 * 
 * @param {*} url not null
 */
export const useAsync = ([asyncFunction, args]) => {
    const [value, setValue] = useState(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData(){
            if(!(typeof asyncFunction === 'function')){
                console.log(`Passed argument is not a function like expected: ${typeof asyncFunction}`);
                setValue([]);
                return;
            }

            setLoading(true);
            asyncFunction(args).then((response) => {
                setValue(response["docs"]);
            }).catch((error) => {
                NotificationService.error('Erro na busca', error);
            }).finally(() => {
                setLoading(false);
            });
        }

        fetchData();
    }, [asyncFunction, args]);

    return [value, loading];
};