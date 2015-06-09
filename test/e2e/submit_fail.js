casper.test.begin('Testing Form Submit With Known Errors', 19, function suite(test) {
  function assertInput(id) {
    test.assertExists(id, id + ' Input exists');
    this.click(id);
  }

  casper.start('demo/demo1.html', function() {
    test.assertExists('#err', 'The summary element exisits');
    test.assertEquals(this.getElementAttribute('#err', 'aria-hidden'), 'true', 'The summary element is hidden');
    casper.fill('#form1', {
      'fname':  'James\/',
      'hphone': 'ABC',
      'wphone': '123',
      'dob':    '45',
      'abartn': '123',
    }, false);
  });

  // Click #err so that the last fill field doesn't retain focus
  casper.thenClick('#err', function() {
    casper.echo('==== Submit Form ====', 'INFO');
  });

  casper.thenClick('#saveBtn', function() {
    test.assertEquals(this.getElementAttribute('#err', 'aria-hidden'), 'false', 'The summary element is visible');
    assertInput.call(this, '#fname');
  });

  casper.waitForSelector('#fnameValidations[aria-hidden="false"]', function() {
    test.assert(true, '#fname Tooltip is visible on focus');
    assertInput.call(this, '#hphone');
  });

  casper.waitForSelector('#hphoneValidations[aria-hidden="false"]', function() {
    test.assertEquals(this.getElementAttribute('#fnameValidations', 'aria-hidden'), 'true', '#fname Tooltip is hidden on blur');
    test.assert(true, '#hphone Tooltip is visible on focus');
    assertInput.call(this, '#wphone');
  });

  casper.waitForSelector('#wphoneValidations[aria-hidden="false"]', function() {
    test.assertEquals(this.getElementAttribute('#hphoneValidations', 'aria-hidden'), 'true', '#hphone Tooltip is hidden on blur');
    test.assert(true, '#wphone Tooltip is visible on focus');
    assertInput.call(this, '#dob');
  });

  casper.waitForSelector('#dobValidations[aria-hidden="false"]', function() {
    test.assertEquals(this.getElementAttribute('#wphoneValidations', 'aria-hidden'), 'true', '#wphone Tooltip is hidden on blur');
    test.assert(true, '#dob Tooltip is visible on focus');
    assertInput.call(this, '#abartn');
  });

  casper.waitForSelector('#abartnValidations[aria-hidden="false"]', function() {
    test.assertEquals(this.getElementAttribute('#wphoneValidations', 'aria-hidden'), 'true', '#dob Tooltip is hidden on blur');
    test.assert(true, '#abartn Tooltip is visible on focus');
  });

  casper.thenClick('#resetBtn', function() {
    test.assertEquals(this.getElementAttribute('#abartnValidations', 'aria-hidden'), 'true', '#abartn Tooltip is hidden on blur');
    casper.echo('==== Form Reset ====', 'INFO');
    test.assertEquals(this.getElementAttribute('#err', 'aria-hidden'), 'true', 'The summary element is hidden');
  });

  casper.run(function() {
    test.done();
  });
});