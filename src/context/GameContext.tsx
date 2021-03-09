import { createContext, ReactNode, useState } from 'react'
import { getNewShuffledDeckFn, drawCardsFn } from '../api/cardDeck'
import {
  HOUSE_INITIAL_HAND,
  PLAYER_INITIAL_HAND,
  WON_STATUS,
  LOST_STATUS,
  CONTINUE_STATUS,
  calculatePoints,
  calculateWinner
} from '../games/blackjack'

export interface Card {
  image: string,
  value: string,
  suit: string,
  code: string
}

export interface GameContextInterface {
  getShuffledDeck: Function,
  startGame: Function,
  restartGame: Function,
  drawCards: Function,
  hit: Function,
  stand: Function,
  houseHand: Card[],
  playerHand: Card[],
  housePoints: Number,
  playerPoints: Number,
  gameStatus: Number,
  loading: Boolean,
  error: string,
}

export interface GameProviderProps {
  children: ReactNode
}

const initialState: GameContextInterface = {
  getShuffledDeck: () => { },
  drawCards: () => { },
  startGame: () => { },
  restartGame: () => { },
  hit: () => { },
  stand: () => { },
  houseHand: [],
  playerHand: [],
  housePoints: 0,
  playerPoints: 0,
  gameStatus: 0,
  loading: false,
  error: ""
}

export const GameContext = createContext(initialState)

export const GameProvider = ({ children }: GameProviderProps) => {
  const [deckId, setDeckId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [houseHand, setHouseHand] = useState<Card[]>([])
  const [playerHand, setPlayerHand] = useState<Card[]>([])
  const [housePoints, setHousePoints] = useState<Number>(0)
  const [playerPoints, setPlayerPoints] = useState<Number>(0)
  const[gameStatus, setGameStatus] = useState<Number>(CONTINUE_STATUS)

  const getShuffledDeck = async () => {
    try {
      setLoading(true)
      const result = await getNewShuffledDeckFn()
      setDeckId(result.deck_id)
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
      console.log('Error: ', err)
    }
  }

  const drawCards = async (n: string = '1') => {
    try {
      const result = await drawCardsFn(deckId, n)
      return result.cards
    } catch (err) {
      setError(err)
      setLoading(false)
      console.log('Error: ', err)
      return []
    }
  }

  const startGame = async () => {
    try {
      setLoading(true)
      const houseHand = await drawCards(HOUSE_INITIAL_HAND)
      const playerHand = await drawCards(PLAYER_INITIAL_HAND)
      setHouseHand(houseHand)
      setPlayerHand(playerHand)
      setHousePoints(calculatePoints(houseHand))
      setPlayerPoints(calculatePoints(playerHand))
      setLoading(false)
    } catch (err) {

    }
  }

  const restartGame = async () => {
    try {
      setLoading(true)
      await startGame()
      setGameStatus(CONTINUE_STATUS)
      setLoading(false)
    } catch(err) {
      setError(err)
      setLoading(false)
      console.log('Error: ', err)
    }
  }

  const hit = async () => {
    const newCard = await drawCards('1')
    const newPlayerHand = [...playerHand, ...newCard]
    setPlayerHand(newPlayerHand)

    const points = calculatePoints(newPlayerHand)
    if(points > 21) {
      // Lose
      setGameStatus(LOST_STATUS)
    }
    setPlayerPoints(calculatePoints(newPlayerHand))
  }

  const stand = () => {
    if(calculateWinner(playerPoints, housePoints) === WON_STATUS) {
      setGameStatus(WON_STATUS)
    } else {
      setGameStatus(LOST_STATUS)
    }
  }

  return (
    <GameContext.Provider value={{
      getShuffledDeck,
      drawCards,
      hit,
      stand,
      houseHand,
      playerHand,
      housePoints,
      playerPoints,
      gameStatus,
      startGame,
      restartGame,
      loading,
      error
    }}>
      {children}
    </GameContext.Provider>
  )
}



