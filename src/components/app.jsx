import React, { Component } from 'react';
import axios from 'axios';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';

createPlotlyComponent(window.Plotly);

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios.get('/data')
      .then((result) => {
        this.setState({
          data: result.data,
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  render() {
    const {
      data,
    } = this.state;

    return (
      <div>
        <p>Recommended pivots: </p>
        <p>1) Drag Source IP below the Count dropdown to see the total number of data transfers initiated from this IP address.</p>
        <p>2) Drag Source IP below the Count dropdown, then drag Destination IP beneath Source IP to see the origin and destination IP addresses for each data transfer.</p>
        <p>3) Drag Destination IP below the Count dropdown and Source IP to the right of Count dropdown, then set the Table dropdown to Table Heatmap to see a visual representation of which sources and destinations are most popular.</p>
        <p>4) Click on Source IP or Destination IP to filter data by specific IP addresses.</p>
        <PivotTableUI
          data={data}
          onChange={s => this.setState(s)}
          renderers={Object.assign({}, TableRenderers)}
          {...this.state}
        />
      </div>
    );
  }
}

export default App;
