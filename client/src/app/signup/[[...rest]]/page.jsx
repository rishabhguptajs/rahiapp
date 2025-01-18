/**
 * @page SignUpPage
 * @description Renders the sign-up page for new users to create an account.
 */
"use client"

import { SignUp } from "@clerk/nextjs"
import React from "react"

const SignUpPage = () => {
  return (
    <div className="flex h-full items-center justify-center my-8">
      <SignUp signInUrl="/signin" forceRedirectUrl="/createprofile" />
    </div>
  )
}

export default SignUpPage
