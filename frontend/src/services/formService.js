const hasFormValidationExpression = (validation) => (
  validation.expression === 'DUPLICATE_FORM'
  && validation.operator === 'NOT_EXISTS'
);

export default {
  hasFormValidationExpression,
};
