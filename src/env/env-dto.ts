import { IsNumber, IsString } from 'class-validator';

enum Environment {
  Development = 'dev',
  Production = 'prod',
  QA = 'qa',
  Debug = 'debug'
}

export class EnvDto {
  /* Mode ------------------------------------------------------ */
  @IsString()
    NODE_ENV: Environment;

  @IsString()
    COMPOSE_PROJECT_NAME: string;

  /* JWT ------------------------------------------------------- */
  @IsString()
    JWT_SECRET: string;

  @IsString()
  ACCESS_TOKEN_EXPIRES: string;

  @IsString()
  REFRESH_TOKEN_EXPIRES: string;

  /* Node ------------------------------------------------------ */
  @IsNumber()
    NODE_PORT_EXTERNAL: number;

  @IsNumber()
    NODE_PORT_INTERNAL: number;

  @IsNumber()
    NODE_DEBUG_PORT_EXTERNAL: number;

  @IsNumber()
    NODE_DEBUG_PORT_INTERNAL: number;

  /* Mongodb --------------------------------------------------- */
  @IsString()
  MONGO_HOSTNAME: string;

  @IsNumber()
  MONGO_PORT_INTERNAL: number;

  @IsNumber()
  MONGO_PORT_EXTERNAL: number;

  @IsString()
  MONGO_INITDB_DATABASE: string;

  @IsString()
  MONGO_INITDB_ROOT_USERNAME: string;

  @IsString()
  MONGO_INITDB_ROOT_PASSWORD: string;
}
