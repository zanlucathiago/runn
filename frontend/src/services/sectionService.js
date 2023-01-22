import { v4 as uuidv4 } from 'uuid';

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

export const handleAddQuestion = (sections, setSections, selected) => () => {
  setSections(
    sections.map((section, sectionIndex) =>
      sectionIndex === selected.sectionIndex
        ? {
            ...section,
            questions: [
              ...section.questions.slice(0, selected.questionIndex + 1),
              getNewQuestion(),
              ...section.questions.slice(
                selected.questionIndex + 1,
                section.questions.length
              ),
            ],
          }
        : section
    )
  );
};

export const getNewQuestion = () => ({
  anchorEl: null,
  description: '',
  id: uuidv4(),
  title: '',
});
