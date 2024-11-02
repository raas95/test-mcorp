import { ApiConfigParams, ApiResponse } from "./types/api";

export const ApiConfig = async <T = any>({
    method = "GET",
    url = "",
    data = {},
    contentType = "",
    token = ""
}: ApiConfigParams): Promise<ApiResponse<T>> => {
    let objectSend: RequestInit = {
        method,
        headers: {
            Authorization: token,
        },
    };

    const objectResponse: ApiResponse<T> = {
        status: false,
        data: [] as unknown as T,
    };

    switch (method) {
        case "GET":
            objectSend = { ...objectSend, next: { revalidate: 0 } as any };
            break;
        case "POST":
        case "PUT":
            objectSend.body = JSON.stringify(data);
            if (contentType) {
                objectSend.headers = {
                    ...objectSend.headers,
                    "Content-Type": contentType,
                };
            }
            break;
    }

    try {
        const response = await fetch(url, objectSend);
        const dataResponse = await response.json();

        if (dataResponse.status !== 200) {
            throw dataResponse;
        }

        objectResponse.status = response.ok;
        objectResponse.data = dataResponse;
    } catch (error: any) {
        objectResponse.data = error;

        if (error.code === 401) {
            window.location.href = "/logout";
        }
    }

    return objectResponse;
};
