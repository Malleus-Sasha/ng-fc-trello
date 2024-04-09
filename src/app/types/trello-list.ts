import { Task } from "./task.type";

export type TrelloList = {
  assignedForMe: Task[];
  assignedFromMe: Task[];
}