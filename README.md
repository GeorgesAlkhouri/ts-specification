Specification pattern for JavaScript implemented with TypeScript
================================================================

[![Build Status](https://travis-ci.org/GeorgesAlkhouri/ts-specification.svg?branch=master)](https://travis-ci.org/GeorgesAlkhouri/ts-specification)

> In computer programming, the specification pattern is a particular software design pattern, whereby business rules can be recombined by chaining the business rules together using boolean logic.
>
> -- <cite>Wikipedia.org ( https://en.wikipedia.org/wiki/Specification_pattern )</cite>

Usage With Node
---------------

To use ts-specification with Node just run:

`npm install ts-specification`

and import the package afterwards:

`import Specification from 'ts-specification'`

The test cases are written in JavaScript and can be tested with:

`npm test`

Create Custom Specs
-------------------

To create custom specifications just extend from the `CompositeSpecification` class and implement the `isSatisfiedBy` function.

**TypeScript**

```
class RangeSpecification<T> extends CompositeSpecification<T> {

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
```

**JavaScript**

```
import {CompositeSpecification} from 'ts-specification';

class TrueSpecification extends CompositeSpecification {

    isSatisfiedBy(candidate) {
        return true;
    }
}
```
