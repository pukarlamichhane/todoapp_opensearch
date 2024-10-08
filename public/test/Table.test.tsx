import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Table from '../pages/Table/Table';
import { todoApi } from '../redux/services/todoService';

// Setup store
const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
});

describe('Table Component', () => {
  it('adds a new task', async () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Task'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'New Description' },
    });
    fireEvent.change(screen.getByPlaceholderText('Select'), {
      target: { value: 'Low' },
    });
    fireEvent.click(screen.getByText('Add task'));
  });

  it('adds a small value task', async () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Task'), { target: { value: 'Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Description' },
    });
    fireEvent.change(screen.getByPlaceholderText('Select'), {
      target: { value: 'Critical' },
    });
    fireEvent.click(screen.getByText('Add task'));
  });

  it('adds a many value in task', async () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Task'), {
      target: { value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
    });
    fireEvent.change(screen.getByPlaceholderText('Select'), {
      target: { value: 'High' },
    });
    fireEvent.click(screen.getByText('Add task'));
  });

  it('Update Medium', async () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    // Wait for the 'Edit' label to be in the document
    const editLabels = await waitFor(() => screen.getAllByLabelText('Edit'));
    expect(editLabels.length).toBeGreaterThan(0); // Ensure at least one Edit label exists

    // Select the first 'Edit' label
    const editLabel = editLabels[0]; // Select the first occurrence

    // Simulate clicking on the 'Edit' label
    fireEvent.click(editLabel);

    // Example: Updating task input
    fireEvent.change(screen.getByPlaceholderText('Task1'), {
      target: { value: 'Taskaaaaaaaaaaa' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description1'), {
      target: { value: 'Descriptionaaaaaaaaaaaa' },
    });
    fireEvent.change(screen.getByPlaceholderText('select1'), {
      target: { value: 'Medium' },
    });

    // Click on the 'Add task' button
    fireEvent.click(screen.getByText('Update'));
  });

  it('Update small', async () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    // Wait for the 'Edit' label to be in the document
    const editLabels = await waitFor(() => screen.getAllByLabelText('Edit'));
    expect(editLabels.length).toBeGreaterThan(0); // Ensure at least one Edit label exists

    // Select the first 'Edit' label
    const editLabel = editLabels[0]; // Select the first occurrence

    // Simulate clicking on the 'Edit' label
    fireEvent.click(editLabel);

    // Example: Updating task input
    fireEvent.change(screen.getByPlaceholderText('Task1'), { target: { value: 'Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description1'), {
      target: { value: 'Description' },
    });
    fireEvent.change(screen.getByPlaceholderText('select1'), {
      target: { value: 'Medium' },
    });

    // Click on the 'Add task' button
    fireEvent.click(screen.getByText('Update'));
  });

  it('Update large data', async () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    // Wait for the 'Edit' label to be in the document
    const editLabels = await waitFor(() => screen.getAllByLabelText('Edit'));
    expect(editLabels.length).toBeGreaterThan(0); // Ensure at least one Edit label exists

    // Select the first 'Edit' label
    const editLabel = editLabels[0]; // Select the first occurrence

    // Simulate clicking on the 'Edit' label
    fireEvent.click(editLabel);

    // Example: Updating task input
    fireEvent.change(screen.getByPlaceholderText('Task1'), {
      target: { value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description1'), {
      target: { value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
    });
    fireEvent.change(screen.getByPlaceholderText('select1'), {
      target: { value: 'Critical' },
    });

    // Click on the 'Add task' button
    fireEvent.click(screen.getByText('Update'));
  });

  it('delete data', async () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const deleteButtons = await waitFor(() => screen.getAllByText(/Delete/i));

    // Ensure that at least one delete button exists
    expect(deleteButtons.length).toBeGreaterThan(0);
    const editLabel = deleteButtons[0]; // Select the first occurrence

    fireEvent.click(editLabel);
  });
});
