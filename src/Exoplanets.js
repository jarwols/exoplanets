import React, { Component } from 'react';
import Header from './molecules/Header' 
import Axis from './molecules/Axis' 
import Graph from './molecules/Graph' 
import './App.css';

class Exoplanets extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      options: null,
      data: null,
      xAxis: 'P. Esc Vel (EU)',
      yAxis: 'P. Radius (EU)',
      loaded: false
    }
  }

  componentDidUpdate() {
    if(this.state.data && !this.state.loaded) {
      let data = this.state.data; 
      this.setState({
        options: Object.keys(data[0]),
        loaded: true
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        {this.state.options ? 
          <div className="controls">
              <Axis parent={this} id={'X'} type={'X-Axis'} title={this.state.xAxis} options={this.state.options}></Axis>
              <Axis parent={this} id={'Y'} type={'Y-Axis'} title={this.state.yAxis} options={this.state.options}></Axis>
          </div>
          : null}
        <Graph yAxis={this.state.yAxis} xAxis={this.state.xAxis} parent={this}></Graph>
      </div>
    );
  }
}

export default Exoplanets;
