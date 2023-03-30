import User from './user/schema'
import Contest from './contest/schema'
import Vote from './vote/schema'
import DrawingParticipation from './drawing-participation/schema'
import {
  queries as contestQueries,
  mutations as contestMutations,
} from './contest/resolvers'
import { queries as drawingParticipationQueries } from './drawing-participation/resolvers'
import {
  queries as userQueries,
  mutations as userMutations,
} from './user/resolvers'
import { queries as voteQueries } from './vote/resolvers'

export const mutations = { ...contestMutations, ...userMutations }

export const queries = {
  ...contestQueries,
  ...drawingParticipationQueries,
  ...userQueries,
  ...voteQueries,
}

export const typeDefs = [...User, ...Contest, ...Vote, ...DrawingParticipation]
