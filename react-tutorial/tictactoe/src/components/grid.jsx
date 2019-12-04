import React from 'react'
import Announcement from './announcement';

class Grid extends React.Component 
{
    constructor(props) 
    {
		super(props);
		let _grid = [];
        for(let i = 0; i <= 2; i++) 
        {
			let row = Array(3).fill(null);
			_grid.push(row);
		}
		this.state = {grid: _grid, activeCell: "cell-0-0", xIsNext: true, announcementText: ""};
		this.activeRowIndex = 0;
		this.activeCellIndex = 0;
		this.handleKeydown = this.handleKeydown.bind(this);
	}
    navigateLeft() 
    {
        if(this.activeCellIndex > 0) 
        {
			this.activeCellIndex--;
		}
		this.setState({activeCell: "cell-" + this.activeRowIndex + "-" + this.activeCellIndex});
	}
    navigateRight() 
    {
        if(this.activeCellIndex < 2) 
        {
			this.activeCellIndex++;
		}
		this.setState({activeCell: "cell-" + this.activeRowIndex + "-" + this.activeCellIndex});
	}
    navigateUp() 
    {
        if(this.activeRowIndex > 0) 
        {
			this.activeRowIndex--;
		}
		this.setState({activeCell: "cell-" + this.activeRowIndex + "-" + this.activeCellIndex});
	}
    navigateDown() 
    {
        if(this.activeRowIndex < 2) 
        {
			this.activeRowIndex++;
		}
		this.setState({activeCell: "cell-" + this.activeRowIndex + "-" + this.activeCellIndex});
	}
    handleKeydown(event) 
    {
        switch(event.keyCode) 
        {
			case 37:
				this.navigateLeft();
				event.preventDefault();
			    break;
			case 38:
				this.navigateUp();
				event.preventDefault();
			    break;
			case 39:
				this.navigateRight();
				event.preventDefault();
			    break;
			case 40:
				this.navigateDown();
				event.preventDefault();
			    break;
			case 13:
			case 32:
				this.handleActivate(event);
			    break;
			default:	
		}
	}
    handleActivate(event)
    {
		const grid = this.state.grid.slice();
		const xIsNext = this.state.xIsNext;
        if(grid[this.activeRowIndex][this.activeCellIndex] == null) 
        {
			grid[this.activeRowIndex][this.activeCellIndex] = xIsNext ? "X" : "O";
			let announcementText = xIsNext ? "Placed X, next turn: O." : "Placed O, next turn: X.";
			this.setState({grid: grid, xIsNext: !xIsNext, announcementText: announcementText});
		}
		event.preventDefault();
	}
    handleClick(event, rowIndex, cellIndex) 
    {
		this.activeCellIndex = cellIndex;
		this.activeRowIndex = rowIndex;
		this.setState({activeCell: "cell-" + rowIndex + "-" + cellIndex});//focusing cell on click
		this.handleActivate(event);
		
	}
    renderRow(rowIndex) 
    {
		return (
			<Row rowindex={rowIndex} activecell={this.state.activeCell} rowclickhandler={(event, cellIndex) => {this.handleClick(event, rowIndex, cellIndex);}}
			value={this.state.grid[rowIndex]}
			/>
		);
	}
    render() 
    {
		const status = 'Next player: X';
		return (
			<div>
				<div className="status"><strong>{status}</strong></div>
				<Announcement text={this.state.announcementText} />
				<div role="grid" tabIndex="0" aria-activedescendant={this.state.activeCell} onKeyDown={ this.handleKeydown}>
					{this.renderRow(0)}
					{this.renderRow(1)}
					{this.renderRow(2)}
				</div>
			</div>
		);
	}
}

class Row extends React.Component
{
    renderSquare(cellIndex) 
    {
		return (
			<Cell cellindex={cellIndex} rowindex={this.props.rowindex} activecell={this.props.activecell}
				cellclickhandler={(event) => {this.props.rowclickhandler(event, cellIndex);}}
                value={this.props.value[cellIndex]}
            />  
		);
	}
    render() 
    {
	    const rowId = "row-" + this.props.rowindex;
		return (
			<div className="board-row" role="row" id={rowId}>
				{ this.renderSquare(0) }
				{ this.renderSquare(1) }
				{ this.renderSquare(2) }
			</div>
		);
	}
}

class Cell extends React.Component 
{
    render() 
    {
		const cellId = "cell-" + this.props.rowindex + "-" + this.props.cellindex;
		const selectedState =this.props.activecell == cellId ? "true" : "false";
		const spanId = "span-" + cellId;
		let value;
        if(this.props.value != null) 
        {
			value = this.props.value;
        } 
        else 
        {
			value = <span className="element-invisible" id={spanId}>This cell is empty.</span>;
		}
		return (
			<div role="gridcell" aria-roledescription="cellButton" id={ cellId } aria-selected={selectedState}>
	            <button className="square" tabIndex="-1" onClick={(event) => {this.props.cellclickhandler(event); }}>
                    {value}
				</button>
			</div>
		);
	}
}

export default Grid