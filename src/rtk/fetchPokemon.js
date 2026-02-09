/**
 * fetchAPI를 사용하여 포켓몬의 이름, 이미지(앞면/뒷면), 설명을 받아옵니다.
 * Array.from으로 1~151 ID 배열을 만들고, Promise.all로 비동기 로드합니다.
 */
const BASE_URL = 'https://pokeapi.co/api/v2'

const POKEMON_IDS = Array.from({ length: 151 }, (_, i) => i + 1)

async function fetchOnePokemon(id) {
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`${BASE_URL}/pokemon/${id}`),
    fetch(`${BASE_URL}/pokemon-species/${id}`),
  ])
  const pokemon = await pokemonRes.json()
  const species = await speciesRes.json()

  const descriptionEntry =
    species.flavor_text_entries?.find((e) => e.language.name === 'ko') ??
    species.flavor_text_entries?.find((e) => e.language.name === 'en')
  const description = descriptionEntry?.flavor_text?.replace(/\n|\f/g, ' ') ?? ''

  return {
    id: pokemon.id,
    name: pokemon.name,
    front_default: pokemon.sprites?.front_default ?? '',
    back_default: pokemon.sprites?.back_default ?? '',
    description,
  }
}

export async function fetchAllPokemon() {
  const results = await Promise.all(POKEMON_IDS.map((id) => fetchOnePokemon(id)))
  return results
}
