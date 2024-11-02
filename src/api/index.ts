import { ENDPOINT_SERVICE } from "@/configs/env";
import { ApiConfig } from "@/configs/api";



export const apiGetDataPokemon = async (param: string) => {

    const response = await ApiConfig({
        method: 'GET',
        url: `${ENDPOINT_SERVICE}${param}`,
        data: []
    })

    return response;
};
