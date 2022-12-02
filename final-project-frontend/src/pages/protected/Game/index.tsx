import Navbar from "components/shared-components/Navbar";
import React from "react";
import GameWrapper from "./style";

const Game = () => {
  return (
    <>
      <Navbar />
      <GameWrapper className="container py-5">
        <div className="d-flex justify-content-center">
          <h4>Sorry, this page is still under development</h4>
        </div>
      </GameWrapper>
    </>
  );
};

export default Game;
