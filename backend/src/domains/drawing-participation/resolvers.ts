function drawingParticipation(
  _: any,
  { id }: { id: string }
): { id: string; userId: string; contestId: string } {
  return {
    id,
    userId: '1',
    contestId: '2',
  }
}

export const queries = { drawingParticipation }
