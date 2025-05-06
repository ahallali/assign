import { loginSchema, signupSchema } from './validations'

describe('loginSchema', () => {
  it('validates correct login data', () => {
    const validData = {
      email: 'test@example.com',
      password: 'password123',
    }
    const result = loginSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'password123',
    }
    const result = loginSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid email address')
    }
  })

  it('rejects short password', () => {
    const invalidData = {
      email: 'test@example.com',
      password: '12345',
    }
    const result = loginSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password must be at least 6 characters')
    }
  })
})

describe('signupSchema', () => {
  it('validates correct signup data', () => {
    const validData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    }
    const result = signupSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const invalidData = {
      name: '',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    }
    const result = signupSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name is required')
    }
  })

  it('rejects invalid email', () => {
    const invalidData = {
      name: 'Test User',
      email: 'invalid-email',
      password: 'password123',
      confirmPassword: 'password123',
    }
    const result = signupSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid email address')
    }
  })

  it('rejects mismatched passwords', () => {
    const invalidData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password456',
    }
    const result = signupSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Passwords don't match")
    }
  })

  it('rejects short passwords', () => {
    const invalidData = {
      name: 'Test User',
      email: 'test@example.com',
      password: '12345',
      confirmPassword: '12345',
    }
    const result = signupSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password must be at least 6 characters')
    }
  })
}) 