import React from 'react'
import { useForm } from 'react-hook-form';

export const ManagementForm = (props) => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();


    const renderSupervisors = () => {
        return props.managerData ? props.managerData.map((m, i) => <option key={i}>{m.jurisdiction} - {m.firstName}, {m.lastName}</option>) : <option></option> 
    }

    const postData = async (data) => {
        const res = await fetch('/api/supervisors', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });
        console.log('Response:', await res.json())
    }

    const onSubmit = data => {
        postData(data);
    };

    const errorStyles = {
        position: 'absolute',
        fontSize: '12px',
        color: 'red'
    }

    return (
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Notification Form</h1>
            <div className='fields'>
                <div className="flex">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" {...register('firstName', { required: true })}/>
                        {errors.firstName && <span style={errorStyles}>This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" {...register('lastName', { required: true })}/>
                        {errors.lastName && <span style={errorStyles}>This field is required</span>}
                    </div>
                </div>

                <div id="notification-section">How would you like to be notified?</div>
                <div className="flex">
                    <div className="form-group">
                        <input type="checkbox" name="useEmail" {...register('useEmail')} />
                        <label className="absolute" htmlFor="useEmail">Email</label>
                        <input type="email" name="email" {...register('email', { validate: () => getValues('useEmail') !== true })} />
                        {errors.email &&  <span style={errorStyles}>Please provide an email</span>}
                    </div>
                    <div className="form-group">
                        <input type="checkbox" name="usePhone" {...register('usePhone') } />
                        <label className="absolute" htmlFor="usePhone">Phone Number</label>
                        <input type="tel" name="phone" {...register('phone', { validate: () => getValues('usePhone') !== true })} />
                        {errors.phone && <span style={errorStyles}>Please provide a phone number</span>}
                    </div>
                </div>

                <div id="supervisor" className="form-group">
                    <label htmlFor="supervisor">
                        Supervisor
                        <br/>
                        <select name="supervisor" {...register('supervisor')}>
                            <option value="">Select...</option>
                            {renderSupervisors()}
                        </select>
                    </label>
                </div>
                <div id="submit"><button type="submit">SUBMIT</button></div>
            </div>
        </form>
    )
}