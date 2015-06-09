describe('CCV Validator', function() {
  var validator = new Validator(window.validations.ccv);

  it('exists', function() {
    expect(validator).toBeDefined();
  });

  it('passes for good ccv', function() {
    expect(validator.test('006')).toBe(true);
  });

  it('fails for too few digits', function() {
    expect(validator.test('06')).toBe(false);
  });

  it('fails for too many digits', function() {
    expect(validator.test('0006')).toBe(false);
  });

  it('fails for letters', function() {
    expect(validator.test('00a')).toBe(false);
  });
});