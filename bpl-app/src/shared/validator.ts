import { AbstractControl } from '@angular/forms';
export class Validator {


passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {

    let password = control.value;
    if (control.value !== undefined && control.value==password) {
        return { 'password': true };
    }
    return null;
  }
  
  
  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
  
    let bday= control.value;
    let bdayArr=bday.split('-');
    let bdayYr=parseInt(bdayArr[0]);
    let currDt= new Date();
    let currYr = currDt.getFullYear();
  
    if((currYr-bdayYr)<18|| (currYr-bdayYr)>30)
        return {'bday':true}
        
    return null;
  }

}