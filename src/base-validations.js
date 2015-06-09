/**
 * Base Validations
 *
 * Validator Properties:
 *  - maxlength        Number     Text input maximum number of chars
 *  - autocapitalize   Boolean    true or false (false)
 *  - autocorrect      Boolean    true or false (false)
 *  - placeholder      String     Text input placeholder text
 *
 * ValidatorRule Properties:
 *  - type             String     'requirement' or 'restriction' ('requirement')
 *                                  requirement = test must pass or field is invalid
 *                                  restriction = test must fail or field is invalid
 *  - note             String     Error message to display
 *  - regx             Regex      Single Regex or Array of Regexes (/.+/)
 *  - all              Boolean    If regx is an Array this flag will determine if
 *                                  all tests must pass or just one. (false)
 *  - minTestLen       Number     Number of chars before validation takes place (-1)
 *  - help             Boolean    Help will not trigger a warning or an error
 *  - showOnFirstFocus Boolean    Does this rule's note appear on first focus of
 *                                  input? (true)
 *  - func             Function   Can be used in place of 'regx' but not together.
 *                                  Function must return true or false based on the
 *                                  'type' set for the rule.
 */

window.validations = {

  password: {
    maxlength: 32,
    rules: [
      {
        note: 'Enter 8 to 32 characters',
        regx: /^.{8,32}$/
      },
      {
        note: 'Enter at least 1 letter and at least 1 number',
        regx: /^(?=.*\d)(?=.*[a-zA-Z]).+$/
      },
      {
        type: 'restriction',
        note: 'Input must not contain the word "Password"',
        regx: /[Pp]assword/
      }
    ]
  },

  email: {
    maxlength: 48,
    rules: [
      {
        note: 'Enter a proper email format (e.g., email@domain.com)'
      },
      {
        help: false,
        note: 'Enter a proper email format (e.g., email@domain.com)',
        regx: /^[\'_a-zA-Z0-9-]+(\.[\'_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
        minTestLen: 1
      },
      {
        help: false,
        note: 'Input must contain "@" and "."',
        regx: /^(?=.*@)(?=.*\.).+$/,
        minTestLen: 5
      },
      {
        type: 'restriction',
        note: 'Input must not have more than 48 characters',
        regx: /^.{49,}$/,
      },
      {
        type: 'restriction',
        note: 'Input must not start or end with "@" and "."',
        regx: [
          /^@/,
          /@$/,
          /^\./,
          /\.$/
        ]
      },
      {
        type: 'restriction',
        note: 'Input must not contain more than one "@"',
        regx: /^[^@]*@[^@]*(?=@)/
      },
      {
        type: 'restriction',
        note: 'Input must not have "." immediately following "@"',
        regx: /@\./
      },
    ]
  },

  phone: {
    maxlength: 14,
    placeholder: '(XXX) XXX-XXXX',
    rules: [
      {
        note: 'Enter 10 digits, no hyphens',
        regx: /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      },
      {
        type: 'restriction',
        note: 'Invalid Phone Number',
        func: function(val) {
          var input = String(val.replace(/[^\d]/g, ''));
          if (input[0] === '0' || input[0] === '1') {
            return;
          }
          if (input.length >= 3 && input[1] === input[2]) {
            return;
          }
          if (input.length >= 4 && input[3] === '0' || input[3] === '1') {
            return;
          }
          if (input.length >= 6 && input[4] === '1' && input[5] === '1') {
            return;
          }
          if (input.length === 10 && '01234567890123456789'.indexOf(input) !== -1) {
            return;
          }
          if (input.length === 10 && '98765432109876543210'.indexOf(input) !== -1) {
            return;
          }

          switch (input) {
            case '0000000000':
            case '1111111111':
            case '2222222222':
            case '3333333333':
            case '4444444444':
            case '5555555555':
            case '6666666666':
            case '7777777777':
            case '8888888888':
            case '9999999999':
              return;
          }
          return true;
        }
      },
    ]
  },

  ssn: {
    maxlength: 11,
    placeholder: 'XXX-XX-XXXX',
    rules: [
      {
        note: 'Enter 9 digits',
        regx: [
          /^\d{9}$/,
          /^\d{3}-\d{2}-\d{4}$/
        ]
      }
    ]
  },

  ssn4: {
    maxlength: 4,
    placeholder: 'XXXX',
    rules: [
      {
        note: 'Enter 4 digits',
        regx: /^\d{4}$/
      }
    ]
  },

  zip: {
    maxlength: 5,
    placeholder: 'XXXXX',
    rules: [
      {
        note: 'Enter 5 digits',
        regx: /^\d{5}$/
      }
    ]
  },

  zip4: {
    maxlength: 9,
    placeholder: 'XXXXX-XXXX',
    rules: [
      {
        note: 'Enter 5 plus 4 digits',
        regx: [
          /^\d{5}$/,
          /^\d{5}-\d{4}$/
        ]
      }
    ]
  },

  date: {
    maxlength: 10,
    placeholder: 'mm/dd/yyyy',
    rules: [
      {
        note: 'Enter a proper date format (e.g., mm/dd/yyyy)',
        func: function checkEmail(val) {
          var dt, dstr, ustr;
          var dateWithSlashes = /^\d{2}\/\d{2}\/\d{4}$/;
          var dateWithDashes = /^\d{2}-\d{2}-\d{4}$/;
          if (!dateWithSlashes.test(val) && !dateWithDashes.test(val)) {
            return false;
          }
          dt = new Date(val);
          if (dt) {
            dstr = (('0' + (dt.getMonth() + 1)).slice(-2)).toString() +
                   (('0' + dt.getDate()).slice(-2)).toString() +
                   dt.getFullYear().toString();
            ustr = val.replace(/[^\d]/g, '').toString();
            return (dstr === ustr);
          }
          return false;
        }
      },
    ]
  },

  ccnum: {
    maxlength: 19,
    placeholder: 'XXXX-XXXX-XXXX-XXXX',
    rules: [
      {
        note: 'Enter 16 digits',
        regx: [
          /^\d{16}$/,
          /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
          /^\d{4}-\d{4}-\d{4}-\d{4}$/
        ]
      },
      {
        note: 'Input is not a valid credit card number',
        func: function checkLuhn(val) {
          var newval = val.replace(/[^\d]/g, '');
          var numdigits = newval.length;
          var sum = 0;
          var parity = numdigits % 2;
          var digit;

          if (numdigits !== 16) {
            return false;
          }

          for (var i = 0; i < numdigits; i++) {
            digit = parseInt(newval.charAt(i), 10);
            if (i % 2 === parity) {
              digit *= 2;
            }
            if (digit > 9) {
              digit -= 9;
            }
            sum += digit;
          }
          return (sum % 10) === 0;
        }
      }
    ]
  },

  ccexp: {
    maxlength: 7,
    placeholder: 'mm/yyyy',
    rules: [
      {
        note: 'Enter a proper format (e.g., mm/yyyy)',
        regx: /^\d{2}\/\d{4}$/
      }
    ]
  },

  ccv: {
    maxlength: 3,
    rules: [
      {
        note: 'Enter the last 3 digits of the ID number on the back of your Credit Card',
        regx: /^\d{3}$/
      }
    ]
  },

  abartn: {
    maxlength: 9,
    rules: [
      {
        note: 'Enter a valid bank account routing number',
        func: function checkAba(val) {
          var n = 0;

          for (var i = 0; i < val.length; i += 3) {
            n += parseInt(val.charAt(i), 10) * 3 +
                 parseInt(val.charAt(i + 1), 10) * 7 +
                 parseInt(val.charAt(i + 2), 10);
          }

          return (n !== 0 && n % 10 === 0);
        }
      },
      {
        note: 'Enter 9 digits',
        regx: /^\d{9}$/
      }
    ]
  },

  required: {
    rules: [
      {
        help: false,
        note: 'Input is required',
        regx: /.+/,
        showOnFirstFocus: false
      }
    ]
  }

};