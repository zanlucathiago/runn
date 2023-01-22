export const SPACING = 2;

export const TYPES = [
  [
    {
      value: 'SHORT_ANSWER',
      description: 'Resposta curta',
    },
    {
      value: 'PARAGRAPH',
      description: 'Parágrafo',
    },
  ],
  [
    {
      value: 'MULTIPLE_CHOICE',
      description: 'Múltipla escolha',
    },
    {
      value: 'CHECKBOXES',
      description: 'Caixas de seleção',
    },
    {
      value: 'DROPDOWN',
      description: 'Lista suspensa',
    },
  ],
  [
    {
      value: 'DATE',
      description: 'Data',
    },
  ],
];

export const QUESTION_TYPE = {
  TITLE_AND_DESCRIPTION: {
    defaultValue: 'Sem título',
    value: 'TITLE_AND_DESCRIPTION',
  },
  QUESTION: { defaultValue: '', value: 'QUESTION' },
};
