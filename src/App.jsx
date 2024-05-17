import { useEffect, useState } from "react";
import CardWeather from "./components/CardWeather.jsx";
import InputError from "./components/error/InputError.jsx";
import NetworkError from "./components/error/NetworkError.jsx";
import Loader from "./components/Loader.jsx";

const App = () => {
  const [ input, setInput ] = useState('');
  const [ zip, setZip ] = useState('');
  const [ weatherCity, setWeatherCity ] = useState([]);
  const [ inputError, setInputError ] = useState('');
  const [ networkError, setNetworkError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if ( zip !== '' ) {
      fetchData();
    }
  }, [ zip ]);

  useEffect(() => {
    setNetworkError('')
  }, [ zip ]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://api.zippopotam.us/it/${ zip }`);
      const jsonResponse = await response.json();
      const places = jsonResponse.places;
      const weatherData = [];


      for ( const place of places ) {

        const { latitude, longitude } = place;
        const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${ latitude }&lon=${ longitude }&appid=b34ee8567b92a6a9f3d66b60ddd8d276&units=metric`);
        const weatherJson = await weatherResponse.json();
        const { icon, description } = weatherJson.weather[ 0 ];
        const { temp } = weatherJson.main;

        weatherData.push({
          place: place[ "place name" ],
          description: description,
          temp: temp,
          icon: icon
        });
      }
      setLoading(false);
      setWeatherCity(weatherData);
    } catch ( e ) {
      setNetworkError('Il codice postale inserito non ha prodotto nessun risultato!');
      setLoading(false);
      setWeatherCity([])
    }
  }

  const handleInput = (e) => {
    setInput(e.target.value);
    setNetworkError('')
    setInputError('');
  };

  const handleClick = () => {
    if ( input.length >= 0 && input.length <= 4 ) {
      setInputError('Gli zip postali sono formati da 5 numeri!')
      return;
    }
    setZip(input);
    setInput('');
  };
  const handleClear = () => {
    setInputError('')
  };

  return (
    <>
      <section className="weather-app">
        <h1 className="weather-app__title">Weather Zip App</h1>
        { inputError && <InputError message={ inputError }/> }
        <div className="weather-app__zip">
          <input className="weather-app__zip--input" type="text" placeholder="Enter a zip" value={ input }
                 onClick={ handleClear } onChange={ handleInput } maxLength={ 5 }/>
          <button className="weather-app__zip--button" onClick={ handleClick }>Enter</button>
        </div>
        { networkError && <NetworkError message={ networkError }/> }
        {
          loading ? <Loader loading={ loading }/> :
            <CardWeather weatherCity={ weatherCity } icon={ weatherCity.length > 0 ? weatherCity[ 0 ].icon : '' }/>
        }
      </section>
    </>
  )
}

export default App;