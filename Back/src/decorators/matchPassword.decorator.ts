import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({
    name: 'MatchPassword',
    async: false
})
export class MatchPassword implements ValidatorConstraintInterface {
    validate(password: any, args: ValidationArguments): Promise<boolean> | boolean {
        const confirmPassword = (args.object as any)[args.constraints[0]];
        return password === confirmPassword;
    }

    defaultMessage(args: ValidationArguments): string {
        return `${args.property} debe coincidir con ${args.constraints[0]}`;
    }
}