import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiSelect,
  EuiSwitch,
  EuiTitle,
} from '@elastic/eui';
import React, { useState } from 'react';
import Textfield from '../Textfield/Textfield';
import { useUpdateTaskMutation } from '../../redux/services/todoService';

interface Tprops {
  closeFlyout?: any;
  openFlyout?: any;
  data?: any;
}

export const Flyout = (props: Tprops) => {
  const [updatetask, setUpdateTask] = useState(props.data.task);
  const [updatedescription, setUpdateDescription] = useState(props.data.description);
  const [updatecheck, setUpdateChecked] = useState(props.data.complete);
  const [updateoptions, setUpdateOptions] = useState(props.data.severity);
  const [updattask] = useUpdateTaskMutation();

  const handleUpdate = async () => {
    if (updatetask.trim().length !== 0 && updatedescription.trim().length !== 0) {
      if (
        updatetask.length !== updatetask.trim().length ||
        updatedescription.length !== updatedescription.trim().length
      ) {
      } else {
        const response = {
          id: props.data.id,
          task: updatetask.trim(),
          description: updatedescription.trim(),
          complete: updatecheck,
          severity: updateoptions,
        };
        await updattask(response);
        props.closeFlyout();
      }
    }
  };

  const onChange = (e: any) => {
    setUpdateChecked(e.target.checked);
  };

  const updateOptions = (e: any) => {
    setUpdateOptions(e.target.value);
  };

  const options = [
    { value: 'Low', text: 'Low' },
    { value: 'Medium', text: 'Medium' },
    { value: 'High', text: 'High' },
    { value: 'Critical', text: 'Critical' },
  ];

  return (
    <EuiFlyout size={'l'} ownFocus onClose={props.closeFlyout} type="overlay">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>Update Todo</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody style={{ margin: '30px 70px 0px 70px' }}>
        <EuiFlexGroup direction="column">
          <EuiFlexItem>
            <EuiFlexGroup direction="row" justifyContent="spaceBetween">
              <EuiFlexItem>
                <EuiTitle size="m">
                  <h2 className="task-tittle">Task</h2>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexItem>
                <Textfield
                  passData={updatetask}
                  handlePassData={setUpdateTask}
                  placeholder={'Task1'}
                ></Textfield>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup direction="row" justifyContent="spaceBetween">
              <EuiFlexItem>
                <EuiTitle size="m">
                  <h2 className="task-tittle">Description</h2>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexItem>
                <Textfield
                  passData={updatedescription}
                  handlePassData={setUpdateDescription}
                  placeholder={'Description1'}
                ></Textfield>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup direction="row" justifyContent="spaceBetween">
              <EuiFlexItem>
                <EuiTitle size="m">
                  <h2 className="task-tittle">Complete</h2>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiSwitch
                  className="task-switch"
                  label={updatecheck ? 'True' : 'False'}
                  checked={updatecheck}
                  onChange={(e) => onChange(e)}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup direction="row" justifyContent="spaceBetween">
              <EuiFlexItem>
                <EuiTitle size="m">
                  <h2 className="task-tittle">Serverity</h2>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiSelect
                  placeholder="select1"
                  fullWidth
                  options={options}
                  value={updateoptions}
                  onChange={(e) => updateOptions(e)}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutBody>
      <EuiFlyoutFooter
        style={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <EuiButtonEmpty color="danger" onClick={props.closeFlyout}>
          Cancel
        </EuiButtonEmpty>
        <EuiButton color="primary" fill onClick={handleUpdate}>
          Update
        </EuiButton>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
};
