describe('Acct num Validator', function() {
  var validator = new Validator(window.validations.abartn);

  it('exists', function() {
    expect(validator).toBeDefined();
  });

  it('passes for good acct num', function() {
    expect(validator.test('021000021')).toBe(true);
  });

  it('fails for number not mod 10', function() {
    expect(validator.test('123456789')).toBe(false);
  });

  it('fails for too many digits', function() {
    expect(validator.test('0210000211')).toBe(false);
  });

  it('fails for too few digits', function() {
    expect(validator.test('02100002')).toBe(false);
  });

  it('fails for containing letter', function() {
    expect(validator.test('0s1000021')).toBe(false);
  });
});