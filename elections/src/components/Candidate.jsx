export default function Candidate({
  candidate = null,
  presence = 0,
  elected = false,
}) {
  if (!candidate) {
    return <div>Não foi possível renderizar.</div>;
  }

  const percentage = (candidate.votes / presence) * 100;
  const electedText = elected ? 'Eleito' : 'Não eleito';
  const electedClassName =
    'font-bold' + (elected ? ' text-blue-500' : ' text-yellow-500');

  return (
    <div
      className={`border shadow-lg p-4 m-2 w-60 h-48  
                  flex flex-row items-center justify-center`}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="flex flex-row justify-between space-x-12">
          <img
            src={`${process.env.PUBLIC_URL}/img/${candidate.username}.png`}
            alt={`${candidate.name}`}
            width="45"
            className="rounded-full"
          />
          <div className="flex flex-col items-center">
            <div className={electedClassName}>{percentage.toFixed(2)}%</div>
            <div className="text-sm">{candidate.votes} votos</div>
          </div>
        </div>
        <div className="text-lg">{candidate.name}</div>
        <div className={`text-sm ${electedClassName}`}>{electedText}</div>
      </div>
    </div>
  );
}
