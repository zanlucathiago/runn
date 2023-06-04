const transformData = ({
  _id, title, description, questions,
}) => ({
  _id,
  title,
  description,
  questions: questions.map(
    ({
      _id,
      description,
      model,
      other,
      primaryKey,
      title,
      type,
      options,
      validations,
    }) => ({
      _id,
      description,
      model,
      other,
      primaryKey,
      title,
      type,
      options: options.map(({ _id, text }) => ({ _id, text })),
      validations: validations.map(({ _id, operator, expression }) => ({
        _id,
        operator,
        expression,
      })),
    }),
  ),
});

module.exports = {
  transformData,
};
