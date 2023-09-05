import { Context } from '../../context';
import DrawingParticipation from '../../database/models/drawingparticipation';
import { ensureUserLoggedIn } from '../user/auth'

async function drawingParticipation(
  _: any,
  { contestId }: { contestId: string },
  context: Context
): Promise<DrawingParticipation> {
  ensureUserLoggedIn(context)

  const drawingParticipation = await context.database.drawingParticipation.findOne({
    where: {
      userId: context.currentUser!.id as number,
      contestId
    },
  })

  if (drawingParticipation === null) {
    throw new Error('No such drawingParticipation found')
  }

  return drawingParticipation
}

export const queries = { drawingParticipation }
