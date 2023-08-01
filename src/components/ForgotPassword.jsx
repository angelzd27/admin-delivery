import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import EmailAnimation from '../assets/animations/Email.mp4'

const steps = ['Verify Your e-mail', 'Check the code', 'Set New Password'];

function ForgotPassword() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <div className='bg-yummy-800 flex w-full h-screen'>

                {/* Contenedor del formulario */}
                <div className=' w-full flex items-center justify-center lg:w-1/2'>
                    <div className='bg-white px-10 py-8 rounded-3xl border-2 border-gray-100'>
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <Fragment>
                                    <p>Your password is setting correctly, return to sign in now!</p>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Link to='/auth/sign_in' className={'text-yummy-800 hover:text-yummy-600 transition-all duration-200'}>
                                            Return to Sign in
                                        </Link>
                                    </Box>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>Hello World</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        {
                                            activeStep === 0 || activeStep === 2 ?
                                                <Link to='/auth/sign_in' className={'text-yummy-800 hover:text-yummy-600 transition-all duration-200'}>
                                                    Cancel
                                                </Link>
                                                :
                                                ''
                                        }
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Link onClick={handleNext} className={'text-yummy-800 hover:text-yummy-600 transition-all duration-200'}>
                                            {activeStep === 0 ? 'Validate my e-mail' : activeStep === 1 ? 'Check code' : 'Set new password'}
                                        </Link>
                                    </Box>
                                </Fragment>
                            )}
                        </Box>

                        {/* <h1 className='text-4xl font-semibold text-center'>Forgot your password?</h1>
                        <p className='font-medium text-lg text-gray-500 mt-4'>We need to check if your email exists or is still active</p>

                        <div className='mt-8'>
                            <div className='relative'>
                                <TextField label='Email' variant='standard' type='email' className='w-full' value={emailValue} onChange={inputChange} />
                                <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                    <MdEmail />
                                </div>
                            </div>
                            <div className='mt-8 flex flex-row justify-between gap-y-4'>
                                <Link to='/auth' className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                                    Return
                                </Link>
                                <Link to='/auth/email_code' className={`text-yummy-800 hover:text-yummy-600 transition-all duration-200 ${emailValue.length < 0 ? 'underline underline-offset-4' : ''}`}>
                                    Check & Continue
                                </Link>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Contenedor de la animacion */}
                <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white' >
                    <video autoPlay loop muted>
                        <source src={EmailAnimation} type='video/mp4' />
                    </video>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword