import { App } from '@/constants/App';

async function getUserAgent() {
  const osVersion = App.os.isIos ? `iOS ${App.os.version}` : `Android ${App.os.version}`;
  return `portier/KeyOnTheGo (${osVersion}; v${App.version})`;
}

export async function fetchWithPortierAgent(url: string) {
  try {
    const userAgent = await getUserAgent();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      headers: {
        'X-Portier-Agent': userAgent,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status !== 200) {
      if (response.status === 401) {
        throw new Error(`QR code expired or request not found. Please create a new request.`);
      }
      const errorJson = await response.json();
      throw new Error(
        `Request error with status "${response.status}" and message "${JSON.stringify(errorJson)}"`,
      );
    }
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(
        'Request timed out. Make sure you are in the same network with portier Vision.',
      );
    }

    throw error;
  }
}

export async function postWithPortierAgent(url: string, data: any) {
  try {
    const userAgent = await getUserAgent();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Portier-Agent': userAgent,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status !== 200) {
      if (response.status === 401) {
        throw new Error(`QR code expired or request not found. Please create a new request.`);
      }
      const errorJson = await response.json();
      throw new Error(
        `Request error with status "${response.status}" and message "${JSON.stringify(errorJson)}"`,
      );
    }
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(
        'Request timed out. Make sure you are in the same network with portier Vision.',
      );
    }

    throw error;
  }
}

export function addOpacity(hex: string, opacity: number) {
  const hexWithoutHash = hex.replace('#', '');
  const r = parseInt(hexWithoutHash.substring(0, 2), 16);
  const g = parseInt(hexWithoutHash.substring(2, 4), 16);
  const b = parseInt(hexWithoutHash.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// export function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
