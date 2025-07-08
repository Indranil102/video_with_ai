import { IVideo } from "@/models/Video";

export type videoFormData = Omit<IVideo, "_id">; // omit is used to remove the _id field from the form d
type fetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>; // made headers optional
  body?: any | null;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: fetchOptions = {}
  ): Promise<T> {
    const { method = "GET", headers = {}, body } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(
      `/api${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`,
      {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
      }
    );
    if (!response.ok) {
      throw new Error((await response.text()) || "Network response was not ok");
    }
    return response.json();
  }

  async getVideo() {
    return this.fetch("/videos");
  }

  async createVideo(videoData: videoFormData) {
    return this.fetch("/videos", {
      method: "POST",
      body: videoData,
    });
  }
}

export const apiClient = new ApiClient();
