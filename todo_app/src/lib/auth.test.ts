import { login, signup } from './auth'

describe('auth', () => {
  describe('login', () => {
    it('returns success for valid credentials', async () => {
      const result = await login('test@example.com', 'password123')
      expect(result).toEqual({ success: true })
    })
  })

  describe('signup', () => {
    it('returns success for valid registration', async () => {
      const result = await signup('Test User', 'test@example.com', 'password123')
      expect(result).toEqual({ success: true })
    })
  })
})
 