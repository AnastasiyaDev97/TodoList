export const validates = (
  values: FormikValuesType,
  errors: FormikErrorType
) => {
  const { email, password } = values;
  if (!email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Invalid email address";
  }
  if (!password) {
    errors.password = "Required";
  }
  if (password.length < 3) {
    errors.password = "Min password length is 3 symbols";
  }
};

export type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};
type FormikValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
