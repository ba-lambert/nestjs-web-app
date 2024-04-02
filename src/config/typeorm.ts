import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'password',
    database:'webApp',
    entities:[`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize:false,
    migrations:[`${__dirname}/../migrations/*{.ts,.js}`],
    autoLoadEntities:true,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);
