import { 
    ValidatorConstraint, 
    ValidatorConstraintInterface 
  } from 'class-validator';
  
  @ValidatorConstraint({
       name: 'ageValidator', 
       async: false 
      })
  
  export class AgeValidator implements ValidatorConstraintInterface {
    validate(birthday: string): boolean {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
  
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
  
      return age >= 18 && age <= 99;
    }
  
    defaultMessage(): string {
      return 'La fecha de nacimiento debe ser mayor de 18 años';
    }
  }