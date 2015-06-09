describe('Phone Validator', function() {
  var validator = new Validator(window.validations.phone);

  it('exists', function() {
    expect(validator).toBeDefined();
  });

  it('fails for less than 10 digits', function() {
    expect(validator.test('ABC')).toBe(false);
  });

  it('fails for all the same digit', function() {
    expect(validator.test('1111111111')).toBe(false);
  });

  it('fails is second and third digit matches', function() {
    expect(validator.test('4115551212')).toBe(false);
    expect(validator.test('4225551212')).toBe(false);
    expect(validator.test('4335551212')).toBe(false);
  });

  it('fails for fourth digit 0 or 1', function() {
    expect(validator.test('2120551212')).toBe(false);
    expect(validator.test('2121551212')).toBe(false);
  });

  it('fails is fifth and sixth digit is 1', function() {
    expect(validator.test('2125114500')).toBe(false);
  });

  it('fails if input is a sequential number', function() {
    expect(validator.test('1234567890')).toBe(false);
    expect(validator.test('7890123456')).toBe(false);
    expect(validator.test('9876543210')).toBe(false);
    expect(validator.test('4321098765')).toBe(false);
  });

  it('passes for input "2125004500"', function() {
    expect(validator.test('2125004500')).toBe(true);
  });
});