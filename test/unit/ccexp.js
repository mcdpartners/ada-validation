describe('CC Exp Validator', function() {
  var validator = new Validator(window.validations.ccexp);

  it('exists', function() {
    expect(validator).toBeDefined();
  });

  it('passes for good exp', function() {
    expect(validator.test('09/2016')).toBe(true);
  });

  it('fails for no leading zero on month', function() {
    expect(validator.test('9/2016')).toBe(false);
  });

  it('fails for not enough digits on year', function() {
    expect(validator.test('09/16')).toBe(false);
  });

  it('fails for invalid date', function() {
    expect(validator.test('ABC')).toBe(false);
  });
});