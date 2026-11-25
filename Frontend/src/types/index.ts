export type Category = 'PERSON' | 'PET' | 'ITEM';
export type ReportStatus = 'LOST' | 'FOUND';

export interface UserSummary {
  id: number;
  name: string;
  tel?: string | null;
}

export interface LostReport {
  id: number;
  title: string;
  category: Category;
  lostDate: string;
  description: string;
  lastSeenLocation: string;
  contactTel: string;
  imageUrl?: string | null;
  status: ReportStatus;
  userId: number;
  user: UserSummary;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
}
