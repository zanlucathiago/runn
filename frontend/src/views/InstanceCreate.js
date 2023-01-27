import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DsAppBar from '../components/DsAppBar';
import DsCircularProgress from '../components/DsCircularProgress';
import DsContainer from '../components/DsContainer';
import formService from '../features/formService';
import Question from '../question/Question';
import ResponseInput from '../question/ResponseInput';
import ResponseInputOption from '../question/ResponseInputOption';
import Section from '../section/Section';

export default function InstanceCreate() {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [sections, setSections] = useState([]);
  const getForm = () => formService.getForm(id).then(setSections);
  const onChange = (questionId) => (value) =>
    setAnswers({ ...answers, [questionId]: value });
  return (
    <>
      <DsAppBar onClick={() => {}} text="Salvar" />
      <DsContainer maxWidth="sm">
        <DsCircularProgress action={getForm}>
          {sections.map((section, sectionIndex) => (
            <Section
              description={section.description}
              key={sectionIndex}
              index={sectionIndex}
              title={section.title}
            >
              {section.questions.map((question, questionIndex) => (
                <Question
                  description={question.description}
                  key={questionIndex}
                  model={question.model}
                  title={question.title}
                  type={question.type}
                >
                  <ResponseInput
                    model={question.model}
                    onChange={onChange(question._id)}
                  >
                    {question.options.map((option, optionIndex) => (
                      <ResponseInputOption
                        key={optionIndex}
                        model={question.model}
                        value={option._id}
                      >
                        {option.text}
                      </ResponseInputOption>
                    ))}
                  </ResponseInput>
                </Question>
              ))}
            </Section>
          ))}
        </DsCircularProgress>
      </DsContainer>
    </>
  );
}
