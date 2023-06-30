import { describe, expect, it } from 'vitest'
import { Employee, EmployeeListAggregate } from './iterator'

describe('iterator', () => {
  it('should iterate over collection', () => {
    // Arrange
    const employeeListAggregate = new EmployeeListAggregate()
    const employees = [
      new Employee('John', 30),
      new Employee('Mary', 25)
    ]

    employees.forEach(employee => {
      employeeListAggregate.add(employee)
    })

    // Act
    const iterator = employeeListAggregate.createIterator()

    // Assert
    while (iterator.hasNext()) {
      const employee = iterator.current()
      expect(employee).toBeDefined()
    }
  })
})
