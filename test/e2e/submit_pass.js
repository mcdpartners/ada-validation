casper.test.begin('Successful Submit', 1, function suite(test) {
  casper.start('demo/demo1.html', function() {
    casper.fill('#form1', {
      'fname':  'James',
      'hphone': '2125004500',
      'wphone': '2125004500',
      'dob':    '12',
      'abartn': '114923756',
      'gender': 'M'
    }, false);
  });

  casper.then(function() {
    this.click('#saveBtn');
  });

  casper.then(function() {
    test.assertDoesntExist('#err ul li');
  });

  casper.run(function() {
    test.done();
  });
});