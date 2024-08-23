export const BASE_URL = "http://localhost:3000/api"

export const fetcher = async (url: string, init: RequestInit) => {
    const result = await fetch(url, init)
    if (!result.ok) {
        throw new Error(`Ошибка запроса: ${result.status} ${result.statusText}`)
    }
    return await result.json()
}