Welcome to the Exoplanet Data Viewer! 🌌

This is a modularized d3 graph built using create-react-app that represents a scatterplot of various numerically-based properties of exoplanets as laid out by the component planets.csv. The application runs through the parent, Exoplanet.js, that hosts three children: two axis components that set the value of the X/Y axis, and a graph component that receives the axis components necessary to draw the graph. 

The inspiration for the scatterplot came from this example (http://bl.ocks.org/weiglemc/6185069) with a large amount of the development time focused on uniting d3/React and creating a modularized graph component that can be re-used and ported. 

The graph operates on a updateGraph() function that takes the parent properties for the axis and uses them to generate a novel scale and query target for the values. Everything needed for drawing is provided by the npm ‘d3’ module as outlined by Graph.js. Axis uses the ‘material-ui’ module to provide a simple UI solution to the dropdown menu.

Installation: 
‘npm install’
‘npm start’
Boom! You’re ready to go on localhost:3000 ~ 

I hope you enjoy! This was a really fun task and a great opportunity to use React’s one-way flow to create an interesting way of passing data through to d3!