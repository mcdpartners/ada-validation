casper.test.begin('Config Input', 12, function suite(test) {
  casper.start('demo/demo1.html', function() {
  });

  casper.on('remote.message', function(message) {
    this.echo(message);
  });

  casper.then(function() {
    test.assertExists('input[aria-describedby="fnameValidations"][data-validation="fname"][maxlength="15"][autocorrect="off"][autocapitalize="true"]');
    test.assertExists('input[aria-describedby="hphoneValidations"][data-validation="phone"][maxlength="14"][autocorrect="off"][autocapitalize="off"][placeholder="(XXX) XXX-XXXX"]');
    test.assertExists('input[aria-describedby="wphoneValidations"][data-validation="phone"][maxlength="14"][autocorrect="off"][autocapitalize="off"][placeholder="(XXX) XXX-XXXX"]');
    test.assertExists('input[aria-describedby="dobValidations"][data-validation="true"][maxlength="2"][autocorrect="off"][autocapitalize="off"]');
    test.assertExists('input[aria-describedby="abartnValidations"][data-validation="abartn"][maxlength="9"][autocorrect="off"][autocapitalize="off"]');
    test.assertExists('select[aria-describedby="genderValidations"][data-validation="true"]');

    test.assertExists('#fnameValidations');
    test.assertExists('#hphoneValidations');
    test.assertExists('#wphoneValidations');
    test.assertExists('#dobValidations');
    test.assertExists('#abartnValidations');
    test.assertExists('#genderValidations');

    // Possible test for Placeholder Text
    /*
    test.assertEvalEquals(function() {
      var inputList = document.getElementsByTagName('input');
      var badInputNum = 0;

      for(var i=0;i<inputList.length;i++) {
        if(!inputList.item(i).getAttribute('maxlength') || !inputList.item(i).getAttribute('autocorrect') || !inputList.item(i).getAttribute('autocapitalize') ) {
          badInputNum +=1;
        }

        if($(inputList.item(i)).data('validatedInput').validator.placeholder) {
          var placeholderTxt = $(inputList.item(i)).data('validatedInput').validator.placeholder;
          if($(inputList.item(i)).attr('placeholder') !== placeholderTxt) {
            badInputNum+=1;
          }
        }
      }
      return badInputNum;
    },0);
    */
  });

  casper.run(function() {
    test.done();
  });
});