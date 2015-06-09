describe('Email Validator', function() {
  var validator = new Validator(window.validations.email);

  it('exists', function() {
    expect(validator).toBeDefined();
  });

  it('fails for less than 1 character', function() {
    expect(validator.test('')).toBe(false);
  });

  it('fails for more than 48 characters', function() {
    var testString = 'srandddddddddddddddddddddddddddddd@mcdpartners.com';
    expect(validator.test(testString)).toBe(false);
  });

  it('passes for exactly 48 characters', function() {
    var testString = 'srandddddddddddddddddddddddddddd@mcdpartners.com';
    expect(validator.test(testString)).toBe(true);
  });

  it('fails for no @ symbol in string', function() {
    expect(validator.test('srandmcdpartners.com')).toBe(false);
  });

  it('fails for no . symbol in string', function() {
    expect(validator.test('srand@mcdpartnerscom')).toBe(false);
  });

  it('fails for / character in string after @ symbol', function() {
    expect(validator.test('srand@/mcdpartners.com')).toBe(false);
  });

  it('fails for @ symbol in beginning of string', function() {
    expect(validator.test('@srand@mcdpartners.com')).toBe(false);
  });

  it('fails for . symbol in beginning of string', function() {
    expect(validator.test('.srand@mcdpartners.com')).toBe(false);
  });

  it('fails for two @ symbols in string', function() {
    expect(validator.test('srand@@mcdpartners.com')).toBe(false);
  });

  it('fails for two . symbols in string', function() {
    expect(validator.test('srand@mcdpartners..com')).toBe(false);
  });

  it('fails for . symbol at end in string', function() {
    expect(validator.test('srand@mcdpartners.com.')).toBe(false);
  });

  it('fails for @ symbol at end in string', function() {
    expect(validator.test('srand@mcdpartners.com@')).toBe(false);
  });

  it('fails for . symbol next to @ in string', function() {
    expect(validator.test('srand@.mcdpartners.com')).toBe(false);
  });

  it('passes for good string', function() {
    expect(validator.test('srand@mcdpartners.com')).toBe(true);
  });

  it('passes for good string with number', function() {
    expect(validator.test('sr4and@mcdpartners.com')).toBe(true);
  });

  it('passes for good string with two dots not together', function() {
    expect(validator.test('srand@mcdpa.rtners.com')).toBe(true);
  });

  it('passes for good string with dash', function() {
    expect(validator.test('sra-nd@mcdpartners.com')).toBe(true);
  });
});