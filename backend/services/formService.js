const isDuplicateFormNotExists = (validation) => validation.expression === 'DUPLICATE_FORM'
  && validation.operator === 'NOT_EXISTS';

module.exports = {
  isDuplicateFormNotExists,
};
