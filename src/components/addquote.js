import React, { Component } from "react";

function addQuote(props) {
  const { user } = props;

  return (
    <div>
      {user ? (
        <div>You COULD add a quote here</div>
      ) : (
        <div>You need to log in</div>
      )}
    </div>
  );
}
