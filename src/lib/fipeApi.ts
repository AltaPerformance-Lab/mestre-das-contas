export interface FipeMarca {
  codigo: string;
  nome: string;
}

export interface FipeModelo {
  codigo: number;
  nome: string;
}

export interface FipeAno {
  codigo: string;
  nome: string;
}

export interface FipeValor {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

async function fetchFipe<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      next: { revalidate: 604800 }, // Cache FIPE data for 7 days (optimizes speed & avoids API rate limits)
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`FIPE API erro: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar na FIPE API (${endpoint}):`, error);
    throw error;
  }
}

export async function getMarcas(tipo: 'carros' | 'motos' | 'caminhoes'): Promise<FipeMarca[]> {
  return fetchFipe<FipeMarca[]>(`/${tipo}/marcas`);
}

export async function getModelos(tipo: 'carros' | 'motos' | 'caminhoes', marcaId: string): Promise<{ modelos: FipeModelo[], anos: FipeAno[] }> {
  // A API de modelos retorna { modelos: [...], anos: [...] }
  return fetchFipe<{ modelos: FipeModelo[], anos: FipeAno[] }>(`/${tipo}/marcas/${marcaId}/modelos`);
}

export async function getAnos(tipo: 'carros' | 'motos' | 'caminhoes', marcaId: string, modeloId: string): Promise<FipeAno[]> {
  return fetchFipe<FipeAno[]>(`/${tipo}/marcas/${marcaId}/modelos/${modeloId}/anos`);
}

export async function getValor(tipo: 'carros' | 'motos' | 'caminhoes', marcaId: string, modeloId: string, anoId: string): Promise<FipeValor> {
  return fetchFipe<FipeValor>(`/${tipo}/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // separa os acentos das letras
    .replace(/[\u0300-\u036f]/g, '') // remove os acentos
    .replace(/\s+/g, '-') // espaços por hífen
    .replace(/[^\w\-]+/g, '') // remove não alfanuméricos
    .replace(/\-\-+/g, '-') // hifens duplos
    .replace(/^-+/, '') // trim left
    .replace(/-+$/, ''); // trim right
}

export function createSlugWithId(id: string | number, name: string): string {
  return `${id}-${slugify(name)}`;
}

export function extractIdFromSlug(slug: string): string {
  const parts = slug.split('-');
  return parts[0] || '';
}
