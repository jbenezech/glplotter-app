import * as yup from 'yup';
import ArraySchema from 'yup/lib/array';
import {MixedSchema} from 'yup/lib/mixed';

export function uniqueValidator(
  this: ArraySchema<MixedSchema>,
  errorMessage: string,
  propertyPath: string
): ArraySchema<MixedSchema> {
  return this.test(
    'unique',
    errorMessage,
    function (value: Record<string, unknown>[] | null | undefined) {
      if (value === null || value === undefined) {
        return true;
      }

      const errors: yup.ValidationError[] = [];

      value.forEach((item, index) => {
        const propertyValue = item[propertyPath];

        if (
          propertyValue &&
          value.filter((val) => val[propertyPath] === propertyValue).length > 1
        ) {
          errors.push(
            this.createError({
              path: `${this.path}[${index}].${propertyPath}`,
              message: errorMessage,
            })
          );
        }
      });

      if (errors.length > 0) {
        throw new yup.ValidationError(errors);
      }
      return true;
    }
  );
}
