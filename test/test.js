import {assert} from 'chai';
import Specification, {CompositeSpecification} from '../dist/Specification.js';

class TrueSpecification extends CompositeSpecification {

    isSatisfiedBy(candidate) {
        return true;
    }
}

class FalseSpecification extends CompositeSpecification {

    isSatisfiedBy(candidate) {
        return false;
    }
}

describe('Specification Test', () => {

  it('false spec must be false', () => {
    assert.isFalse(new FalseSpecification().isSatisfiedBy(null));
  });
  it('true spec must be true', () => {
    assert.isTrue(new TrueSpecification().isSatisfiedBy(null));
  });
  it('false and false spec must be false', () => {
    assert.isFalse(
      new FalseSpecification()
      .and(new FalseSpecification())
      .isSatisfiedBy(null));
  });
  it('false and true spec must be false', () => {
    assert.isFalse(
      new FalseSpecification()
      .and(new TrueSpecification())
      .isSatisfiedBy(null));
  });
  it('true and false spec must be false', () => {
    assert.isFalse(
      new TrueSpecification()
      .and(new FalseSpecification())
      .isSatisfiedBy(null));
  });
  it('true and true spec must be true', () => {
    assert.isTrue(
      new TrueSpecification()
      .and(new TrueSpecification())
      .isSatisfiedBy(null));
  });
  it('false or false spec must be false', () => {
    assert.isFalse(
      new FalseSpecification()
      .or(new FalseSpecification())
      .isSatisfiedBy(null));
  });
  it('false or true spec must be true', () => {
    assert.isTrue(
      new FalseSpecification()
      .or(new TrueSpecification())
      .isSatisfiedBy(null));
  });
  it('true or false spec must be true', () => {
    assert.isTrue(
      new TrueSpecification()
      .or(new FalseSpecification())
      .isSatisfiedBy(null));
  });
  it('true or true spec must be true', () => {
    assert.isTrue(
      new TrueSpecification()
      .or(new TrueSpecification())
      .isSatisfiedBy(null));
  });
  it('true not spec must be false', () => {
     assert.isFalse(new TrueSpecification().not().isSatisfiedBy(null));
  });
  it('false not spec must be true', () => {
    assert.isTrue(new FalseSpecification().not().isSatisfiedBy(null));
  });

  it('should combine range specs and satisfy them', () => {
      const range1 = new Specification.RangeSpecification(1,5);
      const range2 = new Specification.RangeSpecification(3, 4)
      const combinedAnd = range1.and(range2);
      assert.isTrue(combinedAnd.isSatisfiedBy(3));
  });

  it('should combine range specs and not satisfy them', () => {
      const range1 = new Specification.RangeSpecification(1,5);
      const range2 = new Specification.RangeSpecification(7, 10)
      const combined = range1.or(range2);
      assert.isFalse(combined.isSatisfiedBy(6));
  });

  it('true andNot true spec should be false', () => {
      assert.isFalse(
          new TrueSpecification().andNot(new TrueSpecification()).isSatisfiedBy(null)
      );
  });

  it('true andNot false spec should be true', () => {
     assert.isTrue(
        new TrueSpecification().andNot(new FalseSpecification()).isSatisfiedBy(null)
     );
  });

  it('false andNot true spec should be true', () => {
      assert.isTrue(
          new FalseSpecification().andNot(new TrueSpecification()).isSatisfiedBy(null)
      );
  });

  it('false andNot false spec should be true', () => {
      assert.isTrue(
          new FalseSpecification().andNot(new FalseSpecification()).isSatisfiedBy(null)
      );
  });

  it('true orNot true spec should be false', () => {
      assert.isFalse(
          new TrueSpecification().orNot(new TrueSpecification()).isSatisfiedBy(null)
      );
  });

  it('true orNot false spec should be false', () => {
     assert.isFalse(
        new TrueSpecification().orNot(new FalseSpecification()).isSatisfiedBy(null)
     );
  });

  it('false orNot true spec should be false', () => {
      assert.isFalse(
          new FalseSpecification().orNot(new TrueSpecification()).isSatisfiedBy(null)
      );
  });

  it('false orNot false spec should be true', () => {
      assert.isTrue(
          new FalseSpecification().orNot(new FalseSpecification()).isSatisfiedBy(null)
      );
  });
});
