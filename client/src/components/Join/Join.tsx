import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Join = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <h1> Hey {name}</h1>
      <div>
        <input
          placeholder="Your Name"
          onChange={(event) => setName(event.target.value)}
        ></input>
      </div>
      <Link
        onClick={(e) => (!name ? e.preventDefault() : null)}
        to={`/lobby?name=${name}`}
      >
        <Button variant="contained" color="primary" type="submit">
          Enter
        </Button>
      </Link>
    </div>
  );
};

export default Join;
