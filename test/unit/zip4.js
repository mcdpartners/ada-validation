describe('ZIP4 Validator', function() {
  var validator = new Validator(window.validations.zip4);

  it('exists', function() {
    expect(validator).toBeDefined();
  });

  it('passes for good zip', function() {
    expect(validator.test('12345-1234')).toBe(true);
  });

  it('fails for having letters', function() {
    expect(validator.test('123ab-12ab')).toBe(false);
  });

  it('fails for not enough digits', function() {
    expect(validator.test('12345-123')).toBe(false);
  });

  it('fails for too many digits', function() {
    expect(validator.test('123456-1234')).toBe(false);
  });
});