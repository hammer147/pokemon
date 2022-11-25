import type { Pokemon } from '../pages'
import Image from 'next/image'
import { trpc } from '../utils/trpc'

type Props = {
  pokemon: Pokemon
  clickHandler?: (pokemon: Pokemon) => void
}

const PokemonCard = ({ pokemon, clickHandler }: Props) => {
  return (
    <div
      className='flex max-w-xs flex-col items-center gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'
      onClick={clickHandler && (() => clickHandler(pokemon))}>
      <h3 className='capitalize text-2xl font-bold'>{pokemon.name}</h3>
      <Image src={pokemon.imgUrl} alt={pokemon.name} width={300} height={300} />
      {pokemon.votes && <p className='text-xl'>Votes: {pokemon.votes}</p>}
    </div>
  )
}

export default PokemonCard
