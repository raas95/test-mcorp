

export interface ApiConfigParams {
    method?: "GET" | "POST" | "PUT";
    url: string;
    data?: any;
    contentType?: string;
    token?: string;
}

export interface ApiResponse<T = any> {
    status: boolean;
    data: T;
}

