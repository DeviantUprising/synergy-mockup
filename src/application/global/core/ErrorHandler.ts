import { Result } from '@global/core/ResultHandler';
import { ICommandError } from '@global/core/ICommandError';

export abstract class CommandError implements ICommandError {
  public readonly message: string;

  protected constructor(message: string) {
    this.message = message;
  }
}

export class UnexpectedCommandError extends Result<CommandError> {
  private constructor(err: any) {
    super(false, {
      message: `An unexpected error occurred.`,
      error: err,
    } as CommandError);
  }

  public static create = (err: any): UnexpectedCommandError =>
    new UnexpectedCommandError(err);
}
