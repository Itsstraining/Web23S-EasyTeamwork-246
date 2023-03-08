export interface TaskModel{
    task_id: string;
    project_id: string;
    assignee: string;
    name: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    complexity: "easy" | "medium" | "hard";
    created_at: string;
    updated_at: string;
}