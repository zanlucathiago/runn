export const SPACING = 2;

export const MODELS = {
  SHORT_ANSWER: {
    value: 'SHORT_ANSWER',
    description: 'Resposta curta',
  },
  PARAGRAPH: {
    value: 'PARAGRAPH',
    description: 'Parágrafo',
  },
  MULTIPLE_CHOICE: {
    value: 'MULTIPLE_CHOICE',
    description: 'Múltipla escolha',
  },
  CHECKBOXES: {
    value: 'CHECKBOXES',
    description: 'Caixas de seleção',
  },
  DROPDOWN: {
    value: 'DROPDOWN',
    description: 'Lista suspensa',
  },
  DATE: {
    value: 'DATE',
    description: 'Data',
  },
};

export const TYPES = [
  [MODELS.SHORT_ANSWER, MODELS.PARAGRAPH],
  [MODELS.MULTIPLE_CHOICE, MODELS.CHECKBOXES, MODELS.DROPDOWN],
  [MODELS.DATE],
];

export const QUESTION_TYPE = {
  TITLE_AND_DESCRIPTION: {
    defaultValue: 'Sem título',
    value: 'TITLE_AND_DESCRIPTION',
  },
  QUESTION: { defaultValue: '', value: 'QUESTION' },
};
