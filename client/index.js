import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
// hot reloading. It works by replacing a module of the application 
// during runtime with an updated one so that it’s available for instant use.
module.hot.accept();
