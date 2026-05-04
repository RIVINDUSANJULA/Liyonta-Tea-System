const BASE_URL = 'http://127.0.0.1:8801';

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    // Return safe fallback data based on expected return type
    // This is handled better by SWR's fallbackData or error handling
    throw error;
  }
}
