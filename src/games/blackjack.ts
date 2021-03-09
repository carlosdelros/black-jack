import { Card } from '../context/GameContext'

export const HOUSE_INITIAL_HAND = '2'
export const PLAYER_INITIAL_HAND = '2'
export const WON_STATUS = 1
export const LOST_STATUS = -1
export const CONTINUE_STATUS = 0

export const calculatePoints = (hand: Card[]) => {
  let score = 0
  let counter = 0

  for (let i = 0; i < hand.length; i++) {
    if (hand[i].value === "ACE") {
      counter++
    } else if (isNaN(parseInt(hand[i].value))) {
      score += 10;
    } else {
      score += parseInt(hand[i].value);
    }
  }

  for (let i = 0; i < counter; i++) {
    if(score + 11 > 21) {
      score++
    } else {
      score += 11
    }
  }

  return score
};

export const calculateWinner = (playerScore: Number, houseScore: Number) => {
  if(playerScore < 22 && playerScore > houseScore)
    return WON_STATUS

  return LOST_STATUS
}
