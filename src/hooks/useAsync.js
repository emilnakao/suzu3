import { useState, useEffect } from "react";

/**
 * Custom hook to fetch data from a given url.
 * 
 * Based on https://stackoverflow.com/questions/53059059/react-hooks-making-an-ajax-request
 * 
 * @param {*} url not null
 */
export const useAsync = ([asyncFunction, args]) => {
    const [value, setValue] = useState(undefined);

    useEffect(() => {
        async function fetchData(){
            if(!(typeof asyncFunction === 'function')){
                console.log(`Passed argument is not a function like expected: ${typeof asyncFunction}`);
                setValue([]);
                return;
            }

            const response = await asyncFunction(args);
            setValue(response["docs"]);
        }

        fetchData();
    }, [asyncFunction, args]);

    return value;
};