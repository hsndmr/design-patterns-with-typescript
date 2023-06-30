export class Employee {
  constructor (public name: string, public age: number) { }
}

export interface Iterator<T> {
  hasNext: () => boolean
  current: () => T
}

export class EmployeeIterator implements Iterator<Employee> {
  private _currentIndex = 0
  constructor (
    private readonly _employeeListAggregate: EmployeeListAggregate
  ) {
  }

  current (): Employee {
    return this._employeeListAggregate.get(this._currentIndex++)
  }

  hasNext (): boolean {
    return this._currentIndex < this._employeeListAggregate.count()
  }
}

export interface EmployeeAggregate {
  createIterator: () => Iterator<Employee>
}

export class EmployeeListAggregate implements EmployeeAggregate {
  private readonly _employees: Employee[] = []

  add (employee: Employee): void {
    this._employees.push(employee)
  }

  count (): number {
    return this._employees.length
  }

  get (index: number): Employee {
    return this._employees[index]
  }

  createIterator (): Iterator<Employee> {
    return new EmployeeIterator(this)
  }
}
