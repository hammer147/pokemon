import { router } from '../trpc'
import { authRouter } from './auth'
import { exampleRouter } from './example'
import { pokemonRouter } from './pokemons'

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  pokemons: pokemonRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
