export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  completed: boolean;
  completed_at: string | null;
  due_date: string | null;
  important: boolean;
  created_at: string;
  updated_at: string;
}
