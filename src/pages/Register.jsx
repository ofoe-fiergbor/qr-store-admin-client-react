import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { REGISTER_NEW_USER } from '../graphql/register'
import { login } from '../redux/action'
import { connect } from 'react-redux'



const Register = ({ login, history }) => {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        email: '',
        password: '',
        username: '',
        confirmPassword: ''
    })

    const [registerUser, { loading, error }] = useMutation(REGISTER_NEW_USER, {
        update(proxy, result) {
            login(result.data.login)
            history.push('/')
        },
        variables: values,
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors)
        }
    })

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const onSubmit = e => {
        e.preventDefault()
        registerUser()
    }
    return (
        <div className='formContainer'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1 style={{ textAlign: 'center' }}>Register</h1>
                <Form.Input
                    label='Username'
                    placeholder='Username...'
                    name='username'
                    onChange={onChange}
                    value={values.username}
                    error={errors.username ? true : false}
                    type='text'
                />
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
                <Form.Input
                    label='Confirm Password'
                    placeholder='Confirm Password...'
                    name='confirmPassword'
                    onChange={onChange}
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    type='password'
                />
                <Button type='submit' primary>Register</Button>
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

export default connect(null, { login })(Register)
