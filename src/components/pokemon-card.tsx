import type { Pokemon } from '../pages'
import Image from 'next/image'
import { trpc } from '../utils/trpc'

type Props = {
  pokemon: Pokemon
  refreshRandomPokemons: () => void
}

const PokemonCard = ({ pokemon, refreshRandomPokemons }: Props) => {
  const voteForPokemon = trpc.pokemons.voteForPokemon.useMutation({
    onSuccess: () => {
      refreshRandomPokemons()
    }
  })

  return (
    <div
      className='flex max-w-xs flex-col items-center gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'
      onClick={() => voteForPokemon.mutate(pokemon)}>
      <h3 className='text-2xl font-bold'>{pokemon.name}</h3>
      <Image src={pokemon.imgUrl} alt={pokemon.name} width={300} height={300} />
    </div>
  )
}

export default PokemonCard
