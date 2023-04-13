import { type Context } from "../../context"
import { type VoteInstance } from "../../database/models/vote"
import { ensureUserLoggedIn } from "../user/auth"

async function vote(_: any, { drawingUserId, contestId, rating }: { drawingUserId: number, contestId: number, rating: number }, context: Context): Promise<VoteInstance | null> {
  ensureUserLoggedIn(context)

  const drawingParticipation = await context.database.drawingParticipation.findOne({
    where: {
      contestId,
      userId: drawingUserId
    },
  })

  if (drawingParticipation == null) {
    throw new Error('No such drawing participation')
  }

  let vote = await context.database.vote.findOne({
    where: {
      userId: context.currentUser?.id,
      drawingUserId,
      contestId
    }
  })

  if (vote != null) {
    vote.update({ rating })
  } else {
    vote = await context.database.vote.create({
      userId: context.currentUser?.id!,
      drawingUserId,
      contestId,
      rating
    })
  }

  return vote
}

async function votesForOneDrawing(_: any, { drawingUserId, contestId }: { drawingUserId: number, contestId: number }, context: Context): Promise<VoteInstance[] | null> {
  ensureUserLoggedIn(context)

  const votes = await context.database.vote.findAll({
    where: {
      contestId,
      drawingUserId
    },
  })

  return votes
}

export const mutations = { vote }
export const queries = { votesForOneDrawing }
