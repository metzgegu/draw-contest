import { type Context } from '../../context'
import Contest, {
  type ContestAttributes,
  Status,
} from '../../database/models/contest'
import DrawingParticipation from '../../database/models/drawingparticipation'
import User from '../../database/models/user'
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
): Promise<Contest> {
  ensureUserLoggedIn(context)

  

  const contest = await context.database.contest.create({
    name: 'Test',
    adminUser: context.currentUser!.dataValues as User,
    adminUserId: context.currentUser!.dataValues.id,
    status: Status.OPEN,
  })

  console.log('contest!.id', contest!.id)

  await context.database.drawingParticipation.create({
    userId: context.currentUser!.dataValues.id,
    contestId: contest!.id,
  })

  return contest
}

async function advanceContestNextStep(
  _: any,
  { id }: { id: string },
  context: Context
): Promise<Contest | null> {
  ensureUserLoggedIn(context)

  const contest = await context.database.contest.findOne<Contest>({
    where: {
      id,
    },
  })
  
  if (contest === null) {
    throw new Error('No such contest found')
  }

  if (context.currentUser!.id !== contest.dataValues.adminUser?.id) {
    console.log(context.currentUser, contest.dataValues.adminUser?.id)
    throw new Error('The contest do not belong to you')
  }

  await contest.update({ status: stateMap.get(contest.dataValues.status) as string })
  await contest.save()

  return contest
}

async function contest(
  _: any,
  { id }: { id: string },
  context: Context
): Promise<Contest | null> {
  return await context.database.contest.findOne({
    where: {
      id,
    },
    include: DrawingParticipation
  })

  
}

async function joinContest(
  _: any,
  { contestId }: { contestId: number },
  context: Context
): Promise<Contest | null> {
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
        userId: context.currentUser!.id,
        contestId: contest.id,
      },
    })

  if (drawingParticipation != null) {
    throw new Error('Already joined')
  }

  await context.database.drawingParticipation.create({
    userId: context.currentUser!.id,
    contestId: contest.id,
  })

  return contest
}

export const queries = { contest }
export const mutations = { createContest, advanceContestNextStep, joinContest }
