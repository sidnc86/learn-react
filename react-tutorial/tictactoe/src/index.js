import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {
	render() {
		return (
			<div role="gridcell" 
				aria-roledescription="cellButton"
				id={ () => { return "cell-" + this.props.rowIndex + "-" + this.props.cellIndex}}>
				<button className="square" tabIndex="-1" 
				aria-selected={() => {return this.props.activeCell == "cell-" + this.props.rowIndex + "-" + this.props.cellIndex ? "true" : "false"; }}>
					{/* TODO */}
				</button>
			</div>
		);
	}
}
class Row extends React.Component {
	renderSquare(rowIndex, cellIndex) {
		return (
			<Square cellIndex={cellIndex} rowIndex={rowIndex}
			activeCell={this.props.activeCell} />
		);
	}
	render() {
		return (
			<div className="board-row" role="row" id={ () => {return "row-" + this.props.rowIndex}}>
				{ this.renderSquare(this.props.rowIndex, 0) }
				{ this.renderSquare(this.props.rowIndex, 1) }
				{ this.renderSquare(this.props.rowIndex, 2) }
			</div>
		);
	}
}
class Board extends React.Component {
	constructor(props) {
		super(props);
		let _grid = [];
		for(let i = 0; i <= 2; i++) {
			let row = Array(3).fill(null);
			_grid.push(row);
		}
		this.state = {
			grid: _grid,
			activeCell: "cell-0-0",
			xIsNext: true
		};
		this.activeRowIndex = 0;
		this.activeCellIndex = 0;
		this.handleKeydown = this.handleKeydown.bind(this);
	}
	navigateLeft() {
		if(this.activeCellIndex > 0) {
			this.activeCellIndex--;
		}
		this.setState({activeCell: "cell-" + this.activeRowIndex + "-" + this.activeCellIndex});
	}
	navigateRight() {
		if(this.activeCellIndex < 2) {
			this.activeCellIndex++;
		}
		this.setState({activeCell: "cell-" + this.activeRowIndex + "-" + this.activeCellIndex});
	}
	navigateUp() {
		if(this.activeRowIndex > 0) {
			this.activeRowIndex--;
		}
		this.setState({activeCell: "cell-" + this.activeRowIndex + "-" + this.activeCellIndex});
	}
	navigateDown() {
		if(this.activeRowIndex < 2) {
			this.activeRowIndex++;
		}
		this.setState({activeCell: "cell-" + this.activeRowIndex + "-" + this.activeCellIndex});
	}
	handleKeydown(event) {
		switch(event.keyCode) {
			case 37:
				this.navigateUp();
			break;
			case 38:
				this.navigateRight();
			break;
			case 39:
				this.navigateDown();
			break;
			case 40:
				this.navigateLeft();
			break;
			case 13:
			case 32:
				this.handleClick();
			break;
			default:
			
		}
		event.preventDefault();
	}
	handleClick() {
		alert("clicked");
	}
	renderRow(rowIndex) {
		return (
			<Row rowIndex={rowIndex}
			activeCell={this.state.activeCell}		/>
		);
	}
	render() {
		const status = 'Next player: X';
		return (
			<div>
				<div className="status">{status}</div>
				<div role="grid" tabIndex="0" aria-activedescendant={this.state.activeCell} onKeyDown={ this.handleKeydown}>
					{this.renderRow(0)}
					{this.renderRow(1)}
					{this.renderRow(2)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
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

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
