import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { IconButton, Tab, Tabs } from '@mui/material';
import DsAppBar from '../components/DsAppBar';
import FormEdit from './FormEdit';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormResponses from './FormResponses';
import FormValidations from './FormValidations';

export default function FormView() {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const onChangeTab = (e, value) => setCurrentTab(value);
  const tabView = [<FormEdit />, <FormResponses />, <FormValidations />];
  return (
    <>
      <DsAppBar>
        <Tabs
          onChange={onChangeTab}
          value={currentTab}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Campos" />
          <Tab label="Lançamentos" />
        </Tabs>
        <IconButton href={`/d/e/${id}/view`} target="_blank">
          <RemoveRedEyeOutlinedIcon sx={{ color: '#FFF' }} />
        </IconButton>
      </DsAppBar>
      {tabView[currentTab]}
    </>
  );
}
