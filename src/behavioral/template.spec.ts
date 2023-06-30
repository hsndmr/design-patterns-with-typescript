import { WelcomeEmailTemplate, ForgotPasswordEmailTemplate } from './template'
import { describe, expect, it } from 'vitest'

describe('WelcomeEmailTemplate', () => {
  it('should set the subject, body, and recipients correctly', () => {
    // Arrange
    const name = 'John Doe'
    const welcomeEmail = new WelcomeEmailTemplate(name)

    // Act
    welcomeEmail.sendEmail()

    // Assert
    expect(welcomeEmail.subject).toBe(`Welcome ${name}`)
    expect(welcomeEmail.body).toBe('Welcome to our website')
    expect(welcomeEmail.recipients).toEqual([name])
  })
})

// Test the ForgotPasswordEmailTemplate
describe('ForgotPasswordEmailTemplate', () => {
  it('should set the subject, body, and recipients correctly', () => {
    // Arrange
    const name = 'John Doe'
    const forgotPasswordEmail = new ForgotPasswordEmailTemplate(name)

    // Act
    forgotPasswordEmail.sendEmail()

    // Assert
    expect(forgotPasswordEmail.subject).toBe(`Forgot password ${name}`)
    expect(forgotPasswordEmail.body).toBe('Please reset your password')
    expect(forgotPasswordEmail.recipients).toEqual([name])
  })
})
