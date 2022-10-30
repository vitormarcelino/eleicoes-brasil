import React, { useEffect, useState } from 'react';

export default function Card(props) {

  const [result, setResult] = useState(null);

  useEffect(() => {
    async function getData() {
      const request = await fetch(`https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/${props.uf.id}/${props.uf.id}-c0001-e000545-r.json`);
      const data = await request.json();

      setResult({ uf: props.uf, data });
    }

    getData();
  }, [props.uf]);

  if (!result) {
    return (
      <div className='Card'>
        <h2 className='Card--title'>{props.uf.name}</h2>
        <p>Carregando...</p>
      </div>
    )
  }

  const candidatos = result.data.cand.sort((a, b) => b.vap - a.vap);

  return (
    <div className={`Card Card--style--${candidatos[0].n}`}>
      <h2 className='Card--title'>{props.uf.name} ({result.data.pst}%)</h2>
      <p className='Card--last-update'>Última atualização: {result.data.hg}</p>
      <ul className='Card--candidatos'>
        {candidatos.map((cand, index) => (
          <li className='Card--candidato' key={`${props.cdabr}-cand-${index}`}>
            <p className='Card--candidato--name'>{index + 1}. {cand.nm} - {cand.n}</p>
            <p className='Card--candidato--votes'>{cand.pvap}% <span>({cand.vap} votos)</span></p>
          </li>
        ))}
      </ul>
    </div>
  )
}
