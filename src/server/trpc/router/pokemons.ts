import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  imgUrl: z.string().url()
})

export const pokemonRouter = router({
  getById: protectedProcedure.input(z.number()).query(async ({ input }) => {
    const pokemonId = input
    const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    if (!pokeRes.ok) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' })
    }
    const {
      id,
      name,
      sprites: { front_default: imgUrl }
    } = await pokeRes.json()
    const pokemon = pokemonSchema.parse({ id, name, imgUrl })
    return pokemon
  }),
  getBestPokemons: protectedProcedure.query(async ({ ctx }) => {
    const pokemons = await ctx.prisma.pokemon.findMany({
      take: 20,
      orderBy: {
        votes: 'desc'
      }
    })
    return pokemons
  }),
  voteForPokemon: protectedProcedure.input(pokemonSchema).mutation(async ({ ctx, input }) => {
    const pokemon = await ctx.prisma.pokemon.upsert({
      where: { id: input.id },
      update: { votes: { increment: 1 } },
      create: { id: input.id, name: input.name, imgUrl: input.imgUrl, votes: 1 }
    })
  })
})
