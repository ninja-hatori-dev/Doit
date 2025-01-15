// weatherSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './index';
import axios from 'axios';

interface WeatherState {
    desc: string,
  temperature: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
    desc: "",
    temperature: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess(state, action: PayloadAction<{ temperature: number; desc: string }>) {
        state.loading = false;
        state.temperature = action.payload.temperature;
        state.desc = action.payload.desc;
      },
    fetchWeatherError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherError } =
  weatherSlice.actions;

export const fetchWeather =
  (lat: number, lon: number) => async (dispatch: AppDispatch) => {
    dispatch(fetchWeatherStart());
    try {
      const apiKey = '6191c51edeea3be3c52c424d75ff20e1';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const temperature = response.data.main.temp;
      const desc = response.data.weather[0].description;
      console.log(`Temperature: ${temperature}°C, Weather: ${desc}`);
      dispatch(fetchWeatherSuccess({temperature,desc}));
    } catch (error: any) {
      dispatch(fetchWeatherError(error.message || 'Failed to fetch weather.'));
    }
  };

export default weatherSlice.reducer;
