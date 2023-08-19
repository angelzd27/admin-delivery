import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import EmailValidator from './EmailValidator'
import CodePassword from './CodePassword'
import SetPassword from './SetPassword'
import CodeAnimation from '../assets/animations/Code.mp4'
import EmailAnimation from '../assets/animations/Email.mp4'
import SetPasswordAnimation from '../assets/animations/SetPassword.mp4'

const steps = ['Check your e-mail', 'Verify your code', 'Set new password']

function ForgotPassword() {
    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set())

    const isStepSkipped = (step) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    return (
        <>
            <div className='flex flex-row h-screen'>
                <div className='lg:w-2/3 xl:w-1/2 w-full bg-yummy-800 flex items-center justify-center'>
                    <div className='w-[80%] bg-white p-5 rounded-lg shadow-lg shadow-[rgba(0,0,0,0.2)]'>
                        <div className='w-full'>
                            <Stepper activeStep={activeStep} alternativeLabel >
                                {steps.map((label, index) => {
                                    const stepProps = {}
                                    if (isStepSkipped(index)) {
                                        stepProps.completed = false
                                    }
                                    return (
                                        <Step key={label}>
                                            <StepLabel className=''>{label}</StepLabel>
                                        </Step>
                                    )
                                })}
                            </Stepper>
                            {activeStep === 0 ? (
                                <EmailValidator handleNext={handleNext} />
                            ) : activeStep === 1 ? (
                                <CodePassword handleNext={handleNext} />
                            ) : activeStep === 2 ? (
                                <SetPassword />
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white'>
                    {
                        activeStep === 0 ? (
                            <div>
                                <div>
                                    <video loop autoPlay muted>
                                        <source src={EmailAnimation} type='video/mp4' />
                                    </video>
                                </div>
                            </div>
                        ) : activeStep === 1 ? (
                            <div>
                                <video loop autoPlay muted>
                                    <source src={CodeAnimation} type='video/mp4' />
                                </video>
                            </div>
                        ) : (
                            <video loop autoPlay muted>
                                <source src={SetPasswordAnimation} type='video/mp4' />
                            </video>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ForgotPassword