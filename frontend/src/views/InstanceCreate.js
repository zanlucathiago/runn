import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DsCircularProgress from '../components/DsCircularProgress';
import DsContainer from '../components/DsContainer';
import documentResource from '../features/documentResource';
import formResource from '../features/formResource';
import Question from '../question/Question';
import ResponseInput from '../question/ResponseInput';
import ResponseInputOption from '../question/ResponseInputOption';
import Section from '../section/Section';

export default function InstanceCreate() {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [sections, setSections] = useState([]);
  const getForm = () => formResource.getForm(id).then(setSections);
  const onChange = (questionId) => (value) =>
    setAnswers({ ...answers, [questionId]: value });
  const handleClick = () => documentResource.createDocument(id, answers);
  return (
    <DsContainer maxWidth="sm" onClick={handleClick}>
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
  );
}
