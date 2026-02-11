// PokéAPI 응답 타입 정의
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

// 포켓몬 스프라이트 타입
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    'official-artwork': {
      front_default: string | null;
    };
  };
}

// 포켓몬 스탯 타입
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

// 포켓몬 타입 정보
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// 포켓몬 능력 정보
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

// 포켓몬 기본 정보 (API 응답)
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
}

// 포켓몬 종 정보
export interface PokemonSpecies {
  id: number;
  name: string;
  names: Array<{
    language: {
      name: string;
      url: string;
    };
    name: string;
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }>;
  evolution_chain: {
    url: string;
  } | null;
  generation: {
    name: string;
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  } | null;
}

// 진화 체인 노드
export interface EvolutionNode {
  species: {
    name: string;
    url: string;
  };
  evolution_details: Array<{
    min_level: number | null;
    trigger: {
      name: string;
      url: string;
    };
  }>;
  evolves_to: EvolutionNode[];
}

// 진화 체인 응답
export interface EvolutionChain {
  id: number;
  chain: EvolutionNode;
}

// 앱에서 사용하는 포켓몬 정보 (가공된 데이터)
export interface Pokemon {
  id: number;
  name: string;
  nameKo: string;
  front_default: string;
  back_default: string;
  description: string;
}

// 포켓몬 상세 정보 (Redux state용)
export interface PokemonFullDetail {
  pokemon: PokemonDetail;
  species: PokemonSpecies;
  evolutionChain: EvolutionChain | null;
}

// 진화 체인 아이템 (UI 렌더링용)
export interface EvolutionItem {
  id: number;
  name: string;
}