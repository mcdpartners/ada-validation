describe('Password Validator', function() {
  var validator = new Validator(window.validations.password);

  it('exists', function() {
    expect(validator).toBeDefined();
  });

  it('passes for good password', function() {
    expect(validator.test('123goodfwgrgwht444')).toBe(true);
  });

  it('fails for being password', function() {
    expect(validator.test('password')).toBe(false);
  });

  it('fails for containing "password"', function() {
    expect(validator.test('badpassword')).toBe(false);
  });

  it('fails for no numbers', function() {
    expect(validator.test('nonumbersinhere')).toBe(false);
  });

  it('fails for no letters', function() {
    expect(validator.test('123123')).toBe(false);
  });

  it('fails with less than 8 characters', function() {
    expect(validator.test('123hi')).toBe(false);
  });

  it('fails with more than 32 characters', function() {
    expect(validator.test('1234567891011121fff15333333333333g')).toBe(false);
  });

  it('passes with 32 characters', function() {
    expect(validator.test('123456789101112123456789101112gg')).toBe(true);
  });

  it('passes with 8 characters', function() {
    expect(validator.test('123456af')).toBe(true);
  });
});