import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  container: {
    height: '5em',
    flex: '1 50%',
    display: 'flex',
    justifyContent: 'space-around',
    background: 'white',
    flexDirection: 'row'
  },
  customWidth: {
    width: 300,
    paddingTop: 10
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

class Axis extends Component {

  constructor(props) {
    super(props); 
    console.log(props); 
    let choices = this.props.options.map((i) =>
      <MenuItem value={i} key={i} primaryText={i}/>
    );
    this.state = {
      options: props.options,
      exoplanetValues: choices,
      value: this.props.title
    }
  }

  handleChange = (event, index, value) => {
    if(this.props.id === 'X') {
      this.props.parent.setState({
        xAxis: value
      });
    } else {
      this.props.parent.setState({
        yAxis: value
      });
    }
    this.setState({value}); 

  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3>{this.props.type}</h3>
        </div>
        <DropDownMenu style={styles.customWidth} value={this.state.value} onChange={this.handleChange}>
          {this.state.exoplanetValues}
        </DropDownMenu>
      </div>
    );
  }
}

export default Axis;
