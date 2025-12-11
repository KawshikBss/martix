import { getCookie } from "cookies-next";

export interface HttpClient {
    get<T>(url: string, options?: RequestInit): Promise<T>;
    post<T>(url: string, body: any, options?: RequestInit): Promise<T>;
    delete<T>(url: string, options?: RequestInit): Promise<T>;
}

class FetchHttpClient implements HttpClient {
    private async request<T>(url: string, options?: RequestInit) {
        const authToken = await getCookie("authToken");
        if (authToken) {
            options = {
                ...options,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    ...(options?.headers || {}),
                },
            };
        }
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
            options
        );
        const data = await response.json();
        return data;
    }

    get<T>(url: string, options?: RequestInit): Promise<T> {
        return this.request<T>(url, { method: "GET", ...options });
    }

    post<T>(url: string, body: any, options?: RequestInit): Promise<T> {
        return this.request<T>(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                ...(options?.headers || {}),
            },
            ...options,
        });
    }

    delete<T>(url: string, options?: RequestInit): Promise<T> {
        return this.request<T>(url, { method: "DELETE", ...options });
    }
}

export const apiClient: HttpClient = new FetchHttpClient();
