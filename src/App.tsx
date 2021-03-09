import Table from './components/Table'
import  { GameProvider } from './context/GameContext'

function App() {
  return (
    <div className="bg-poker-green min-h-screen flex flex-col justify-center">
      <GameProvider>
        <Table />
      </GameProvider>
    </div>
  );
}

export default App;
