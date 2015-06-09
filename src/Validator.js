var ValidatorTypes = {
  REQ: 'requirement',     // Regex must pass to be valid
  RES: 'restriction'      // Regex must fail to be valid
};

// --------------------------------------
// Validator
//

var Validator = function(options) {
  $.extend(this, options);
  this.rules = [];

  if (options && options.rules) {
    for (var i = 0; i < options.rules.length; i++) {
      this.rules[i] = new ValidatorRule(options.rules[i]);
    }
  }
};

Validator.create = function(option) {
  if (window.validations[option]) {
    return new Validator(window.validations[option]);
  } else if (typeof option === 'object') {
    return new Validator(option);
  }

  return new Validator();
};

Validator.prototype.renderNotes = function(id) {
  var html = '<div id="' + id + 'Validations" class="validations" aria-hidden="true"><ul>';

  for (var i = 0; i < this.rules.length; i++) {
    html += '<li class="' + this.rules[i].type +
            '" aria-hidden="true">' +
            this.rules[i].note + '</li>';
  }
  html += '</ul></div>';

  return html;
};

Validator.prototype.test = function(val) {
  var passes = 0;

  for (var i = 0; i < this.rules.length; i++) {
    if (this.rules[i].test(val)) {
      passes++;
    }
  }

  return (passes === this.rules.length);
};

// --------------------------------------
// ValidatorRule
//

var ValidatorRule = function(options) {
  $.extend(this, {
    type: ValidatorTypes.REQ,    // Requirement or Restriction
    note: '',                    // Error message to display
    regx: /.+/,                  // Single Regex or Array of Regexes
    all: false,                  // If an Array, all tests must pass
    minTestLen: -1,              // Number of chars before validation takes place
    help: true,                  // Help will not trigger a warning or an error
    showOnFirstFocus: true       // Show hint on first focus
  }, options);

  // Help for REQ = True by default
  // Help for RES = False by default
  if (options && options.type === ValidatorTypes.RES) {
    this.help = options.help || false;
  }
};

/**
 * For each ValidatorRule a test() is provided to see if the
 * rule passes or not.
 *
 * IMPORTANT:
 * Requirement = Regex/Function that must Pass to return True
 * Restriction = Regex/Function that must Fail to return True
 *
 * @param val         is the value of the input
 * @returns boolean   true if the test passes
 */
ValidatorRule.prototype.test = function(val) {
  var result, testsPassed = 0;

  if (typeof this.func === 'function') {
    return this.func(val);
  }

  if (this.regx.length > 1) {
    // regx is an array of expressions, all of which
    // are required to pass
    for (var i = 0; i<this.regx.length; i++) {
      if (this.regx[i].test(val)) {
        testsPassed++;
      }
    }
    if (this.all) {
      result = (testsPassed === this.regx.length);
    } else {
      result = (0 < testsPassed);
    }
  } else {
    // regex was a single expression
    result = this.regx.test(val);
  }

  return (this.type === ValidatorTypes.REQ) ? result : !result;
};