import InputQuestion from './InputQuestion';
import DsCard from '../components/DsCard';
import { QUESTION_TYPE } from '../constants/contants';
import TitleQuestion from './TitleQuestion';

export default function Question({
  children,
  description,
  editable = false,
  model,
  onChange,
  onClick,
  onClickDelete,
  primaryKey,
  selected = false,
  title,
  type,
  length,
}) {
  return (
    <DsCard selected={selected} onClick={onClick}>
      {type === QUESTION_TYPE.QUESTION.value ? (
        <InputQuestion
          primaryKey={primaryKey}
          selected={selected}
          onChange={onChange}
          title={title}
          model={model}
          description={description}
          onClickDelete={onClickDelete}
          editable={editable}
          length={length}
        >
          {children}
        </InputQuestion>
      ) : (
        <TitleQuestion
          selected={selected}
          onChange={onChange}
          title={title}
          onClickDelete={onClickDelete}
          description={description}
        >
          {children}
        </TitleQuestion>
      )}
    </DsCard>
  );
}
