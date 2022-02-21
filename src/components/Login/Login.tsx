import Grid from "@material-ui/core/Grid/Grid";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import { loginTC } from "../../state/reducers/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../state/store";
import { Navigate } from "react-router-dom";
import { Path } from "../../enum";
import { EMPTY_STRING, LINK_TO_REGISTER } from "../../constants";
import { validates, FormikErrorType } from "../../utils/validates";

export const Login = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector<RootReducerType, boolean>(
    (state) => state.auth.isLoggedIn
  );

  const { START } = Path;

  const formik = useFormik({
    initialValues: {
      email:  process.env.REACT_APP_LOGIN as string ,
      password:  process.env.REACT_APP_PASSWORD as string ,
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      validates(values, errors);
      return errors;
    },
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(loginTC(values));
    },
  });

  const { touched } = formik;
  const { password, email } = formik.errors;
  const textFields = [
    { name: "email", err: email, touch: touched.email,type:'text'},
    { name: "password", err: password, touch: touched.password,type:'password' },
  ];

  if (isLoggedIn) {
    return <Navigate to={START} />;
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={LINK_TO_REGISTER} rel="noreferrer" target={"_blank"}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>

            <FormGroup>
              {textFields.map(({ name, touch, err,type }) => (
                <>
                  <TextField
                    key={name}
                    label={name}
                    margin="normal"
                    type={type}
                    {...formik.getFieldProps({ name })}
                  />
                  {touch && err && <div style={{ color: "red" }}>{err}</div>}
                </>
              ))}

              <FormControlLabel
                label={"Remember me"}
                checked={formik.values.rememberMe}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
