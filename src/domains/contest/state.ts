import { createMachine } from 'xstate'

export const toggleMachine = createMachine({
  id: 'contest-state',
  initial: 'open',
  states: {
    open: { on: { START: 'onGoing' } },
    onGoing: { on: { START_VOTE: 'voting' } },
    voting: { on: { CLOSE: 'closed' } },
    closed: {},
  },
})
