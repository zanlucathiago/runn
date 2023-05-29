export const SPACING = 2;

export const MODELS = {
  SHORT_ANSWER: {
    placeholder: 'Texto de resposta curta',
    value: 'SHORT_ANSWER',
    icon: 'ShortText',
    description: 'Resposta curta',
  },
  PARAGRAPH: {
    placeholder: 'Texto de resposta longa',
    value: 'PARAGRAPH',
    icon: 'Subject',
    description: 'Parágrafo',
  },
  MULTIPLE_CHOICE: {
    option: {
      icon: 'RadioButtonUnchecked',
    },
    value: 'MULTIPLE_CHOICE',
    icon: 'RadioButtonChecked',
    description: 'Múltipla escolha',
  },
  CHECKBOXES: {
    option: {
      icon: 'CheckBoxOutlineBlank',
    },
    value: 'CHECKBOXES',
    icon: 'CheckBox',
    description: 'Caixas de seleção',
  },
  DROPDOWN: {
    option: {},
    value: 'DROPDOWN',
    icon: 'ArrowDropDownCircle',
    description: 'Lista suspensa',
  },
  DATE: {
    placeholder: 'Mês, dia, ano',
    value: 'DATE',
    icon: 'Event',
    description: 'Data',
  },
  TIME: {
    placeholder: 'Horário',
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

export const OPERATORS = [
  {
    value: 'EXISTS',
    text: 'Existe/existem',
  },
  {
    value: 'NOT_EXISTS',
    text: 'Não existe/existem',
  },
];

export const EXPRESSIONS = [
  {
    value: 'AVAILABLE_OPTIONS',
    text: 'Opções disponíveis (chave primária)',
  },
  {
    value: 'DUPLICATE_FORM',
    text: 'Lançamento conflitante (chave primária)',
  },
];
