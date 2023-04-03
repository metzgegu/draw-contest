import { mutations } from './resolvers'

describe('User', () => {
  describe('Mutations', () => {
    describe('signup', () => {
      it('should create user and returning it alongside token', async () => {
        const createMocked = jest.fn().mockResolvedValue({
          id: '1',
          name: 'Jean',
          email: 'jean.doe@g.com',
          password: 'cryptedMdp',
        })

        const contextMocked = {
          database: {
            user: {
              create: createMocked,
            },
          },
        }

        const response = await mutations.signup(
          {},
          { name: 'Jean', email: 'jean.doe@g.com', password: '1234' },
          contextMocked as any
        )

        expect(createMocked).toBeCalled()
        expect(response.user).toEqual({
          id: '1',
          name: 'Jean',
          email: 'jean.doe@g.com',
          password: 'cryptedMdp',
        })
        expect(response.token).toBeTruthy()
      })
    })

    describe('login', () => {
      it("should return a not found error if there's no user for email", async () => {
        const loginMocked = jest.fn().mockResolvedValue(null)

        const contextMocked = {
          database: {
            user: {
              findOne: loginMocked,
            },
          },
        }

        await expect(
          mutations.login(
            {},
            { email: 'jean.doe@g.com', password: '1234' },
            contextMocked as any
          )
        ).rejects.toThrow()
      })
      it('should return an authentication error if password is wrong', async () => {
        const loginMocked = jest.fn().mockResolvedValue({
          email: 'jean.doe@g.com',
          password: 'INVALID_PASSWORD',
        })

        const contextMocked = {
          database: {
            user: {
              findOne: loginMocked,
            },
          },
        }

        await expect(
          mutations.login(
            {},
            { email: 'jean.doe@g.com', password: '1234' },
            contextMocked as any
          )
        ).rejects.toThrow()
      })
      it('should return user alongside token if login succeed', async () => {
        const loginMocked = jest.fn().mockResolvedValue({
          email: 'jean.doe@g.com',
          password:
            '$2b$10$SZt3CFh2JY8kdqlf41AP.ePwIF5meOSHakYakqfVBOPtw.QMB82aa',
        })

        const contextMocked = {
          database: {
            user: {
              findOne: loginMocked,
            },
          },
        }

        const response = await mutations.login(
          {},
          { email: 'jean.doe@g.com', password: 'VALID_PASSWORD' },
          contextMocked as any
        )

        expect(loginMocked).toBeCalled()
        expect(response.user).toEqual({
          email: 'jean.doe@g.com',
          password:
            '$2b$10$SZt3CFh2JY8kdqlf41AP.ePwIF5meOSHakYakqfVBOPtw.QMB82aa',
        })
        expect(response.token).toBeTruthy()
      })
    })
  })

  describe('Queries', () => {
    describe('user', () => {
      it.todo('should return user from its id')
    })
  })
})
