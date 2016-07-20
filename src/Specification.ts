import ISpecification from './ISpecification'

export abstract class CompositeSpecification<T> implements ISpecification<T> {
    abstract isSatisfiedBy(candidate: T): boolean

    and(other: ISpecification<T>): ISpecification<T> {
      return new AndSpecification<T>(this, other)
    }

    andNot(other: ISpecification<T>): ISpecification<T> {
      return new AndNotSpecification<T>(this, other)
    }

    or(other: ISpecification<T>): ISpecification<T> {
      return new OrSpecification<T>(this, other)
    }

    orNot(other: ISpecification<T>): ISpecification<T> {
      return new OrNotSpecification<T>(this, other)
    }

    not(): ISpecification<T> {
      return new NotSpecification<T>(this)
    }
}

export class AndSpecification<T> extends CompositeSpecification<T> {

    private left: ISpecification<T>
    private right: ISpecification<T>

    constructor(left: ISpecification<T>, right: ISpecification<T>) {
        super()
        this.left = left
        this.right = right
    }

    isSatisfiedBy(candidate: T): boolean {
        return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate)
    }
}

export class AndNotSpecification<T> extends AndSpecification<T> {

  isSatisfiedBy(candidate: T): boolean {
      return super.isSatisfiedBy(candidate) !== true
  }
}

export class OrSpecification<T> extends CompositeSpecification<T> {

    private left: ISpecification<T>
    private right: ISpecification<T>

    constructor(left: ISpecification<T>, right: ISpecification<T>) {
        super()
        this.left = left
        this.right = right
    }

    isSatisfiedBy(candidate: T): boolean {
        return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate)
    }
}

export class OrNotSpecification<T> extends OrSpecification<T> {
    isSatisfiedBy(candidate: T): boolean {
        return super.isSatisfiedBy(candidate) !== true
    }
}

export class NotSpecification<T> extends CompositeSpecification<T> {

  private other: ISpecification<T>

  constructor(other: ISpecification<T>) {
      super()
      this.other = other
  }

  isSatisfiedBy(candidate: T): boolean {
      return !this.other.isSatisfiedBy(candidate)
  }
}

export class RangeSpecification<T> extends CompositeSpecification<T> {

  private a: T
  private b: T

  constructor(a: T, b: T) {
      super()
      this.a = a
      this.b = b
  }

  isSatisfiedBy(candidate: T): boolean {
      return candidate >= this.a && candidate <= this.b
  }
}
