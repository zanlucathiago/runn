const getPopulateOptions = () => [
  {
    path: 'questions',
    populate: [
      {
        path: 'options',
      },
      {
        path: 'validations',
      },
    ],
  },
  {
    path: 'form',
    populate: [
      {
        path: 'formResponses',
        populate: [
          {
            path: 'questionResponses',
            populate: [
              {
                path: 'question',
              },
            ],
          },
        ],
      },
    ],
  },
];

module.exports = {
  getPopulateOptions,
};
