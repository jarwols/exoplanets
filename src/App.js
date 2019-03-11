import React, { Component } from 'react';
import Header from './molecules/Header' 
import Axis from './molecules/Axis' 
import Graph from './molecules/Graph' 
import './App.css';

class App extends Component {
  constructor()

  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="controls">
          <Axis></Axis>
          <Axis></Axis>
        </div>
        <Graph></Graph>
      </div>
    );
  }
}

export default App;
