import { useState } from 'react';
import DsContainer from '../components/DsContainer';
import MainMenu from '../menu/MainMenu';
import Question from '../question/Question';
import Section from '../section/Section';
import {
  getAnchorElement,
  getNewSection,
  handleAddQuestion,
  handleChangeQuestion,
  handleChangeOption,
  handleClickDelete,
} from '../services/sectionService';
import DsCircularProgress from '../components/DsCircularProgress';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import TemplateInput from '../question/TemplateInput';
import TemplateOption from '../question/TemplateOption';
import DsTextField from '../components/DsTextField';
import formResource from '../features/formResource';
import Validations from './Validations';

function FormEdit() {
  const { id } = useParams();
  const [sections, setSections] = useState([]);
  const [selected, setSelected] = useState({
    sectionIndex: 0,
    questionIndex: -1,
  });
  const isSelected = (sectionIndex, questionIndex) =>
    sectionIndex === selected.sectionIndex &&
    selected.questionIndex === questionIndex;
  const processForm = () => formResource.processForm(id).then(setSectionsData);
  const setSectionsData = ({ sections }) => {
    setSections(sections);
  };
  const onAddQuestion = handleAddQuestion(sections, setSections, selected);
  const handleAddSection = () => {
    setSections([
      ...sections.slice(0, selected.sectionIndex + 1),
      getNewSection(),
      ...sections.slice(selected.sectionIndex + 1, sections.length),
    ]);
  };
  const onClickAdd = () => {
    setSections(
      sections.map((section, sectionIndex) => ({
        ...section,
        questions: section.questions.map((question, questionIndex) => ({
          ...question,
          options:
            selected.sectionIndex === sectionIndex &&
            selected.questionIndex === questionIndex
              ? [
                  ...question.options,
                  { text: `Opção ${question.options.length + 1}` },
                ]
              : question.options,
        })),
      }))
    );
  };
  const onClickOther = (sectionIndex, questionIndex) => () =>
    setSections(
      sections.map((section, sIndex) => ({
        ...section,
        questions: section.questions.map((question, qIndex) =>
          sIndex === sectionIndex && qIndex === questionIndex
            ? {
                ...question,
                other: !question.other,
              }
            : question
        ),
      }))
    );
  const onClickSave = () =>
    formResource.updateForm(sections, id).then((data) => {
      return setSections(data);
    });
  const updateSectionProperty = (prop, sectionIndex, value) => {
    setSections(
      sections.map((section, index) => ({
        ...section,
        [prop]: sectionIndex === index ? value : section[prop],
      }))
    );
  };
  const handleChange = (sectionIndex) => (prop) => (event) => {
    updateSectionProperty(prop, sectionIndex, event.target.value);
  };
  const onChangeQuestion = handleChangeQuestion(sections, setSections);
  const handleClick = (sectionIndex, questionIndex) => (event) => {
    if (questionIndex === -1) {
      updateSectionProperty('anchorEl', sectionIndex, event.currentTarget);
    } else {
      onChangeQuestion(sectionIndex, questionIndex)('anchorEl')({
        target: { value: event.currentTarget },
      });
    }
    setSelected({
      sectionIndex,
      questionIndex,
    });
  };
  const onClickDelete = handleClickDelete(setSelected, setSections, sections);
  const onChangeOption = handleChangeOption(sections, setSections);
  const handleDelete = (sectionIndex) => (event) => {
    event.stopPropagation();
    setSelected({
      sectionIndex:
        sectionIndex === selected.sectionIndex &&
        sectionIndex + 1 === sections.length
          ? selected.sectionIndex - 1
          : selected.sectionIndex,
      questionIndex: -1,
    });
    setSections(sections.filter((_section, index) => index !== sectionIndex));
  };
  const onClickRemove = (optionIndex) => () =>
    setSections(
      sections.map((section, sIndex) => ({
        ...section,
        questions: section.questions.map((question, qIndex) => ({
          ...question,
          options:
            selected.sectionIndex === sIndex &&
            selected.questionIndex === qIndex
              ? question.options.filter(
                  (option, oIndex) => oIndex !== optionIndex
                )
              : question.options,
        })),
      }))
    );
  const onChangeValidations = (sectionIndex, questionIndex) => (value) =>
    setSections(
      sections.map((section, sIndex) => ({
        ...section,
        questions: section.questions.map((question, qIndex) => ({
          ...question,
          validations:
            qIndex === questionIndex && sIndex === sectionIndex
              ? value
              : question.validations,
        })),
      }))
    );
  const anchorEl = getAnchorElement(sections, selected);
  return (
    <DsContainer maxWidth="md" onClick={onClickSave}>
      <DsCircularProgress action={processForm}>
        {sections.length ? (
          <>
            {sections.map(
              ({ description, id, questions, title, _id }, sectionIndex) => (
                <Section
                  description={description}
                  editable
                  key={_id || id}
                  length={sections.length}
                  index={sectionIndex}
                  onChange={handleChange(sectionIndex)}
                  onClick={handleClick(sectionIndex, -1)}
                  onDelete={handleDelete(sectionIndex)}
                  selected={isSelected(sectionIndex, -1)}
                  title={title}
                >
                  {questions.map((question, questionIndex) => (
                    <Question
                      description={question.description}
                      primaryKey={question.primaryKey}
                      editable
                      key={question._id || question.id}
                      model={question.model}
                      onChange={onChangeQuestion(sectionIndex, questionIndex)}
                      onClick={handleClick(sectionIndex, questionIndex)}
                      onClickDelete={onClickDelete(sectionIndex, questionIndex)}
                      selected={isSelected(sectionIndex, questionIndex)}
                      title={question.title}
                      type={question.type}
                      length={
                        question.validations ? question.validations.length : 0
                      }
                    >
                      <TemplateInput
                        length={question.options.length}
                        onClickAdd={onClickAdd}
                        onClickOther={onClickOther(sectionIndex, questionIndex)}
                        selected={isSelected(sectionIndex, questionIndex)}
                        model={question.model}
                        other={question.other}
                      >
                        {question.options.map((option, optionIndex) => (
                          <TemplateOption
                            index={optionIndex}
                            key={option._id || option.id}
                            onClick={onClickRemove(optionIndex)}
                            selected={isSelected(sectionIndex, questionIndex)}
                            model={question.model}
                            text={option.text}
                          >
                            {isSelected(sectionIndex, questionIndex) ? (
                              <DsTextField
                                size="small"
                                onChange={onChangeOption(
                                  sectionIndex,
                                  questionIndex,
                                  optionIndex
                                )}
                                variant="standard"
                                value={option.text}
                              />
                            ) : (
                              <Typography>{option.text}</Typography>
                            )}
                          </TemplateOption>
                        ))}
                      </TemplateInput>
                      {isSelected(sectionIndex, questionIndex) ? (
                        <Validations
                          onChange={onChangeValidations(
                            sectionIndex,
                            questionIndex
                          )}
                          validations={question.validations}
                        />
                      ) : null}
                    </Question>
                  ))}
                </Section>
              )
            )}
            <MainMenu
              anchorEl={anchorEl}
              onAddQuestion={onAddQuestion}
              onAddSection={handleAddSection}
            />
          </>
        ) : null}
      </DsCircularProgress>
    </DsContainer>
  );
}

export default FormEdit;
