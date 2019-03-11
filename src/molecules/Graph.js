import React, { Component } from 'react';
import planets from './planets.csv'
import Dimensions from 'react-dimensions'
import * as d3 from 'd3'

const styles = {
  container: {
    height: '640px',
    marginTop: '3em',
  	flex: '1 100%',
  }
}

class Graph extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
      parent: props.parent,
      data: null,
      graph: null,
      tooltip: null
  	}
  }

  componentWillMount() {
    let _this = this; 
    d3.csv(planets, function(data) {
      let planetList = [];
      // remove non-numerical fields
      data.map((exoplanet) => {
        let result = {};
        let key = null; 
        for(key in exoplanet) {
          if(!isNaN(exoplanet[key])) {
            result[key] = exoplanet[key]; 
          }
          // push planet name as well as numericals
          result['name'] = exoplanet['P. Name'];
        }
        return planetList.push(result); 
      });
      _this.state.parent.setState({
        data: planetList
      });
      // set base svg
      let svg = d3.select("#graph")
        .append("svg")
        .attr("width", _this.props.containerWidth)
        .attr("height", 640);

      let tooltip = d3.select("#graph")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      _this.setState({
        data: planetList,
        graph: svg,
        tooltip: tooltip
      });

      _this.updateGraph(svg); 
    });
  }

  componentDidUpdate() {
    if(this.state.graph) {
      this.updateGraph(this.state.graph); 
    }
  }

  findMax(input) {
    return d3.max(this.state.data, function(d) { 
      if(!d[input]) return 1;
      return +d[input]; 
    });
  }

  findMin(input) {
    return d3.min(this.state.data, function(d) { 
      if(!d[input]) return 1;
      return +d[input]; 
    });
  }

  appendXAxis(xAxis) {
    this.state.graph.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,620)")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", this.props.containerWidth-70)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text(this.props.xAxis);
  }

  appendYAxis(yAxis) {
    this.state.graph.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(70,10)")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(this.props.yAxis);
  }

  appendPlanets(xScale, yScale) {
    let _this = this;
    console.log(d3); 
    let colors = ['#FFED00', '#FFFFFF']
    this.state.graph.selectAll("circle")
      .data(this.state.data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return xScale(d[_this.props.xAxis]);
      })
      .attr("cy", function(d) {
        return yScale(d[_this.props.yAxis]);
      })
      .attr("r", 2)
      .attr("fill", function(d,i){
        return colors[i%2];
      })
      .on("mouseover", function(d) {
          _this.state.tooltip.transition()
               .duration(300)
               .style("opacity", .85);
          _this.state.tooltip.html("<h3>" + d['name'] + "</h3><p>" + 
            _this.props.xAxis + ": " + d[_this.props.xAxis] 
          + "</p><p>" + _this.props.yAxis + ": " + d[_this.props.yAxis] + "</p>")
               .style("left", (d3.event.pageX - 100) + "px")
               .style("top", (d3.event.pageY - 120) + "px");
      })
      .on("mouseout", function(d) {
          _this.state.tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
  }

  updateGraph(graph) {
    // clear graph and push new axis/values
    graph.selectAll("*").remove();
    let _this = this; 

    let xMin = this.findMin(this.props.xAxis);
    let xMax = this.findMax(this.props.xAxis);
    let yMax = this.findMax(this.props.yAxis); 
    let yMin = this.findMin(this.props.yAxis); 

    if(!xMin) xMin = 0;
    if(!xMax) xMax = 0;
    if(!yMin) yMin = 0;
    if(!yMax) yMax = 0;

    console.log(xMin, xMax, yMin, yMax); 

    let xScale = d3.scaleLinear()
       .domain([xMin, xMax])
       .range([80, this.props.containerWidth-70]);
    let yScale = d3.scaleLinear()
       .domain([yMin, yMax])
       .range([610, 10]);

    let xAxis = d3.axisBottom().scale(xScale);
    let yAxis = d3.axisLeft().scale(yScale); 

    this.appendXAxis(xAxis); 
    this.appendYAxis(yAxis); 
    this.appendPlanets(xScale, yScale); 
  }

  render() {
    return (
      <div id={'graph'} style={styles.container}>
      </div>
    );
  }
}

export default Dimensions()(Graph);
