import React from 'react';
import { ElementButton } from 'payload/components/rich-text';

const baseClass = 'rich-text-large-body-button';

const ToolbarButton: React.FC<{ path: string }> = () => (
  <ElementButton
    className={baseClass}
    format="code-block"
  >
    code
  </ElementButton>
);

export default ToolbarButton;