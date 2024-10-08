import React, { useEffect, useState } from 'react';

import './table.scss';
import {
  EuiButton,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBadge,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiForm,
  EuiConfirmModal,
  EuiSelect,
  Criteria,
} from '@elastic/eui';

import ToastMessage from '../../shared-components/Toast/Toast';
import TableMessage from '../../shared-components/tableMessage/TableMessage';
import Textfield from '../../shared-components/Textfield/Textfield';
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
} from '../../redux/services/todoService';
import { Flyout } from '../../shared-components/flyout/Flyout';

interface todo {
  id: number;
  task: string;
  description: string;
  complete: boolean;
  createat: Date;
  updateat: Date;
  status: boolean;
  severity: string;
}

const Table = () => {
  const [todos, settodos] = useState<any>([]);
  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const closeModal = () => setIsDestroyModalVisible(false);

  const [newtitle, setTitle] = useState<string | undefined>();
  const [newdescription, setdescription] = useState<string | undefined>();
  const [Itemdelete, setItemDelete] = useState<number | undefined>();
  const [allUpdateData, setAllUpdateData] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [errorMessageDesc, setErrorMessageDesc] = useState<string | undefined>();

  const options = [
    { value: 'Low', text: 'Low' },
    { value: 'Medium', text: 'Medium' },
    { value: 'High', text: 'High' },
    { value: 'Critical', text: 'Critical' },
  ];

  const [value, setValue] = useState(options[1].value);

  const onTableChange = ({ page }: Criteria<todo>) => {
    if (page) {
      setPageIndex(page.index);
      setPageSize(page.size);
    }
  };

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount: todos.length,
    pageSizeOptions: [5, 10, 20],
    showPerPageOptions: true,
  };

  const pageOfItems =
    pageSize === 0
      ? todos
      : todos.slice(pageIndex * pageSize, Math.min(pageIndex * pageSize + pageSize, todos.length));

  const Handleaddtask = async () => {
    // Check if newtitle and newdescription are defined before using .trim()
    const trimmedTitle = newtitle?.trim() || '';
    const trimmedDescription = newdescription?.trim() || '';

    if (trimmedTitle.length === 0 && trimmedDescription.length === 0) {
      setErrorMessage('Enter a value for both title and description');
      setErrorMessageDesc('Enter a value for both title and description');
    } else if (trimmedTitle.length === 0) {
      setErrorMessage('Enter a value for title');
      setErrorMessageDesc('');
    } else if (trimmedDescription.length === 0) {
      setErrorMessage('');
      setErrorMessageDesc('Enter a value for description');
    } else if (
      newtitle &&
      newdescription &&
      (newtitle.length !== trimmedTitle.length ||
        newdescription.length !== trimmedDescription.length)
    ) {
      setErrorMessage(
        newtitle.length !== trimmedTitle.length
          ? 'Please remove leading or trailing spaces from title'
          : ''
      );
      setErrorMessageDesc(
        newdescription.length !== trimmedDescription.length
          ? 'Please remove leading or trailing spaces from description'
          : ''
      );
    } else {
      const task = {
        task: newtitle,
        description: newdescription,
        severity: value, // Assuming 'value' is defined somewhere in your code
      };

      await addtask(task);
      setTitle(''); // Reset title
      setdescription(''); // Reset description
      setErrorMessage(''); // Clear error messages
      setErrorMessageDesc('');
    }
  };

  const oChange = (e: any) => {
    setValue(e.target.value);
  };

  const deleteTodos = (id: number) => {
    console.log(id);
    setItemDelete(id);
  };

  const DTodos = async () => {
    console.log(Itemdelete);
    await deletetask(Itemdelete);
    setIsDestroyModalVisible(false);
  };

  const { data, isLoading, isError } = useGetTaskQuery('');

  const [addtask] = useAddTaskMutation();
  const [deletetask] = useDeleteTaskMutation();

  const handleEdit = (data: any) => {
    setIsFlyoutVisible(true);
    setAllUpdateData(data);
  };

  useEffect(() => {
    if (data) {
      settodos(data);
    }
  }, [data]);

  const severityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'primary';
      case 'High':
        return 'warning';
      case 'Critical':
        return 'danger';
      default:
        return 'default';
    }
  };

  const columns: Array<EuiBasicTableColumn<todo>> = [
    {
      field: 'task',
      name: 'Task',
    },
    {
      field: 'description',
      name: 'Description',
    },
    {
      field: 'complete',
      name: 'Complete',
      render: (complete: todo['complete']) => {
        const color = complete ? 'success' : 'danger';
        const label = complete ? 'True' : 'False';
        return (
          <EuiBadge style={{ color: '#fff' }} color={color}>
            {label.toLowerCase()}
          </EuiBadge>
        );
      },
    },
    {
      field: 'severity',
      name: 'Severity',

      render: (serverity: todo['severity']) => {
        const color = severityColor(serverity);
        const label = serverity;
        return <EuiBadge color={color}>{label}</EuiBadge>;
      },
    },
    {
      name: 'Action',
      actions: [
        {
          name: 'Edit',
          description: 'Edit',
          type: 'icon',
          icon: 'pencil',
          onClick: (data: any) => {
            handleEdit(data);
          },
        },
        {
          name: 'Delete',
          description: 'Delete',
          type: 'icon',
          icon: 'trash',

          onClick: ({ id }) => {
            deleteTodos(id);
            setIsDestroyModalVisible(true);
          },
        },
      ],
    },
  ];

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  return (
    <>
      {isFlyoutVisible && <Flyout closeFlyout={closeFlyout} data={allUpdateData} />}
      <EuiPage restrictWidth="1000px">
        <EuiPageBody component="main" style={{ gap: '10px' }}>
          <EuiPageContent>
            <EuiPageContentBody>
              <EuiForm>
                <EuiFlexGroup direction="column">
                  <EuiFlexItem>
                    <EuiFlexGroup className="table-group1">
                      <EuiFlexItem>
                        <Textfield
                          passData={newtitle}
                          handlePassData={setTitle}
                          placeholder={'Task'}
                        ></Textfield>
                      </EuiFlexItem>

                      <EuiFlexItem>
                        <Textfield
                          passData={newdescription}
                          handlePassData={setdescription}
                          placeholder={'Description'}
                        ></Textfield>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiFlexItem>

                  <EuiFlexItem>
                    <EuiFlexGroup className="table-group2" justifyContent="spaceBetween">
                      <EuiFlexItem className="table-select">
                        <EuiSelect
                          placeholder="Select"
                          options={options}
                          value={value}
                          onChange={(e) => oChange(e)}
                        />
                      </EuiFlexItem>

                      <EuiFlexItem grow={false}>
                        <EuiButton
                          style={{ width: '100px', fontSize: '15px' }}
                          fill
                          onClick={Handleaddtask}
                        >
                          Add task
                        </EuiButton>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiForm>
            </EuiPageContentBody>

            {isDestroyModalVisible && (
              <EuiConfirmModal
                title="Discard dashboard changes?"
                onCancel={closeModal}
                onConfirm={DTodos}
                cancelButtonText="No"
                confirmButtonText="Yes"
                buttonColor="danger"
                defaultFocusedButton="confirm"
              >
                <p>You will lose all unsaved changes made to this dashboard.</p>
              </EuiConfirmModal>
            )}
          </EuiPageContent>

          <EuiPageContent>
            <EuiBasicTable
              className="table-table"
              loading={isLoading}
              items={pageOfItems}
              columns={columns}
              noItemsMessage={isLoading || isError ? 'Loading......' : <TableMessage />}
              pagination={pagination}
              onChange={onTableChange}
            ></EuiBasicTable>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
      <ToastMessage />
    </>
  );
};

export default Table;
