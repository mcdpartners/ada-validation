describe('SSN Validator', function() {
  var validator = new Validator(window.validations.ssn);

  it('exists', function() {
    expect(validator).toBeDefined();
  });

  it('passes for good ssn with hyphens', function() {
    expect(validator.test('123-11-1111')).toBe(true);
  });

  it('passes for good ssn without hyphens', function() {
    expect(validator.test('123111111')).toBe(true);
  });

  it('fails for having letters', function() {
    expect(validator.test('abc-11-1111')).toBe(false);
  });

  it('fails for having letters', function() {
    expect(validator.test('abc111111')).toBe(false);
  });

  it('fails for not enough digits', function() {
    expect(validator.test('12-11-1111')).toBe(false);
  });

  it('fails for not enough digits', function() {
    expect(validator.test('12111111')).toBe(false);
  });

  it('fails for too many digits', function() {
    expect(validator.test('1234-11-1111')).toBe(false);
  });

  it('fails for too many digits', function() {
    expect(validator.test('1234111111')).toBe(false);
  });
});