import React from 'react';
import CardStack from '../CardStack/CardStack';

import NameMatrix from '../NameMatrix/NameMatrix';

const GameBoard = () => (
  <div className="gameBoard">
    <CardStack ></CardStack>
    <NameMatrix></NameMatrix>
  </div>
);

export default GameBoard;