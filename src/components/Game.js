import React, { useEffect, useState } from 'react';
import utils from '../math-utils';
import StarsDisplay from './StarsDisplay';
import PlayNumber from './PlayNumber';
import PlayAgain from './PlayAgain';

// Custom Hook
const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [avaliableNums, setAvaliableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && avaliableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidatesNums) => {
    if (utils.sum(newCandidatesNums) !== stars) {
      setCandidateNums(newCandidatesNums);
    } else {
      const newAvailableNums = avaliableNums.filter(
        (n) => !newCandidatesNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvaliableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return {
    stars,
    avaliableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  };
};

const Game = (props) => {
  const {
    stars,
    avaliableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameState();
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus =
    avaliableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  const numberStatus = (number) => {
    if (!avaliableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || secondsLeft === 0) {
      return;
    }

    const newCandidatesNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    setGameState(newCandidatesNums);
  };

  return (
    <div className='game'>
      <div className='help'>
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className='body'>
        <div className='left'>
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay stars={stars} />
          )}
        </div>
        <div className='right'>
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              value={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className='timer'>Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default Game;
