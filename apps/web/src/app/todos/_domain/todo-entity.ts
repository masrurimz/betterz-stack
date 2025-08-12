export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface CreateTodoInput {
  text: string;
}

export interface UpdateTodoInput {
  id: string;
  completed: boolean;
}

export interface DeleteTodoInput {
  id: string;
}
