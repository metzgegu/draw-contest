import { type Context } from '../../context'
import {
  type ContestAttributes,
  type ContestInstance,
  Status,
} from '../../database/models/contest'
import { ensureUserLoggedIn } from '../user/auth'

const stateMap = new Map()

stateMap.set(Status.OPEN, Status.ONGOING)
stateMap.set(Status.ONGOING, Status.VOTING)
stateMap.set(Status.VOTING, Status.CLOSED)
stateMap.set(Status.CLOSED, Status.CLOSED)

async function createContest(
  _: any,
  { name }: ContestAttributes,
  context: Context
): Promise<ContestInstance> {
  ensureUserLoggedIn(context)

  const contest = await context.database.contest.create({
    name,
    adminUserId: context.currentUser?.id as number,
    status: Status.OPEN,
  })

  await context.database.drawingParticipation.create({
    userId: context.currentUser!.id!,
    contestId: contest.id!,
  })

  return contest
}

async function advanceContestNextStep(
  _: any,
  { id }: { id: string },
  context: Context
): Promise<ContestInstance | null> {
  ensureUserLoggedIn(context)

  const contest = await context.database.contest.findOne({
    where: {
      id,
    },
  })

  if (contest === null) {
    throw new Error('No such contest found')
  }

  if (context.currentUser!.id !== contest.adminUserId) {
    console.log(context.currentUser, contest.adminUserId)
    throw new Error('The contest do not belong to you')
  }

  await contest.update({ status: stateMap.get(contest.status) as string })
  await contest.save()

  return contest
}

async function contest(
  _: any,
  { id }: { id: string },
  context: Context
): Promise<ContestInstance | null> {
  return await context.database.contest.findOne({
    where: {
      id,
    },
  })
}

async function joinContest(
  _: any,
  { contestId }: { contestId: number },
  context: Context
): Promise<ContestInstance | null> {
  ensureUserLoggedIn(context)

  const contest = await context.database.contest.findOne({
    where: {
      id: contestId,
    },
  })

  if (contest === null) {
    throw new Error('No such contest found')
  }

  const drawingParticipation =
    await context.database.drawingParticipation.findOne({
      where: {
        userId: context.currentUser!.id!,
        contestId: contest.id!,
      },
    })

  if (drawingParticipation != null) {
    throw new Error('Already joined')
  }

  await context.database.drawingParticipation.create({
    userId: context.currentUser!.id!,
    contestId: contest.id!,
  })

  return contest
}

export const queries = { contest }
export const mutations = { createContest, advanceContestNextStep, joinContest }
