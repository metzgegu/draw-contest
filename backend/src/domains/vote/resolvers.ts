import { type Context } from '../../context'
import Vote from '../../database/models/vote'
import { ensureUserLoggedIn } from '../user/auth'

async function vote(
  _: any,
  {
    drawingUserId,
    contestId,
    rating,
  }: { drawingUserId: number; contestId: number; rating: number },
  context: Context
): Promise<Vote | null> {
  ensureUserLoggedIn(context)

  const drawingParticipation =
    await context.database.drawingParticipation.findOne({
      where: {
        contestId: contestId,
        userId: drawingUserId,
      },
    })

  if (drawingParticipation == null) {
    throw new Error('No such drawing participation')
  }
  
  const contest = await context.database.contest.findOne({
    where: {
      id: contestId,
    },
  })

  if (contest?.dataValues.status !== 'voting') {
    throw new Error('The contest is not in voting phase')
  }

  let vote = await context.database.vote.findOne({
    where: {
      user: context.currentUser!,
      drawingParticipation: drawingParticipation,
    },
  })

  if (vote != null) {
    vote.update({ rating })
  } else {
    vote = await context.database.vote.create({
      user: context.currentUser!,
      drawingParticipation,
      rating,
    })
  }

  return vote
}

async function votesForOneDrawing(
  _: any,
  { userId, contestId }: { userId: number; contestId: number },
  context: Context
): Promise<Vote[] | null> {
  ensureUserLoggedIn(context)

  const votes = await context.database.vote.findAll({
    where: {
      drawingParticipation: { contest: { id: contestId }, user: { id: userId } },
    },
  })

  return votes
}

export const mutations = { vote }
export const queries = { votesForOneDrawing }
