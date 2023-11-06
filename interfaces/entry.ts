export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus; //-> si colo string permite A,B,C,D, pending, in progress - finished
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished'; //-> esto es para tener los 3 estados
