import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import DsCircularProgress from '../components/DsCircularProgress';
import DsContainer from '../components/DsContainer';
import documentResource from '../features/documentResource';
import formResource from '../features/formResource';
import Question from '../question/Question';
import ResponseInput from '../question/ResponseInput';
import ResponseInputOption from '../question/ResponseInputOption';
import Section from '../section/Section';
import { Fab } from '@mui/material';

export default function InstanceCreate() {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [sections, setSections] = useState([]);
  const [searchParams] = useSearchParams();
  const getForm = () =>
    formResource.getForm(id, searchParams).then(setAnswersAndSections);
  const setAnswersAndSections = ({ answers, sections }) => {
    setAnswers(answers);
    setSections(sections);
  };
  const onChange = (questionId) => (value) =>
    setAnswers({ ...answers, [questionId]: value });
  const handleClick = () => documentResource.createDocument(id, answers);
  return (
    <DsContainer maxWidth="sm" onClick={handleClick}>
      <Fab
        color="secondary"
        href={`/d/${id}/edit`}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <EditIcon />
      </Fab>
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
                  value={answers[question._id]}
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
