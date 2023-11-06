interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: Magna nulla id cillum incididunt ex.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'Progreso: Ullamco cillum ex eiusmod exercitation enim cillum enim qui do laboris.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Finalizada: Eiusmod commodo dolore qui proident aliquip eiusmod laborum.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};
