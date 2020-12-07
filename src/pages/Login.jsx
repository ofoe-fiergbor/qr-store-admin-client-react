import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { login } from '../redux/action'
import { connect } from 'react-redux'



import { LOGIN_WITH_EMAIL_AND_PASSWORD } from '../graphql/login'

function Login({ login, history }) {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        email: '',
        password: '',
    })


    const [loginUser, { loading }] = useMutation(LOGIN_WITH_EMAIL_AND_PASSWORD, {
        update(proxy, result) {
            login(result.data.login)
            history.push('/')

        },
        variables: values,
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors)
            // console.log(err.graphQLErrors[0].extensions.exception.errors)
        }
    })
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault()
        loginUser()
    }
    return (
        <div className='formContainer'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1 style={{ textAlign: 'center' }}>Login</h1>

                <Form.Input
                    label='Email'
                    placeholder='Email...'
                    name='email'
                    onChange={onChange}
                    value={values.email}
                    error={errors.email ? true : false}
                    type='text'
                />


                <Form.Input
                    label='Password'
                    placeholder='Password...'
                    name='password'
                    onChange={onChange}
                    value={values.password}
                    error={errors.password ? true : false}
                    type='password'
                />

                <Button type='submit' primary>Login</Button>
            </Form>
            {
                Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map(value => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>

    )
}

export default connect(null, { login })(Login)
