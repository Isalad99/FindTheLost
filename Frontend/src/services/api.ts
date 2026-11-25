import type { ApiResponse, Category, LostReport } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export async function getReports(category?: Category): Promise<LostReport[]> {
  try {
    const url = new URL(`${API_BASE_URL}/reports`);
    if (category) {
      url.searchParams.set('category', category);
    }
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json: ApiResponse<LostReport[]> = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Backend API unreachable, returning empty list:', err);
    return [];
  }
}
