import { type Context } from '../../context';
import {
  type ContestAttributes,
  type ContestInstance,
  Status,
} from '../../database/models/contest'

async function createContest(
  _: any,
  { name, adminUserId }: ContestAttributes,
  context: Context
): Promise<ContestInstance> {
  const contest = await context.database.contest.create({
    name,
    adminUserId,
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
