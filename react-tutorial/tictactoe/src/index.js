import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './components/grid';

class Game extends React.Component 
{
	render() 
	{
		return (
			<div className="game">
				<div className="game-board">
					<Grid numrows="3" numcols="5"/>
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
