type fetchOptions={
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers: Record<string, string>;
    body?: FormData;
}