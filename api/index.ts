export function getRandomDateOrUndefined() {
  return Math.random() > 0.5 ? new Date().toISOString() : undefined;
}

export const apiRequest = async (
  url: string,
  options: RequestInit,
  errorMessage: string
) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${errorMessage}: ${response.status} - ${errorText}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
