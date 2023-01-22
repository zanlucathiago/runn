import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import DsContainer from './components/DsContainer';
import MainMenu from './menu/MainMenu';
import Question from './question/Question';
import Section from './section/Section';
import {
  handleAddQuestion,
  handleChangeQuestion,
} from './services/sectionService';

const getNewSection = () => ({
  anchorEl: null,
  description: '',
  id: uuidv4(),
  questions: [],
  title: '',
});

function App() {
  const [sections, setSections] = useState([getNewSection()]);

  const [selected, setSelected] = useState({
    sectionIndex: 0,
    questionIndex: -1,
  });

  const onAddQuestion = handleAddQuestion(sections, setSections, selected);

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
              key={question.id}
              onChange={onChangeQuestion(sectionIndex, questionIndex)}
              onClick={handleClick(sectionIndex, questionIndex)}
              selected={
                sectionIndex === selected.sectionIndex &&
                questionIndex === selected.questionIndex
              }
              title={question.title}
              type={question.type}
            />
          ))}
        </Section>
      ))}
      <MainMenu
        anchorEl={
          sections[selected.sectionIndex] && selected.questionIndex === -1
            ? sections[selected.sectionIndex].anchorEl
            : sections[selected.sectionIndex].questions[selected.questionIndex]
                .anchorEl
        }
        onAddQuestion={onAddQuestion}
        onAddSection={handleAddSection}
      />
    </DsContainer>
  );
}

export default App;
