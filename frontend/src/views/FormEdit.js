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
  handleClickDelete,
} from '../services/sectionService';
import formService from '../features/formService';
import DsAppBar from '../components/DsAppBar';
import DsCircularProgress from '../components/DsCircularProgress';
import { useParams } from 'react-router-dom';

function FormEdit() {
  const { id } = useParams();
  const [sections, setSections] = useState([getNewSection()]);
  const [selected, setSelected] = useState({
    sectionIndex: 0,
    questionIndex: -1,
  });
  const isSelected = (sectionIndex, questionIndex) =>
    sectionIndex === selected.sectionIndex &&
    selected.questionIndex === questionIndex;
  const getForm = () => formService.getForm(id).then(setSections);
  const onAddQuestion = handleAddQuestion(sections, setSections, selected);
  const handleAddSection = () => {
    setSections([
      ...sections.slice(0, selected.sectionIndex + 1),
      getNewSection(),
      ...sections.slice(selected.sectionIndex + 1, sections.length),
    ]);
  };
  const onClickSave = formService.saveForm(sections);
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

  return (
    <>
      <DsAppBar onClick={onClickSave} text="Salvar" />
      <DsContainer>
        <DsCircularProgress action={getForm}>
          {sections.length
            ? [
                sections.map(
                  ({ description, id, questions, title }, sectionIndex) => (
                    <Section
                      description={description}
                      key={id}
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
                          key={question.id}
                          model={question.model}
                          onChange={onChangeQuestion(
                            sectionIndex,
                            questionIndex
                          )}
                          onClick={handleClick(sectionIndex, questionIndex)}
                          onClickDelete={onClickDelete(
                            sectionIndex,
                            questionIndex
                          )}
                          selected={isSelected(sectionIndex, questionIndex)}
                          title={question.title}
                          type={question.type}
                        />
                      ))}
                    </Section>
                  )
                ),
                <MainMenu
                  anchorEl={getAnchorElement(sections, selected)}
                  onAddQuestion={onAddQuestion}
                  onAddSection={handleAddSection}
                />,
              ]
            : null}
        </DsCircularProgress>
      </DsContainer>
    </>
  );
}

export default FormEdit;
