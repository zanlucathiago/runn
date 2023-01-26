import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DsAppBar from '../components/DsAppBar';
import DsCircularProgress from '../components/DsCircularProgress';
import DsContainer from '../components/DsContainer';
import formService from '../features/formService';
import Question from '../question/Question';
import ResponseInput from '../question/ResponseInput';
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
              index={sectionIndex}
              title={section.title}
            >
              {section.questions.map((question) => (
                <Question
                  description={question.description}
                  key={question.id}
                  model={question.model}
                  title={question.title}
                  type={question.type}
                >
                  <ResponseInput model={question.model} />
                </Question>
              ))}
            </Section>
          ))}
        </DsCircularProgress>
      </DsContainer>
    </>
  );
}
