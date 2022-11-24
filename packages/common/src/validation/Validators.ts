import * as yup from 'yup';
import {uniqueValidator} from './UniqueValidator';

export function registerValidators(): void {
  yup.addMethod(yup.array, 'unique', uniqueValidator);
}
