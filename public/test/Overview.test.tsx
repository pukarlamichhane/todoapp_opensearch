import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Overview from '../pages/Overview/Overview';
import { store } from '../redux/store';
import * as todoService from '../redux/services/todoService';

describe('Overview Component', () => {
  it('should render the Overview component', () => {
    render(
      <Provider store={store}>
        <Overview />
      </Provider>
    );

    // Check for the presence of the specific date quick select button
    expect(screen.getByRole('button', { name: /date quick select/i }));

    // You can add more assertions here for other elements if needed
    expect(screen.getByText('Severity')); // Check for the Severity title
  });
});
