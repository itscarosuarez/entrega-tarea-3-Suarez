// Tipos para la API
export interface ApiProduct {
  id: string;
  titulo: string;
  precio: string;
  imagen: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

// Tipo para crear un nuevo producto (sin id, createdAt, updatedAt)
export interface CreateProductRequest {
  titulo: string;
  precio: string;
  imagen: string;
  descripcion: string;
}