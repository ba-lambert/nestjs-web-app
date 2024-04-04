import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions : DataSourceOptions = {
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'password',
    database:'webApp',
    synchronize:false,
    entities: ['dist/**/*.entity.{js or ts}'],
    migrations: ['dist/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;