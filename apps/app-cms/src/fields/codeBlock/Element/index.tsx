import React from 'react';

// import './index.scss';

const baseClass = 'rich-text-large-body';

const CodeBlockElement: React.FC<{ attributes: any, element: any, children?: React.ReactNode }> = ({ attributes, children }) => (
	<span
		{...attributes}
	>
		<div style={{border: '1px solid rgba(255, 255, 255, 0.2)', marginBottom: 8}}>
            <code style={{fontFamily: 'IBM Plex Mono, Consolas'}}>{children}</code>
        </div>
	</span>
);
export default CodeBlockElement;