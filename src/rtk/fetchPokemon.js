/**
 * fetchAPI를 사용하여 포켓몬의 이름, 이미지(앞면/뒷면), 설명을 받아옵니다.
 * Array.from으로 1~151 ID 배열을 만들고, Promise.all로 비동기 로드합니다.
 */
const BASE_URL = 'https://pokeapi.co/api/v2'

// 1세대 포켓몬 ID 배열 (1~151)
const POKEMON_IDS = Array.from({ length: 151 }, (_, i) => i + 1)

/**
 * 포켓몬 한 마리의 정보를 가져와서 가공하는 함수
 * @param {number} id - 포켓몬 ID
 * @returns {Promise} 가공된 포켓몬 정보
 */
async function fetchOnePokemon(id) {
  // 포켓몬 기본 정보와 종 정보를 병렬로 가져오기
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`${BASE_URL}/pokemon/${id}`),
    fetch(`${BASE_URL}/pokemon-species/${id}`),
  ])

  if (!pokemonRes.ok || !speciesRes.ok) {
    throw new Error(`Failed to fetch pokemon ${id}`)
  }

  const pokemon = await pokemonRes.json()
  const species = await speciesRes.json()

  // 한글 설명 찾기 (없으면 영어)
  const descriptionEntry =
    species.flavor_text_entries?.find((e) => e.language.name === 'ko') ??
    species.flavor_text_entries?.find((e) => e.language.name === 'en')

  const description = descriptionEntry?.flavor_text?.replace(/\n|\f/g, ' ') ?? ''

  // 한글 이름 찾기 (없으면 영어 이름 사용)
  const nameKo = species.names?.find((n) => n.language.name === 'ko')?.name ?? pokemon.name

  return {
    id: pokemon.id,
    name: pokemon.name,
    nameKo,
    front_default: pokemon.sprites?.front_default ?? '',
    back_default: pokemon.sprites?.back_default ?? '',
    description,
  }
}

/**
 * 1세대 포켓몬 전체(151마리)를 가져오는 함수
 * @returns {Promise<Array>} 포켓몬 목록
 */
export async function fetchAllPokemon() {
  const results = await Promise.all(
    POKEMON_IDS.map((id) => fetchOnePokemon(id))
  )
  return results
}