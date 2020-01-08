import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './components/grid';
import Announcement from './components/announcement';

class Game extends React.Component 
{
	constructor(props)
	{
		super(props);
		this.state = { xIsNext: true, announcementText: ""};
	}
	render() 
	{
		return (
			<div className="game">
				<div className="game-board">
					<Grid numrows="3" numcols="3" oncellactivate={ (event) => { return this.handleCellActivate(event); }}/>
				<Announcement text={this.state.announcementText} />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
	handleCellActivate(event)
	{
		const xIsNext = this.state.xIsNext;
		const cellContent = xIsNext ? "X" : "O";
		let announcementText = xIsNext ? "Placed X, next turn: O." : "Placed O, next turn: X.";
		this.setState({ xIsNext: !xIsNext, announcementText: announcementText});
		return cellContent;
	}
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
