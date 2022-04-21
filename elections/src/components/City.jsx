import { Children } from 'react';

export default function City({ city = null, children: candidates }) {
  if (!city) {
    return <div>Não foi possível renderizar.</div>;
  }

  return (
    <div className="border p-2 my-4">
      <div className="flex flex-col items-center">
        <div className="font-bold text-md">{`Eleição em ${city.name}`}</div>
        <div className="flex justify-around text-sm m-4 space-x-8">
          <div>
            <strong>Total de eleitores: </strong> {city.votingPopulation}
          </div>
          <div>
            <strong>Abstenção: </strong> {city.absence}
          </div>
          <div>
            <strong>Comparecimento: </strong> {city.presence}
          </div>
        </div>
        <div>{Children.count(candidates)} candidato(s)</div>
      </div>
      <div className="border mt-3 p-2 flex flex-row items-center justify-center flex-wrap space-x-2">
        {candidates}
      </div>
    </div>
  );
}
