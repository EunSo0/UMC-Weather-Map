import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const API_KEY = "d2aa1f298d1fe24aabec7015efa1e873";

export default function App() {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");

  const onChange = (e) => {
    setLocation(e.target.value);
  };

  const searchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
      );
      setName(response.data.name);
      setTemp(Math.round((response.data.main.temp - 273.15) * 10) / 10);
      setWeather(response.data.weather[0].description);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchWeather();
    }
  };

  return (
    <Wrapper>
      <Input
        placeholder="도시를 입력하세요"
        onChange={onChange}
        onKeyPress={handleKeyPress}
        value={location}
      />
      {temp && (
        <WeatherWrapper>
          <Location>{name}</Location>
          <Temp>{temp}°C</Temp>
          <Weather>{weather}</Weather>
        </WeatherWrapper>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 200px;
  height: 50px;
  border-radius: 15px;
  padding: 10px;
  margin: 20px;
`;
const WeatherWrapper = styled.div`
  width: 200px;
  border: 1px solid #000;
  border-radius: 15px;
  padding: 10px;
`;
const Location = styled.div`
  font-size: 24px;
`;
const Temp = styled.div`
  font-size: 48px;
`;
const Weather = styled.div`
  text-align: right;
`;
