import ISpecification from './ISpecification';

export abstract class CompositeSpecification<T> implements ISpecification<T> {
    abstract isSatisfiedBy(candidate: T): boolean;

    and(other: ISpecification<T>): ISpecification<T> {
      return new AndSpecification<T>(this, other);
    }

    or(other: ISpecification<T>): ISpecification<T> {
      return new OrSpecification<T>(this, other);
    }

    not(): ISpecification<T> {
      return new NotSpecification<T>(this);
    }
}

export class AndSpecification<T> extends CompositeSpecification<T> {

    left: ISpecification<T>;
    right: ISpecification<T>;

    constructor(left: ISpecification<T>, right: ISpecification<T>) {
        super();
        this.left = left;
        this.right = right;
    }

    isSatisfiedBy(candidate: T): boolean {
        return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
    }
}

export class OrSpecification<T> extends CompositeSpecification<T> {

    left: ISpecification<T>;
    right: ISpecification<T>;

    constructor(left: ISpecification<T>, right: ISpecification<T>) {
        super();
        this.left = left;
        this.right = right;
    }

    isSatisfiedBy(candidate: T): boolean {
        return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
    }
}

export class NotSpecification<T> extends CompositeSpecification<T> {

  other: ISpecification<T>;

  constructor(other: ISpecification<T>) {
      super();
      this.other = other;
  }

  isSatisfiedBy(candidate: T): boolean {
      return !this.other.isSatisfiedBy(candidate);
  }
}

export class RangeSpecification<T> extends CompositeSpecification<T> {

  a: T;
  b: T;

  constructor(a: T, b: T) {
      super();
      this.a = a;
      this.b = b;
  }

  isSatisfiedBy(candidate: T): boolean {
      return candidate >= this.a && candidate <= this.b;
  }
}
