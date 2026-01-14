type EmptyMessageType =
  | "todo"
  | "done";

type PageType =
  | "my day"
  | "important"
  | "scheduled"
  | "tasks";

export const emptyMessages: Record<PageType, Record<EmptyMessageType, string>> =
{
  "my day": {
    todo: "Nenhuma tarefa para hoje",
    done: "Você ainda não concluiu nenhuma tarefa hoje",
  },
  important: {
    todo: "Nenhuma tarefa importante",
    done: "Nenhuma tarefa importante concluída",
  },
  scheduled: {
    todo: "Nenhuma tarefa agendada",
    done: "Nenhuma tarefa agendada concluída",
  },
  tasks: {
    todo: "Sua lista de tarefas está vazia",
    done: "Nenhuma tarefa concluída",
  },
};
