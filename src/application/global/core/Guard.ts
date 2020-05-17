interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

interface IGuardArgument {
  argument: any;
  argumentName: string;
}

type GuardArgumentCollection = IGuardArgument[];

export default class Guard {
  public static combine = (guardResults: IGuardResult[]): IGuardResult => {
    let status = true;

    guardResults.forEach((result) => {
      if (result.succeeded === false) status = false;
    });

    return { succeeded: status };
  };

  public static greaterThan = (
    minValue: number,
    actualValue: number
  ): IGuardResult =>
    actualValue > minValue
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Number given {${actualValue}} is not greater than {${minValue}}`,
        };

  public static againstAtLeast = (
    numChars: number,
    text: string
  ): IGuardResult =>
    text.length >= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is not at least ${numChars} chars.`,
        };

  public static againstAtMost = (
    numChars: number,
    text: string
  ): IGuardResult =>
    text.length <= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is greater than ${numChars} chars.`,
        };

  public static againstNullOrUndefined = (
    argument: any,
    argumentName: string
  ): IGuardResult => {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`,
      };
    }

    return { succeeded: true };
  };

  public static againstNullOrUndefinedBulk = (
    args: GuardArgumentCollection
  ): IGuardResult => {
    let status = true;

    args.forEach((arg) => {
      const result = Guard.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );

      if (!result.succeeded) status = false;
    });

    return { succeeded: status };
  };

  public static isOneOf = (
    value: any,
    validValues: any[],
    argumentName: string
  ): IGuardResult => {
    let isValid = false;

    validValues.forEach((validValue) => {
      if (value === validValue) {
        isValid = true;
      }
    });

    if (isValid) {
      return { succeeded: true };
    }

    return {
      succeeded: false,
      message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
        validValues
      )}. Got "${value}".`,
    };
  };

  public static inRange = (
    num: number,
    min: number,
    max: number,
    argumentName: string
  ): IGuardResult => {
    const isInRange = num >= min && num <= max;

    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentName} is not within range ${min} to ${max}.`,
      };
    }

    return { succeeded: true };
  };

  public static allInRange = (
    numbers: number[],
    min: number,
    max: number,
    argumentName: string
  ): IGuardResult => {
    let failingResult: unknown = null;

    numbers.forEach((num) => {
      const numIsInRangeResult = Guard.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    });

    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentName} is not within the range.`,
      };
    }

    return { succeeded: true };
  };
}
