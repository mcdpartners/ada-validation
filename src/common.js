var DATA_VALIDATION       = 'data-validation';
var DATA_VALIDATION_LABEL = 'data-validation-label';
var DATA_VALIDATION_GROUP = 'data-validation-group';

var DATA_VALIDATE_FORM    = 'data-validate-form';
var DATA_VALIDATE_RESET   = 'data-validate-reset';

var WARNING_CLASS         = 'has-warning';
var ERROR_CLASS           = 'has-error';
var SUMMARY_CLASS         = 'error-summary';

function ariaHide($el) {
  $el.attr('aria-hidden', 'true');
}

function ariaShow($el) {
  $el.attr('aria-hidden', 'false');
}

function ariaValid($el) {
  $el.attr('aria-invalid', 'false');
}

function ariaInvalid($el) {
  $el.attr('aria-invalid', 'true');
}