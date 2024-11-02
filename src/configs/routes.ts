export const routes = {
    detail: (filter: string) => `/pokemon/${filter}`,
    home: (filter: string) => `?${filter}`,
}