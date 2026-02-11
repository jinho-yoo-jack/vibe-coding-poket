import {
  PokemonListResponse,
  PokemonDetail,
  PokemonSpecies,
  EvolutionChain
} from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * 포켓몬 목록을 가져오는 함수
 * @param limit - 한 번에 가져올 포켓몬 수
 * @param offset - 시작 위치
 * @returns 포켓몬 목록 응답
 */
export const fetchPokemonList = async (
  limit: number = 20,
  offset: number = 0
): Promise<PokemonListResponse> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

/**
 * 특정 포켓몬의 상세 정보를 가져오는 함수
 * @param idOrName - 포켓몬 ID 또는 이름
 * @returns 포켓몬 상세 정보
 */
export const fetchPokemon = async (
  idOrName: string | number
): Promise<PokemonDetail> => {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);

  if (!response.ok) {
    throw new Error(`포켓몬을 찾을 수 없습니다: ${idOrName}`);
  }

  return response.json();
};

/**
 * 포켓몬 종 정보를 가져오는 함수
 * @param id - 포켓몬 ID
 * @returns 포켓몬 종 정보 (한글명, 설명 포함)
 */
export const fetchPokemonSpecies = async (
  id: number
): Promise<PokemonSpecies> => {
  const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);

  if (!response.ok) {
    throw new Error(`포켓몬 종 정보를 찾을 수 없습니다: ${id}`);
  }

  return response.json();
};

/**
 * 진화 체인 정보를 가져오는 함수
 * @param url - 진화 체인 URL
 * @returns 진화 체인 정보
 */
export const fetchEvolutionChain = async (
  url: string
): Promise<EvolutionChain> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`진화 체인 정보를 가져올 수 없습니다`);
  }

  return response.json();
};