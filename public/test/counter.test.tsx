import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Corrected import
import { Counter } from '../components/counter';

describe('Counter Component', () => {
  it('should render with initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
  });

  it('should increment the counter when increment button is clicked', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('1');
  });

  it('should decrement the counter when decrement button is clicked', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('Decrement'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('-1');
  });
});
