/**
 * @page SignInPage
 * @description Renders the sign-in page for users to access their accounts.
 */
"use client"

import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
    return (
        <div className='flex h-[100vh] items-center justify-center my-8'>
            <SignIn signUpUrl='/signup' fallbackRedirectUrl='/dashboard' />
        </div>
    )
}

export default SignInPage
