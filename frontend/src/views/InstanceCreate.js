import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import DsCircularProgress from '../components/DsCircularProgress';
import DsContainer from '../components/DsContainer';
import documentResource from '../features/documentResource';
import formResource from '../features/formResource';
import Question from '../question/Question';
import ResponseInput from '../question/ResponseInput';
import ResponseInputOption from '../question/ResponseInputOption';
import Section from '../section/Section';
import { Fab } from '@mui/material';

const processQuestionAnswer = (queryParams, updatedAnswers) => (question) => {
  const questionId = question._id;
  const questionAnswer = updatedAnswers[questionId];
  if (questionAnswer?.text) {
    queryParams[`entry.${questionId}`] = questionAnswer.text;
  }
};

const processSectionQuestions =
  (...params) =>
  (section) =>
    section.questions.forEach(processQuestionAnswer(...params));

const hasFormValidationExpression = (validation) => {
  return (
    validation.expression === 'DUPLICATE_FORM' &&
    validation.operator === 'NOT_EXISTS'
  );
};

const hasFormValidationInQuestion = (_id) => (question) => {
  return (
    question._id !== _id &&
    question.validations.some(hasFormValidationExpression)
  );
};

const hasFormValidationInSection =
  (...params) =>
  (section) =>
    section.questions.some(hasFormValidationInQuestion(...params));

export default function InstanceCreate() {
  const location = useLocation();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [sections, setSections] = useState([]);
  const [searchParams] = useSearchParams();
  const processForm = () =>
    formResource.processForm(id, searchParams).then(setAnswersAndSections);
  const setAnswersAndSections = ({ answers, sections }) => {
    setAnswers(answers);
    setSections(sections);
  };
  const onChange =
    ({ _id, primaryKey }) =>
    (value) => {
      const updatedAnswers = { ...answers, [_id]: value };
      if (primaryKey && sections.some(hasFormValidationInSection(_id))) {
        const queryParams = {};
        sections.forEach(processSectionQuestions(queryParams, updatedAnswers));
        navigate(`/d/e/${id}/view?${new URLSearchParams(queryParams)}`);
      } else {
        setAnswers(updatedAnswers);
      }
    };
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
      <DsCircularProgress action={processForm} key={location.search}>
        {sections.map((section, sectionIndex) => (
          <Section
            description={section.description}
            key={section._id}
            index={sectionIndex}
            title={section.title}
          >
            {section.questions.map((question) => (
              <Question
                description={question.description}
                key={question._id}
                model={question.model}
                title={question.title}
                type={question.type}
              >
                <ResponseInput
                  model={question.model}
                  onChange={onChange(question)}
                  validations={question.validations}
                  value={answers[question._id]}
                >
                  {question.options.map((option) => (
                    <ResponseInputOption
                      key={option._id}
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
