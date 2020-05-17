export class Result<T> {
  public isSuccess: boolean;

  public isFailure: boolean;

  public error: T | string | undefined;

  private value: T | undefined;

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  public getValue = (): T => {
    if (!this.isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }

    return this.value as T;
  };

  public errorValue = (): T => this.error as T;

  public static ok = <U>(value?: U): Result<U> =>
    new Result<U>(true, undefined, value);

  public static fail = <U>(error: string): Result<U> =>
    new Result<U>(false, error);

  public static combine = (results: Result<any>[]): Result<any> => {
    let status = Result.ok();

    results.forEach((result) => {
      if (result.isFailure) status = result;
    });

    return status;
  };
}

export class Failure<F, S> {
  public readonly value: F;

  public constructor(value: F) {
    this.value = value;
  }

  public isFailure = (): this is Failure<F, S> => true;

  public isSuccess = (): this is Success<F, S> => false;
}

export class Success<L, A> {
  public readonly value: A;

  public constructor(value: A) {
    this.value = value;
  }

  public isFailure = (): this is Failure<L, A> => false;

  public isSuccess = (): this is Success<L, A> => true;
}

export type Either<F, S> = Failure<F, S> | Success<F, S>;
export const failure = <F, S>(f: F): Either<F, S> => new Failure(f);
export const success = <F, S>(s: S): Either<F, S> => new Success<F, S>(s);
