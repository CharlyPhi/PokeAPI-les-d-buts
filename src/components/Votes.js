/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Votes() {
  const [vote1, setVote1] = useState({ id: 0, description: 0, votes: 0 });
  const [vote2, setVote2] = useState({ id: 0, description: 0, votes: 0 });
  const [vote3, setVote3] = useState({ id: 0, description: 0, votes: 0 });
  const [vote4, setVote4] = useState({ id: 0, description: 0, votes: 0 });

  const getVotes = async () => {
    try {
      await axios.get("http://localhost:3001/votes").then((res) => {
        setVote1({
          id: res.data[0].id,
          description: res.data[0].description,
          number: res.data[0].number,
        });
        setVote2({
          id: res.data[1].id,
          description: res.data[1].description,
          number: res.data[1].number,
        });
        setVote3({
          id: res.data[2].id,
          description: res.data[2].description,
          number: res.data[2].number,
        });
        setVote4({
          id: res.data[3].id,
          description: res.data[3].description,
          number: res.data[3].number,
        });
      });
    } catch (err) {
      console.log("get votes err", err);
    }
  };

  const upvote = (id) => {
    axios
      .patch(`http://localhost:3001/votes/${id}}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("vote error", err);
      });
  };

  function increase(e) {
    upvote(e.target.id);
    getVotes();
  }

  useEffect(() => {
    getVotes();
  }, []);

  return (
    <div className="graph">
      <div className="votes">
        <div id="1"></div>
        <button
          name={vote1.number}
          id={vote1.id}
          type="button"
          onClick={increase}
        >
          {vote1.description} {vote1.number}
        </button>
      </div>
      <div className="votes">
        <div id="2"></div>
        <button datavote={vote2} id="2" type="button" onClick={increase}>
          {vote2.description} {vote2.number}
        </button>
      </div>
      <div className="votes">
        <div id="3"></div>
        <button datavote={vote3} id="3" type="button" onClick={increase}>
          {vote3.description} {vote3.number}
        </button>
      </div>
      <div className="votes">
        <div id="4"></div>
        <button datavote={vote4} id="4" type="button" onClick={increase}>
          {vote4.description} {vote4.number}
        </button>
      </div>
    </div>
  );
}
