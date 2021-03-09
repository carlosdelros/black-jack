import { useEffect, useContext } from 'react'
import { GameContext } from '../context/GameContext'
import { CONTINUE_STATUS, LOST_STATUS } from '../games/blackjack'

const Table = () => {
  const {
    getShuffledDeck,
    startGame,
    restartGame,
    hit,
    stand,
    houseHand,
    playerHand,
    housePoints,
    playerPoints,
    gameStatus,
    loading
  } = useContext(GameContext)

  useEffect(() => {
    getShuffledDeck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading)
    return <div className="flex flex-col mx-auto text-3xl text-white">Loading, Please wait...</div>

  if (!houseHand.length || !playerHand.length) {
    return (
      <div className="flex flex-col mx-auto min-h-screen align-middle p-20 justify-center">
        <h1 className="flex mx-auto text-3xl text-white p-2">Black Jack</h1>
        <button className="bg-yellow-200 rounded-full p-2 mx-auto text-black" onClick={() => startGame()}>Start Game</button>
      </div>
    )
  }

  const handleStand = () => {
    stand()
  }

  const handleHit = () => {
    hit()
  }

  return (
    <div className="p-5 flex flex-col">
      <div className="flex flex-row flex-wrap justify-center">
        {houseHand.map((c,idx) => <div key={`house-card-${idx}`} className="w-2/12 mx-2 py-2"><img alt={`${c.code}`} src={`${c.image}`} /></div>)}
      </div>
      <div className="flex justify-center text-lg text-white">House Points: {housePoints}</div>
      <div className="flex flex-row flex-wrap p-4 justify-center">
        {playerHand.map((c, idx) => <div key={`player-card-${idx}`} className="w-2/12 mx-2 py-2"><img alt={`${c.code}`} src={`${c.image}`} /></div>)}
      </div>
      {gameStatus === CONTINUE_STATUS ? (
        <>
          <div className="flex justify-center p-4 text-lg text-white">Player Points: {playerPoints}</div>
          <div className="flex flex-row w-full mx-auto space-x-5 justify-center">
            <button className="bg-yellow-200 rounded-full p-2" onClick={handleHit}>Hit</button>
            <button className="bg-yellow-200 rounded-full p-2" onClick={handleStand}>Stand</button>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
            <div className="mx-auto text-lg text-white">{gameStatus === LOST_STATUS ? "House Wins!" : "You Won!"}</div>
          <button className="bg-yellow-200 rounded-full p-2 mx-auto" onClick={() => restartGame()}>Restart Game</button>
        </div>
      )}
    </div>
  )
}

export default Table
