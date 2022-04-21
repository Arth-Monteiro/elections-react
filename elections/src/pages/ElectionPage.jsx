import { useState, useEffect } from 'react';
import Select from 'react-select';

import Header from './../components/Header';
import Main from './../components/Main';
import City from '../components/City';
import Loading from '../components/Loading';
import Error from '../components/Error';

import {
  apiGetAllCities,
  apiGetAllCandidates,
  apiGetCityCandidates,
} from '../services/apiService';
import Candidate from '../components/Candidate';

export default function ElectionPage() {
  const [allCities, setAllCities] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [cityCandidates, setCityCandidates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const backEndAllCities = await apiGetAllCities();
        setAllCities(backEndAllCities);

        const backEndAllCandidates = await apiGetAllCandidates();
        setAllCandidates(backEndAllCandidates);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  async function handleSelectOnChange(city) {
    try {
      const chosenCity = allCities.find(c => c.id === city.value);
      const candidatesCity = await apiGetCityCandidates(chosenCity.id);

      const candidates = candidatesCity
        .map(c => {
          let c1 = allCandidates.find(ac => ac.id === c.candidateId);
          return { ...c1, votes: c.votes };
        })
        .sort((a, b) => b.votes - a.votes);

      setSelectedCity(chosenCity);
      setCityCandidates(candidates);
    } catch (error) {
      setError(error.message);
    }
  }

  const cities = allCities
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .map(city => {
      return { value: city.id, label: city.name };
    });

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  } else if (!loading) {
    mainJsx = (
      <>
        <div className="w-64 m-auto">
          <Select
            onChange={handleSelectOnChange}
            placeholder={'Escolha o munícipio'}
            options={cities}
          />
        </div>
        {selectedCity ? (
          <City city={selectedCity}>
            {cityCandidates.map((c, index) => (
              <Candidate
                key={c.id}
                candidate={c}
                presence={selectedCity.presence}
                elected={index === 0}
              />
            ))}
          </City>
        ) : (
          <></>
        )}
      </>
    );
  }

  return (
    <>
      <Header>elections-v1</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}
