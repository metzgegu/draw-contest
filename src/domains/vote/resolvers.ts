function vote(_: any, { id }: { id: string }): { id: string; userId: string } {
  return { id, userId: '1' }
}

export const queries = { vote }
