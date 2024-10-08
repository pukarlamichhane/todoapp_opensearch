import React from 'react';
interface HellowWorldProps {
  name?: string;
}
// Fixed the component name to follow naming conventions
function HelloWorldComponent({ name }: HellowWorldProps) {
  return (
    <>
      <div>Hello World!!!</div>
      <div>{name}</div>
    </>
  );
}
// Correctly export the component as a named export
export { HelloWorldComponent };
