import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvDto } from './env-dto';

export function validateEnvVariables(config: Record<string, unknown>): void {
  const envDto = plainToInstance(EnvDto, config, { enableImplicitConversion: true });
  const errors = validateSync(envDto, { skipMissingProperties: false });

  if (errors.length > 0) throw new Error(errors.toString());
}
