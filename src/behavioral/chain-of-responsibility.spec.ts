import { describe, expect, test } from 'vitest'
import { Order, OrderValidationHandler, ShippingHandler } from './chain-of-responsibility'

describe('chain-of-responsibility', () => {
  test('order validation handler should set order status to shipped status when order is valid and handled by shipping handler', () => {
    // Arrange
    const orderValidationHandler = new OrderValidationHandler()
    const shippingHandler = new ShippingHandler()

    orderValidationHandler.setNextHandler(shippingHandler)

    const order = new Order(1, 100, 'pending')

    // Act
    orderValidationHandler.handle(order)

    // Assert
    expect(order.status).toEqual('shipped')
  })

  test('order validation handler should throw an error when order amount is invalid', () => {
    // Arrange
    const orderValidationHandler = new OrderValidationHandler()
    const shippingHandler = new ShippingHandler()

    orderValidationHandler.setNextHandler(shippingHandler)

    const order = new Order(1, -100, 'pending')

    // Act & Assert
    expect(() => { orderValidationHandler.handle(order) }).toThrowError('Invalid order amount')
  })
})
