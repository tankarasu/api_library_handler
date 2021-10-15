"use strict";
// Internal requirements
import { Book } from "../types/types";

// CONSTANTS
export const fakeDatabase: Book[] = [
  { name: "Roméo & Juliet", id: 1, category: "drama", author: "William Shakespeare", year: 1595 },
  { name: "Les misérables", id: 2, category: "roman", author: "Victor Hugo", year: 1862 },
  { name: "Le Petit Prince", id: 3, category: "drama", author: "Antoine de Saint-Exupéry", year: 1943 },
  { name: "Le Rouge et le Noir", id: 4, category: "roman", author: "Arthur Conan Doyle", year: 1890 },
  { name: "Le Dernier Jour", id: 5, category: "roman", author: "Alexandre Dumas", year: 1842 },
  { name: "L'Aventures de Tom Sawyer", id: 6, category: "roman", author: "Mark Twain", year: 1876 },
  { name: "Le Trésor de la Révolution", id: 7, category: "thriller", author: "Alexandre Dumas", year: 1843 },
  { name: "Le Comte de Monte Cristo", id: 8, category: "roman", author: "Alexandre Dumas", year: 1844 },
  { name: "Le Prince de Sang", id: 9, category: "cartoon", author: "Alexandre Dumas", year: 1846 },
  { name: "L'Étranger", id: 10, category: "roman", author: "Albert Camus", year: 1942 },
  { name: "Don Quichotte", id: 11, category: "thriller", author: "Molière", year: 1610 }
];
