export const SPACING = 2;

export const MODELS = {
  SHORT_ANSWER: {
    value: 'SHORT_ANSWER',
    icon: 'ShortText',
    description: 'Resposta curta',
  },
  PARAGRAPH: {
    value: 'PARAGRAPH',
    icon: 'Subject',
    description: 'Parágrafo',
  },
  MULTIPLE_CHOICE: {
    value: 'MULTIPLE_CHOICE',
    icon: 'RadioButtonChecked',
    description: 'Múltipla escolha',
  },
  CHECKBOXES: {
    value: 'CHECKBOXES',
    icon: 'CheckBox',
    description: 'Caixas de seleção',
  },
  DROPDOWN: {
    value: 'DROPDOWN',
    icon: 'ArrowDropDownCircle',
    description: 'Lista suspensa',
  },
  DATE: {
    value: 'DATE',
    icon: 'Event',
    description: 'Data',
  },
  TIME: {
    value: 'TIME',
    icon: 'AccessTime',
    description: 'Horário',
  },
};

export const TYPES = [
  [MODELS.SHORT_ANSWER, MODELS.PARAGRAPH],
  [MODELS.MULTIPLE_CHOICE, MODELS.CHECKBOXES, MODELS.DROPDOWN],
  [MODELS.DATE, MODELS.TIME],
];

export const QUESTION_TYPE = {
  TITLE_AND_DESCRIPTION: {
    defaultValue: 'Sem título',
    value: 'TITLE_AND_DESCRIPTION',
  },
  QUESTION: { defaultValue: '', value: 'QUESTION' },
};
