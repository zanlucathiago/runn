import { v4 as uuidv4 } from 'uuid';
import { MODELS, QUESTION_TYPE } from '../constants/contants';

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

export const handleChangeOption =
  (sections, setSections) =>
  (sectionIndex, questionIndex, optionIndex) =>
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
                      options: question.options.map((option, oIndex) =>
                        oIndex === optionIndex
                          ? {
                              text: event.target.value,
                            }
                          : option
                      ),
                    }
                  : question
              ),
            }
          : section
      )
    );
  };

export const handleAddQuestion =
  (sections, setSections, selected) => (type) => () => {
    setSections(
      sections.map((section, sectionIndex) =>
        sectionIndex === selected.sectionIndex
          ? {
              ...section,
              questions: [
                ...section.questions.slice(0, selected.questionIndex + 1),
                getNewQuestion(type),
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

export const getNewQuestion = (type) => ({
  anchorEl: null,
  description: '',
  id: uuidv4(),
  model: MODELS.MULTIPLE_CHOICE.value,
  title: QUESTION_TYPE[type].defaultValue,
  type,
});

export const getAnchorElement = (sections, selected) =>
  sections[selected.sectionIndex] &&
  (selected.questionIndex === -1
    ? sections[selected.sectionIndex].anchorEl
    : sections[selected.sectionIndex].questions[selected.questionIndex]
        .anchorEl);

export const handleClickDelete =
  (setSelected, setSections, sections) =>
  (sectionIndex, questionIndex) =>
  () => {
    setSelected({
      sectionIndex,
      questionIndex: questionIndex - 1,
    });
    setSections(
      sections.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              questions: section.questions.filter(
                (_question, qIndex) => qIndex !== questionIndex
              ),
            }
          : section
      )
    );
  };

export const getNewSection = () => ({
  anchorEl: null,
  description: '',
  id: uuidv4(),
  questions: [],
  title: '',
});
