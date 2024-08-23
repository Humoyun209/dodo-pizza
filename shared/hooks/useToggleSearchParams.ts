export function useToggleSearchParams(key: string, value: string, searchParams: URLSearchParams) {
    const params = new URLSearchParams(searchParams.toString())
    if (params.get(key)) {
        params.delete(key);
    } else {
        params.set(key, value);
    }
    return params
}