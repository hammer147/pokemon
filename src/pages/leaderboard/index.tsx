import Head from 'next/head'
import Link from 'next/link'
import PokemonCard from '../../components/pokemon-card'
import { trpc } from '../../utils/trpc'

const LeaderBoardPage = () => {
  const { data: pokemons } = trpc.pokemons.getBestPokemons.useQuery()

  return (
    <>
      <Head>
        <title>Pokemon</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]'>
        <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
          <h1 className='text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]'>
            These are <span className='text-[hsl(280,100%,70%)]'>The 20 Most Beautiful</span>{' '}
            Pokemon
          </h1>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8'>
            {pokemons?.map(pokemon => (
              <PokemonCard pokemon={pokemon} />
            ))}
          </div>
          <div className='flex flex-col items-center justify-center gap-4'>
            <button className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'>
              <Link href='/'>Back to Voting Page</Link>
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default LeaderBoardPage
