import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { request } from 'graphql-request';

class App extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleSubmit(e) {
    console.log(this.state.email);
    e.preventDefault();
    this.submitEmail();
  }

  submitEmail() {
    const {
      email,
    } = this.state;

    const query = `
      mutation {
        subscribeToMailingList(email: "${email}")
      }`;
    
    request('https://api-tournament.numer.ai/', query).then(data => console.log(data))

  }

  //   fetch('https://api-tournament.numer.ai/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       query: `subscribeToMailingList(email: ${email})`,
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(res => console.log(res.data));
  // }

  // { query: '{ posts { title } }' }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Enter email address here" type="text" value={this.state.email} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
