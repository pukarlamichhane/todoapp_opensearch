import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like

import { HelloWorldComponent } from './HelloWord'; // Adjust the import path as

describe('HelloWorldComponent', () => {
  it('renders the default "Hello World!!!" message', () => {
    // Render the component without passing a name prop
    const { getByText } = render(<HelloWorldComponent />);
    // Assert that "Hello World!!!" is in the document
    expect(getByText('Hello World!!!')).toBeInTheDocument();
  });
  it('renders with a provided name prop', () => {
    // Render the component with the name prop
    const { getByText } = render(<HelloWorldComponent name="John Doe" />);
    // Assert that "Hello World!!!" is in the document
    expect(getByText('Hello World!!!')).toBeInTheDocument();
    // Assert that the provided name is displayed
    expect(getByText('John Doe')).toBeInTheDocument();
  });
});
