import React from 'react'

class Announcement extends React.Component 
{
    constructor(props) 
    {
		super(props);
        this.state = 
        {
			text: props.text
		};
	}
    render() 
    {
		return (
			<span className="element-invisible" aria-live="polite">{this.state.text}</span>
		);
	}
    removeText() 
    {
		const text = this.state.text;
        if(text !== "") 
        {
			this.setState({text: ""});
		}
	}
    faidOut() 
    {
		setTimeout(
            () => this.removeText(),
			3000
		);
	}
    componentDidMount() 
    {
		this.faidOut();
	}
    componentDidUpdate(prevProps) 
    {
        if(this.props.text !== prevProps.text) 
        {
			this.setState({
				text: this.props.text
			});
			this.faidOut();
		}
	}
}

export default Announcement