(function() {
  'use strict';

  // PUBLIC CLASS DEFINITION
  // ================================

  var ValidatedForm = function(element, options) {
    this.$element   = $(element);
    this.options    = $.extend({}, ValidatedForm.DEFAULTS, options);

    this.addListeners();
  };

  ValidatedForm.VERSION  = '0.3.1';

  ValidatedForm.DEFAULTS = {};

  ValidatedForm.prototype.addListeners = function() {
    this.$element.on('click.validatedForm', this, onClick);
    $(this.options.summary).on('click.validatedForm', 'a', onErrorClick);
    $(this.options.resetbtn).on('click.validatedForm', this, onResetForm);
  };

  ValidatedForm.prototype.validate = function() {
    var $input, $label, $target;
    var target = this.options.container;
    var inputHasErrors, inputLabel;
    var errorList = [];

    if (!target) {
      $target = this.$element.closest('form') || $('body');
    } else {
      $target = $(target);
    }

    $target.find('[' + DATA_VALIDATION + ']').each(function() {
      $input = $(this);
      $input.data('validation-first-focus', 'false');

      inputHasErrors = $input.data('validatedInput').validate(true).errors.length > 0;

      if (inputHasErrors) {
        $label = $('label[for=' + this.id + ']');
        inputLabel = $label.attr(DATA_VALIDATION_LABEL) || $label.html();
        errorList.push({
          element: this,
          label: inputLabel,
          errors: $input.data('validatedInput').validate(true).errors.slice()
        });
      }
    });

    if (errorList.length > 0) {
      this.displaySummary(errorList);

      if (this.options.onError) {
        this.options.onError.call(this, errorList);
      }
    } else {
      if (this.options.onSuccess) {
        this.options.onSuccess.call(this);
      }
    }

    return (errorList.length === 0);
  };

  ValidatedForm.prototype.removeSummary = function(errorList) {
    var $summary = $(this.options.summary);
    $summary.removeClass('open').attr('aria-hidden', 'true');
  };

  ValidatedForm.prototype.displaySummary = function(errorList) {
    var $summary = $(this.options.summary);

    if (!errorList || errorList.length === 0) {
      this.removeSummary();
      return;
    }

    if ($summary.length > 0) {
      var summary = '';

      for (var i = 0; i < errorList.length; i++) {
        summary += '<li><a href="#' + errorList[i].element.id +
                   '">' + errorList[i].label + ' is invalid.</a></li>';
      }

      $summary.addClass('open').attr('aria-hidden', 'false').focus();
      $summary.find('ul').empty().append(summary);
    }
  };

  function onResetForm(e) {
    var instance = e.data;
    var $container = $(instance.options.container);
    $container.find('.' + WARNING_CLASS).removeClass(WARNING_CLASS);
    $container.find('.' + ERROR_CLASS).removeClass(ERROR_CLASS);
    instance.removeSummary();
  }

  function onErrorClick(e) {
    $($(e.currentTarget).attr('href')).focus();
    return false;
  }

  function onClick(e) {
    var instance = e.data;
    if (instance.validate()) {
      if (!instance.options.submits) {
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  }

  // PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function() {
      var $this   = $(this);
      var data    = $this.data('validatedForm');
      var options = $.extend({}, ValidatedForm.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) {
        $this.data('validatedForm', (data = new ValidatedForm(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  }

  var old = $.fn.validatedForm;

  $.fn.validatedForm             = Plugin;
  $.fn.validatedForm.Constructor = ValidatedForm;

  // NO CONFLICT
  // ====================

  $.fn.validatedForm.noConflict = function() {
    $.fn.validatedForm = old;
    return this;
  };
})();