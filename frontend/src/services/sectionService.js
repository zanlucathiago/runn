export const handleChangeQuestion =
  (sections, setSections) =>
  (sectionIndex, questionIndex) =>
  (prop) =>
  (event) => {
    setSections(
      sections.map((section, sIndex) =>
        sectionIndex === sIndex
          ? {
              ...section,
              questions: section.questions.map((question, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...question,
                      [prop]: event.target.value,
                    }
                  : question
              ),
            }
          : section
      )
    );
  };
