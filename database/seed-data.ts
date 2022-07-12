
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description:"Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:"En progreso: Lorem ipsum es el texto que se usa habitualmente en diseño gráfico o de moda en demostraciones de tipografías.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description:"Terminada: Genere su propio texto usando cualquier cantidad de caracteres, palabras, oraciones o párrafos.",
      status: "finished",
      createdAt: Date.now() - 150000,
    },
  ],
};
