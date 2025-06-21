import React, { useState, useEffect } from 'react';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/suggestions')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSuggestions(data);
        } else {
          console.error("Expected an array, got:", data);
        }
      })
      .catch(err => {
        console.error("Fetch failed:", err);
      });
  }, []);

  return (
    <div className="suggestions w-75 m-4">
              <div className="d-flex">
        <p>Suggested for you</p>
        <strong className="ms-auto">See All</strong>
      </div>
        {suggestions.length > 0 ? (
        suggestions.map((suggestion) => (
          <div className="dp d-flex align-items-center my-2" key={suggestion.id}>
            <img
              src={suggestion.profile_pic}
              alt={suggestion.username}
              className="rounded-circle"
              width="30"
              height="30"
            />
            <h5 style={{ marginLeft: "10px", marginBottom: 0 }}>{suggestion.username}</h5>
            <small className="ms-auto text-primary">Follow</small>
          </div>
        ))
      ) : (
        <p>Loading suggestions...</p>
      )}
      </div>
  );
};

export default Suggestions;
