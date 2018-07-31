import React, { Component } from 'react';
import axios from 'axios';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(window.Plotly);

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
      <PivotTableUI
        data={data}
        onChange={s => this.setState(s)}
        renderers={Object.assign({}, TableRenderers)}
        {...this.state}
      />
    );
  }
}

export default App;
