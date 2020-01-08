import React from 'react'

class Grid extends React.Component 
{
    constructor(props) 
    {
		super(props);
		let _grid = [];
        for(let i = 0; i < props.numcols; i++) 
        {
			let row = Array(props.numrows).fill(null);
			_grid.push(row);
		}
		this.state = {grid: _grid, activeCell: "cell-0-0" };
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
        if(this.activeCellIndex < this.props.numcols - 1) 
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
        if(this.activeRowIndex < this.props.numrows - 1)
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
		if(grid[this.activeRowIndex][this.activeCellIndex] == null) 
		{
			grid[this.activeRowIndex][this.activeCellIndex] = this.props.oncellactivate(event);
			this.setState({grid: grid});
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
			numcols={ this.props.numcols }
			key={rowIndex.toString()}
			/>
		);
	}
    render() 
    {
		const status = 'Next player: X';
		let rows = [];
						for(let i = 0; i < this.props.numrows; i++)
							rows.push(this.renderRow(i));
		return (
			<div>
				<div className="status"><strong>{status}</strong></div>
				<div role="grid" tabIndex="0" aria-activedescendant={this.state.activeCell} onKeyDown={ this.handleKeydown}>
					{ rows }
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
				key={cellIndex.toString()}
            />  
		);
	}
    render() 
    {
	    const rowId = "row-" + this.props.rowindex;
		let cells = [];
		for(let i = 0; i < this.props.numcols; i++)
			cells.push(this.renderSquare(i));
		return (
			<div className="board-row" role="row" id={rowId}>
				{ cells }
			</div>
		);
	}
}

class Cell extends React.Component 
{
    render() 
    {
		const cellId = "cell-" + this.props.rowindex + "-" + this.props.cellindex;
		const selectedState =this.props.activecell === cellId ? "true" : "false";
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