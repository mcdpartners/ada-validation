describe('Date Validator', function() {
  var validator = new Validator(window.validations.date);

  it('exists', function() {
    expect(validator).toBeDefined();
  });

  it('passes for good date', function() {
    expect(validator.test('08/17/1993')).toBe(true);
  });

  it('fails for no leading zero on month', function() {
    expect(validator.test('8/17/1993')).toBe(false);
  });

  it('fails for no leading zero on day', function() {
    expect(validator.test('08/7/1993')).toBe(false);
  });

  it('fails for too high a month', function() {
    expect(validator.test('18/17/1993')).toBe(false);
  });

  it('fails for not enough digits in year', function() {
    expect(validator.test('08/17/199')).toBe(false);
  });

  it('fails for impossible year', function() {
    expect(validator.test('07/04/1776')).toBe(false);
  });

  it('fails for day higher than 31', function() {
    expect(validator.test('08/32/1993')).toBe(false);
  });

  it('passes for leap year', function() {
    expect(validator.test('02/29/2012')).toBe(true);
  });

  it('fails for non leap year', function() {
    expect(validator.test('02/29/2001')).toBe(false);
  });

  it('passes for 100 even leap year', function() {
    expect(validator.test('02/29/2000')).toBe(true);
  });
});