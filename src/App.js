import React, { useState, useEffect } from 'react';
import './App.css';

const ufs = [
  { id: 'br', name: 'brasil' },
  { id: 'ac', name: 'acre' },
  { id: 'al', name: 'alagoas' },
  { id: 'ap', name: 'amapá' },
  { id: 'am', name: 'amazonas' },
  { id: 'ba', name: 'bahia' },
  { id: 'ce', name: 'ceará' },
  { id: 'df', name: 'distrito federal' },
  { id: 'es', name: 'espírito santo' },
  { id: 'go', name: 'goiás' },
  { id: 'ma', name: 'maranhão' },
  { id: 'mt', name: 'mato grosso' },
  { id: 'ms', name: 'mato grosso do sul' },
  { id: 'mg', name: 'minas gerais' },
  { id: 'pr', name: 'paraná' },
  { id: 'pb', name: 'paraíba' },
  { id: 'pa', name: 'pará' },
  { id: 'pe', name: 'pernambuco' },
  { id: 'pi', name: 'piauí' },
  { id: 'rj', name: 'rio de janeiro' },
  { id: 'rn', name: 'rio grande do norte' },
  { id: 'rs', name: 'rio grande do sul' },
  { id: 'ro', name: 'rondônia' },
  { id: 'rr', name: 'roraima' },
  { id: 'sc', name: 'santa catarina' },
  { id: 'se', name: 'sergipe' },
  { id: 'sp', name: 'são paulo' },
  { id: 'to', name: 'tocantins' },
  { id: 'zz', name: 'exterior' },
]

async function getResultBy(uf) {
  const request = await fetch(`https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/${uf.id}/${uf.id}-c0001-e000544-r.json`);
  const data = await request.json();

  return { uf, data };
}

function Card(props) {

  const [result, setResult] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await getResultBy(props.uf, null);
      setResult(data);
    }

    getData();
  }, [props.uf]);

  if (!result) {
    return (
      <div className='card'>
        <h2 className='card--title'>{props.uf.name}</h2>
        <p>Carregando...</p>
      </div>
    )
  }

  const candidatos = result.data.cand.sort((a, b) => b.vap - a.vap);

  return (
    <div className={`card card--style--${candidatos[0].n}`}>
      <h2 className='card--title'>{props.uf.name}</h2>
      <ul className='card--candidatos'>
        {candidatos.map((cand, index) => (
          <li className='card--candidato' key={`${props.cdabr}-cand-${index}`}>
            <p className='card--candidato--name'>{index + 1}. {cand.nm} - {cand.n}</p>
            <p className='card--candidato--votes'>{cand.pvap}% <span>({cand.vap} votos)</span></p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      {ufs.map((uf, index) => <Card key={`${uf}-${index}`} uf={uf} />)}
    </div>
  );
}

export default App;
