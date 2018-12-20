import React, { Component } from "react";
import axios from "axios";

export default class list extends Component {
  constructor() {
    super();
    this.state = {
      quoteList: null
    };
  }

  componentDidMount() {
    this.fetchQuotes();
  }

  fetchQuotes = () => {
    axios.get("/api/quotes").then(res => {
      this.setState({
        quoteList: res.data
      });
    });
  };

  render() {
    const { quoteList } = this.state;
    //   if (!quoteList) {
    //       return <div>Loading...</div>
    //   }
    return (
      <div>
        {quoteList ? (
          quoteList.map(quote => {
            return <div>{quote.phrase}</div>;
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
