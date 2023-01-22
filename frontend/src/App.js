import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import DsContainer from './components/DsContainer';
import MainMenu from './menu/MainMenu';
import Question from './question/Question';
import Section from './section/Section';
import { handleChangeQuestion } from './services/sectionService';

const getNewQuestion = () => ({
  description: '',
  title: '',
});

const getNewSection = () => ({
  anchorEl: null,
  description: '',
  id: uuidv4(),
  questions: [getNewQuestion(), getNewQuestion()],
  title: '',
});

function App() {
  const [sections, setSections] = useState([getNewSection()]);

  const [selected, setSelected] = useState({
    sectionIndex: 0,
    questionIndex: -1,
  });

  const handleAddQuestion = () => {
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

  const handleAddSection = () => {
    setSections([
      ...sections.slice(0, selected.sectionIndex + 1),
      getNewSection(),
      ...sections.slice(selected.sectionIndex + 1, sections.length),
    ]);
  };

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
    updateSectionProperty('anchorEl', sectionIndex, event.currentTarget);
    setSelected({
      sectionIndex,
      questionIndex,
    });
  };

  const handleDelete = (sectionIndex) => (event) => {
    event.preventDefault();
    event.stopPropagation();

    setSelected({
      sectionIndex:
        sectionIndex + 1 === sections.length
          ? selected.sectionIndex - 1
          : selected.sectionIndex,
      questionIndex: -1,
    });
    setSections(sections.filter((_section, index) => index !== sectionIndex));
  };

  return (
    <DsContainer>
      {sections.map(({ description, id, questions, title }, sectionIndex) => (
        <Section
          description={description}
          key={id}
          length={sections.length}
          index={sectionIndex}
          onChange={handleChange(sectionIndex)}
          onClick={handleClick(sectionIndex, -1)}
          onDelete={handleDelete(sectionIndex)}
          selected={
            sectionIndex === selected.sectionIndex &&
            selected.questionIndex === -1
          }
          title={title}
        >
          {questions.map((question, questionIndex) => (
            <Question
              description={question.description}
              onChange={onChangeQuestion(sectionIndex, questionIndex)}
              onClick={handleClick(sectionIndex, questionIndex)}
              selected={
                sectionIndex === selected.sectionIndex &&
                questionIndex === selected.questionIndex
              }
              title={question.title}
            />
          ))}
        </Section>
      ))}
      <MainMenu
        anchorEl={
          sections[selected.sectionIndex] &&
          sections[selected.sectionIndex].anchorEl
        }
        onAddQuestion={handleAddQuestion}
        onAddSection={handleAddSection}
      />
    </DsContainer>
  );
}

export default App;
