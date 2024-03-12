import { format, transports } from 'winston';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';
import { utilities } from 'nest-winston';

export const winstonModuleOptions: WinstonModuleOptions = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        format.ms(),
        utilities.format.nestLike('example-app-name', {
          prettyPrint: true,
          colors: true,
        }),
      ),
      level: 'debug',
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'app.log',
      format: format.combine(format.timestamp(), format.logstash()),
      level: 'debug',
    }),
  ],
};
