interface ISpecification<T> {
        isSatisfiedBy(candidate: T): boolean
        and(other: ISpecification<T>): ISpecification<T>
        andNot(other: ISpecification<T>): ISpecification<T>
        or(other: ISpecification<T>): ISpecification<T>
        orNot(other: ISpecification<T>): ISpecification<T>
        not(): ISpecification<T>
}

export default ISpecification
