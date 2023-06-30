import { describe, expect, it } from 'vitest'
import { SmsAdapter, SmsProvider } from './adapter'

describe('adapter', () => {
  it('should send sms correctly', () => {
    // Arrange
    const smsProvider = new SmsProvider()
    const smsAdapter = new SmsAdapter(smsProvider)
    const recipient = 'John Doe'
    const message = 'Hello John Doe'

    // Act
    smsAdapter.sendMessage(recipient, message)

    // Assert
    expect(smsProvider.phoneNumber).toBe(recipient)
    expect(smsProvider.message).toBe(message)
  })
})
