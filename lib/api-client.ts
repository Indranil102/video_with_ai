type fetchOptions={
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers: Record<string, string>;
    body?: any | null;
}

class ApiClient {
    private  async fetch<T>(
        endpoint: string,
        options: fetchOptions ={}
    ): Promise<T>{
        const { method = "GET", headers={}, body } = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
    };

    const response = await this.fetch(`/api/${endpoint}`, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
    } 
    )
    return response.json();

    
    
  
}