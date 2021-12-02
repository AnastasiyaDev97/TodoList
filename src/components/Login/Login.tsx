import Grid from '@material-ui/core/Grid/Grid'
import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {authAPI} from "../../api/todolist-api";
import {loginTC} from "../../state/reducers/auth-reducer";
import {useDispatch} from "react-redux";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch=useDispatch();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            if (values.password.length < 3) {
                errors.password = 'Min password length is 3 symbols'
            }
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            authAPI.login(values)
            dispatch(loginTC(values))
        },
    })
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: "red"}}>{formik.errors.email}</div>}
                        <TextField type="password" label="Password"
                                   margin="normal" {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: "red"}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          checked={formik.values.rememberMe}
                                          control={<Checkbox {...formik.getFieldProps('rememberMe')}

                                                             /*onChange={formik.handleChange}*//>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
