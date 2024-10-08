import React, { useState } from 'react';
import { EuiPopover, EuiButtonEmpty } from '@elastic/eui';
import './button.scss';

const Import = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);
  const button = (
    <EuiButtonEmpty iconType="download" iconSide="left" onClick={onButtonClick}></EuiButtonEmpty>
  );
  return (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      anchorPosition="downLeft"
    >
      <div className="import_pop">
        <EuiButtonEmpty iconType="download" iconSide="left">
          Export
        </EuiButtonEmpty>
        <EuiButtonEmpty iconType="download" iconSide="left">
          Import
        </EuiButtonEmpty>
      </div>
    </EuiPopover>
  );
};

export default Import;
