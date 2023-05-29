const createOptionFromText = (questionModel) => (option) =>
  new Option({ text: option.text, question: questionModel });

module.exports = {
  createOptionFromText,
};
