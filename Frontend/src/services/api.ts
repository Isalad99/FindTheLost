import type { ApiResponse, Category, LostReport, ReportDetail } from '../types';

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

export async function getReportById(id: number): Promise<ReportDetail> {
  const res = await fetch(`${API_BASE_URL}/reports/${id}`);
  if (!res.ok) {
    throw new Error(res.status === 404 ? 'NOT_FOUND' : `HTTP error! status: ${res.status}`);
  }
  const json: ApiResponse<ReportDetail> = await res.json();
  return json.data;
}
