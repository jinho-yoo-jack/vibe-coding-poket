// 타입별 색상 클래스 매핑
export const TYPE_COLORS = {
  normal: 'bg-type-normal',
  fire: 'bg-type-fire',
  water: 'bg-type-water',
  electric: 'bg-type-electric',
  grass: 'bg-type-grass',
  ice: 'bg-type-ice',
  fighting: 'bg-type-fighting',
  poison: 'bg-type-poison',
  ground: 'bg-type-ground',
  flying: 'bg-type-flying',
  psychic: 'bg-type-psychic',
  bug: 'bg-type-bug',
  rock: 'bg-type-rock',
  ghost: 'bg-type-ghost',
  dragon: 'bg-type-dragon',
  dark: 'bg-type-dark',
  steel: 'bg-type-steel',
  fairy: 'bg-type-fairy',
}

// 타입별 한글명 매핑
export const TYPE_KOREAN = {
  normal: '노말',
  fire: '불꽃',
  water: '물',
  electric: '전기',
  grass: '풀',
  ice: '얼음',
  fighting: '격투',
  poison: '독',
  ground: '땅',
  flying: '비행',
  psychic: '에스퍼',
  bug: '벌레',
  rock: '바위',
  ghost: '고스트',
  dragon: '드래곤',
  dark: '악',
  steel: '강철',
  fairy: '페어리',
}

// 스탯별 색상 클래스 매핑
export const STAT_COLORS = {
  hp: 'from-green-400 to-green-600',
  attack: 'from-red-400 to-red-600',
  defense: 'from-blue-400 to-blue-600',
  'special-attack': 'from-purple-400 to-purple-600',
  'special-defense': 'from-yellow-400 to-yellow-600',
  speed: 'from-pink-400 to-pink-600',
}

// 스탯별 한글명 매핑
export const STAT_KOREAN = {
  hp: 'HP',
  attack: '공격',
  defense: '방어',
  'special-attack': '특수공격',
  'special-defense': '특수방어',
  speed: '스피드',
}

/**
 * 포켓몬 ID를 포맷팅하는 함수
 * @param {number} id - 포켓몬 ID
 * @returns {string} 포맷된 ID 문자열 (예: #001, #025)
 */
export const formatPokemonId = (id) => {
  return `#${id.toString().padStart(3, '0')}`
}

/**
 * URL에서 포켓몬 ID를 추출하는 함수
 * @param {string} url - PokéAPI URL
 * @returns {number} 포켓몬 ID
 */
export const getPokemonIdFromUrl = (url) => {
  const parts = url.split('/')
  const id = parts[parts.length - 2]
  return parseInt(id, 10)
}