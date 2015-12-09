(function() {
  'use strict';

  // PUBLIC CLASS DEFINITION
  // ================================

  var ValidatedInput = function(element, options) {
    var RequiredRule;

    this.$element   = $(element);
    this.options    = $.extend({}, ValidatedInput.DEFAULTS, options);
    this.isRequired = this.$element.attr('required');
    this.validator  = Validator.create(options.validator);
    this.hasError   = false;
    this.tagName    = this.$element.prop('tagName').toLowerCase();

    if (this.isRequired) {
      RequiredRule = new Validator(validations.required);
      if (this.options.requiredNote) {
        RequiredRule.rules[0].note = this.options.requiredNote;
      }
      this.validator.rules = this.validator.rules.concat(RequiredRule.rules);
    }

    this.addListeners();
    this.configureInput();
  };

  ValidatedInput.VERSION  = '0.3.1';

  ValidatedInput.DEFAULTS = {};

  ValidatedInput.prototype.addListeners = function() {
    this.$element.on('focus.validatedInput', this, onFocus);
    this.$element.on('change.validatedInput', this, onChange);
    this.$element.on('blur.validatedInput', this, onBlur);

    if (this.tagName === 'input') {
      this.$element.on('keyup.validatedInput', this, onKeyUp);
    }
  };

  ValidatedInput.prototype.removeListeners = function() {
    this.$element.off('focus.validatedInput, keyup.validatedInput, blur.validatedInput');
  };

  ValidatedInput.prototype.configureInput = function() {
    var id = this.$element.attr('id');
    var tagType = this.$element.attr('type');
    var attrs = {
        'aria-describedby': id + 'Validations'
      };
    var html;

    if (['input', 'select'].indexOf(this.tagName) === -1) {
      throw new Error('ValidatedInput cannot be applied to a ' + tagName);
    }

    if (!this.$element.attr(DATA_VALIDATION)) {
      attrs[DATA_VALIDATION] = 'true';
    }

    if (this.isRequired) {
      attrs['aria-required'] = 'true';
    }

    // Server-side validation has determined this field has an error
    if (this.$element.attr('aria-invalid') === 'true') {
      this.hasError = true;
    }

    if (this.tagName === 'input') {
      switch (tagType) {
        case 'text':
        case 'email':
        case 'tel':
        case 'password':
          $.extend(attrs, {
            'maxlength': this.validator.maxlength,
            'autocapitalize': this.validator.autocapitalize || 'off',
            'autocorrect': this.validator.autocorrect || 'off',
            'placeholder': this.validator.placeholder
          });
          break;
        case 'radio':
        case 'checkbox':
          // Nothing yet
          break;
      }
    }

    // This flag is set initally so that we know when the first time
    // a user interacts with the field is.
    attrs['data-validation-first-focus'] = 'true';

    this.$element.attr(attrs);

    html = this.validator.renderNotes(id);
    this.$element.closest('.form-group').append(html);
  };

  ValidatedInput.prototype.validate = function(isClientSideSubmit) {
    var val = this.$element.val();
    var $elGroup = this.$element.closest('.form-group');
    var rules = this.validator.rules;
    var $validations = $('#' + this.$element.attr('id') + 'Validations');
    var $hints = $validations.find('ul').children();
    var testHasPassed, theRule;
    var result = {errors: [], warnings: []};
    var isFirstTimedFocused = this.$element.data('validation-first-focus') === true;
    var isDisabled = this.$element.prop('disabled');

    var valueIsRequired = this.$element.attr('required') === 'required';
    var valueIsNotRequired = !valueIsRequired;
    var valueIsPresent = val.length > 0;
    var valueIsTooShortToTest;

    $validations.css('width', this.$element.outerWidth() + 'px');

    if (isDisabled) {
      return result;
    }

    for (var i = 0; i < rules.length; i++) {
      theRule = rules[i];
      testHasPassed = theRule.test(val);

      if (isClientSideSubmit) {
        if (testHasPassed || (!valueIsPresent && valueIsNotRequired)) {
          ariaHide($hints.eq(i));
        } else {
          this.hasError = true;
          $elGroup.addClass(ERROR_CLASS);
          ariaInvalid(this.$element);
          result.errors.push(theRule.note);
        }
      } else {
        if (!isFirstTimedFocused || theRule.showOnFirstFocus) {
          valueIsTooShortToTest = (val.length < theRule.minTestLen);

          if (valueIsTooShortToTest) {
            ariaHide($hints.eq(i));
          } else if (testHasPassed) {
            this.hasError = false;
            ariaHide($hints.eq(i));
          } else {
            ariaShow($validations);
            ariaShow($hints.eq(i));
            ariaInvalid(this.$element);

            result.warnings.push(theRule.note);

            if (!isFirstTimedFocused && !this.hasError) {
              $elGroup.addClass(WARNING_CLASS);
            }
          }
        }
      }
    }

    if (result.warnings.length === 0 && result.errors.length === 0) {
      ariaHide($validations);
      ariaValid(this.$element);
      $elGroup.removeClass(ERROR_CLASS);
      $elGroup.removeClass(WARNING_CLASS);
    }

    return result;
  };

  function onFocus(e) {
    // For checkboxes, focus and change happen together. We need to ignore the
    // focus events in these cases as validate has already been handled.
    setTimeout(function() {
      if (!e.data.handled) {
        e.data.validate();
        e.data.handled = false;
      }
    }, 0);
  }

  function onKeyUp(e) {
    e.data.handled = true;
    e.data.validate();
  }

  function onChange(e) {
    e.data.handled = true;
    e.data.validate();
  }

  function onBlur(e) {
    var instance = e.data;
    var $el = instance.$element;
    var $validations = $('#' + $el.attr('id') + 'Validations');
    var inputHasWarnings = instance.validate().warnings.length > 0;
    var valueIsEmpty = $el.val() === '';
    var valueIsRequired = $el.attr('required');
    var $elGroup = $el.closest('.form-group');

    if (inputHasWarnings || (valueIsEmpty && valueIsRequired)) {
      $elGroup.addClass(WARNING_CLASS);
    }

    ariaHide($validations);
    $el.data('validation-first-focus', 'false');
    e.data.handled = false;
  }

  // PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function() {
      var $this   = $(this);
      var data    = $this.data('validatedInput');
      var options = $.extend({}, ValidatedInput.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) {
        $this.data('validatedInput', (data = new ValidatedInput(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  }

  var old = $.fn.validatedInput;

  $.fn.validatedInput             = Plugin;
  $.fn.validatedInput.Constructor = ValidatedInput;

  // NO CONFLICT
  // ====================

  $.fn.validatedInput.noConflict = function() {
    $.fn.validatedInput = old;
    return this;
  };

  // DATA-API
  // =================

  $(document).ready(function() {
    $('[data-validation]').each(function() {
      var $this   = $(this);
      var data    = $this.data('validatedInput');
      var option  = {
        validator: $this.data('validation')
      };

      if (!data) {
        Plugin.call($this, option);
      }
    });
  });
})();