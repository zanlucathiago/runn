import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DsAppBar from '../components/DsAppBar';
import DsCircularProgress from '../components/DsCircularProgress';
import DsContainer from '../components/DsContainer';
import formService from '../features/formService';
import Question from '../question/Question';
import Section from '../section/Section';

export default function InstanceCreate() {
  const { id } = useParams();
  const [sections, setSections] = useState([]);
  const getForm = () => formService.getForm(id).then(setSections);
  return (
    <>
      <DsAppBar onClick={() => {}} text="Salvar" />
      <DsContainer>
        <DsCircularProgress action={getForm}>
          {sections.map((section, sectionIndex) => (
            <Section
              description={section.description}
              key={section.id}
              // length={sections.length}
              index={sectionIndex}
              // onChange={handleChange(sectionIndex)}
              // onClick={handleClick(sectionIndex, -1)}
              // onDelete={handleDelete(sectionIndex)}
              // selected={isSelected(sectionIndex, -1)}
              title={section.title}
            >
              {section.questions.map((question) => (
                <Question
                  description={question.description}
                  key={question.id}
                  model={question.model}
                  // onChange={onChangeQuestion(sectionIndex, questionIndex)}
                  // onClick={handleClick(sectionIndex, questionIndex)}
                  // onClickDelete={onClickDelete(sectionIndex, questionIndex)}
                  // selected={isSelected(sectionIndex, questionIndex)}
                  title={question.title}
                  type={question.type}
                />
              ))}
            </Section>
          ))}
        </DsCircularProgress>
      </DsContainer>
    </>
  );
}
