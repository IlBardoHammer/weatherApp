import "../scss/CardWeather.scss";
import { useEffect, useState } from "react";
import {
  sunny,
  fewClouds,
  scatteredClouds,
  rain,
  showerRain,
  thunderstorm,
  brokenClouds,
  snow,
  sunnyMoon,
  mist,
  fewCloudsMoon
} from '../assets/icon/iconExports.js'

const CardWeather = ({ weatherCity, icon }) => {
  const [ height, setHeight ] = useState(0);
  const cardsPerRow = 3;
  const cardHeight = 300;
  const cardMarginTop = 40;
  const spaceBetweenRows = 30;

  useEffect(() => {
    const updateLayout = () => {
      let updatedCardsPerRow = cardsPerRow;

      if (window.innerWidth <= 768) {
        updatedCardsPerRow = 2;
      }
      if (window.innerWidth <= 480) {
        updatedCardsPerRow = 1;
      }

      const rows = Math.ceil(weatherCity.length / updatedCardsPerRow);
      const totalHeight = rows * (cardHeight + cardMarginTop) + (rows - 1) * spaceBetweenRows;
      setHeight(totalHeight);
    }

    updateLayout();

    window.addEventListener('resize', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
    }

  }, [weatherCity, window.innerWidth]);

  const roundTemperature = (temp) => {
    return Math.round(temp);
  };

  const upper = (description) => {
    return description.toUpperCase();
  }

  const iconMapping = {
    '01d': sunny,
    '02d': fewClouds,
    '03d': scatteredClouds,
    '04d': brokenClouds,
    '09d': showerRain,
    '10d': rain,
    '11d': thunderstorm,
    '13d': snow,
    '50d': mist,
    '01n': sunnyMoon,
    '02n': fewCloudsMoon,
    '03n': scatteredClouds,
    '04n': brokenClouds,
    '09n': showerRain,
    '10n': rain,
    '11n': thunderstorm,
    '13n': snow,
    '50n': mist
  }

  return (
    <>

      <div className="weather-app__cards" style={ { height: `${ height }px` } }>
        { weatherCity.map((cityWeather, index) => (
          <div key={ index } className="weather-card">
            <h3 className="weather-card__title">{ cityWeather.place }</h3>
            <p className="weather-card__temp">{ roundTemperature(cityWeather.temp) }<span
              className="weather-card__celsius">°C</span></p>
            <img className="weather-card__img"
                 src={ iconMapping[ icon ] }
                 alt={ cityWeather.description }/>
            <p className="weather-card__descr">{ upper(cityWeather.description) }</p>
          </div>
        ))
        }
      </div>
    </>
  )
}

export default CardWeather;