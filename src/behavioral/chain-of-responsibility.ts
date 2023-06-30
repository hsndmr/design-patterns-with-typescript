export class Order {
  public id: number
  public amount: number
  public status: string

  constructor (id: number, amount: number, status: string) {
    this.id = id
    this.amount = amount
    this.status = status
  }
}

interface OrderHandler {
  setNextHandler: (handler: OrderHandler) => void
  handle: (order: Order) => void
}

export class OrderValidationHandler implements OrderHandler {
  private nextHandler: OrderHandler | null = null
  setNextHandler (handler: OrderHandler): void {
    this.nextHandler = handler
  }

  handle (order: Order): void {
    if (order.amount <= 0) {
      throw new Error('Invalid order amount')
    }
    order.status = 'validated'
    if (this.nextHandler != null) {
      this.nextHandler.handle(order)
    }
  }
}

export class ShippingHandler implements OrderHandler {
  private nextHandler: OrderHandler | null = null
  setNextHandler (handler: OrderHandler): void {
    this.nextHandler = handler
  }

  handle (order: Order): void {
    order.status = 'shipped'
    if (this.nextHandler != null) {
      this.nextHandler.handle(order)
    }
  }
}
