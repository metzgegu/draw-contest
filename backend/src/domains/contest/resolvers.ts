import { type Context } from '../../context'
import Contest, {
  type ContestAttributes,
  Status,
} from '../../database/models/contest'
import DrawingParticipation from '../../database/models/drawingparticipation'
import type User from '../../database/models/user'
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

  await context.database.drawingParticipation.create({
    userId: context.currentUser!.dataValues.id,
    contestId: contest.id as number,
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

  await contest.update({
    status: stateMap.get(contest.dataValues.status) as string,
  })
  await contest.save()

  return contest
}

async function contest(
  _: any,
  { id }: { id: string },
  context: Context
): Promise<Contest | null> {
  ensureUserLoggedIn(context)

  const contest = await context.database.contest.findOne({
    where: {
      id,
    },
    include: [DrawingParticipation],
  })

  if (
    contest?.drawingParticipations?.find(
      (drawingParticipation) =>
        drawingParticipation.userId === context.currentUser!.id
    ) == null
  ) {
    throw new Error('User not registered in this contest')
  }

  contest.drawingParticipations = await Promise.all(
    contest?.drawingParticipations?.map(async (drawingParticipation) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const drawingParticipationData: DrawingParticipation = {
        ...drawingParticipation.dataValues,
        user: (
          await context.database.contest.findOne({
            where: {
              id: drawingParticipation.userId,
            },
          })
        )?.dataValues,
      } as DrawingParticipation

      return drawingParticipationData
    })
  )

  console.log(contest)

  return contest
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
        userId: context.currentUser!.id as number,
        contestId: contest.id as number,
      },
    })

  if (drawingParticipation != null) {
    throw new Error('Already joined')
  }

  await context.database.drawingParticipation.create({
    userId: context.currentUser!.id as number,
    contestId: contest.id as number,
  })

  return contest
}

async function adminContestList(
  _: any,
  __: any,
  context: Context
): Promise<Contest[]> {
  ensureUserLoggedIn(context)

  const contests = await context.database.contest.findAll({
    where: {
      adminUserId: context.currentUser!.id as number,
    },
  })

  return contests
}

async function joinedContestList(
  _: any,
  __: any,
  context: Context
): Promise<Contest[]> {
  ensureUserLoggedIn(context)

  const drawingParticipation =
    await context.database.drawingParticipation.findAll({
      where: {
        userId: context.currentUser!.id as number,
      },
      include: [Contest],
    })

  const contests = drawingParticipation
    .map((drawingParticipation) => drawingParticipation.contest)
    .filter(
      (contest) =>
        contest !== null && contest?.adminUserId !== context.currentUser!.id
    ) as Contest[]

  return contests
}

export const queries = { contest, adminContestList, joinedContestList }
export const mutations = { createContest, advanceContestNextStep, joinContest }
