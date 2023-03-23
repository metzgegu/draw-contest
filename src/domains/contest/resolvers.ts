import { type Context } from '../../context';
import {
  type ContestAttributes,
  type ContestInstance,
  Status,
} from '../../database/models/contest'
import { ensureUserLoggedIn } from '../user/auth';

async function createContest(
  _: any,
  { name }: ContestAttributes,
  context: Context
): Promise<ContestInstance> {
  ensureUserLoggedIn(context)

  const contest = await context.database.contest.create({
    name,
    adminUserId: context.currentUser?.id as string,
    status: Status.OPEN,
  })

  return contest
}

function contest(_: any, { id }: { id: string }): { id: string; name: string } {
  return {
    id,
    name: 'Contest numero uno',
  }
}

export const queries = { contest }
export const mutations = { createContest }
