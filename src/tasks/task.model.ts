export interface Task {
  id: string;
  title: string;
  decription: string;
  status: TaskStatus;
}


enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROCESS = 'IN_PROCESS',
  DONE = 'DONE',
}

