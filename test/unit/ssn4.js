describe('SSN4 Validator', function() {
  var validator = new Validator(window.validations.ssn4);

  it('exists', function() {
    expect(validator).toBeDefined();
  });

  it('passes for good ssn', function() {
    expect(validator.test('1111')).toBe(true);
  });

  it('fails for having letters', function() {
    expect(validator.test('f111')).toBe(false);
  });

  it('fails for not enough digits', function() {
    expect(validator.test('111')).toBe(false);
  });

  it('fails for too many digits', function() {
    expect(validator.test('11111')).toBe(false);
  });
});