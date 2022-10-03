import Card from './Card';
import ufs from './ufs';

function App() {
  return (
    <div className="App">
      {ufs.map((uf, index) => <Card key={`${uf}-${index}`} uf={uf} />)}
    </div>
  );
}

export default App;
