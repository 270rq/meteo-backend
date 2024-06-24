import { TWeatherType } from 'src/enum/weather-type';
import { TWindType } from 'src/enum/wind-type';

export interface IMenu {
  date: Date;
  cityId: number;
  temperature: number;
  humidity: number;
  uv: number;
  windSpeed: number;
  windType: TWindType;
  pressure: number;
  weatherType: TWeatherType;
  createrUserId: number;
}
