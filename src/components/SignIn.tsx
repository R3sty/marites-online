import { FC } from 'react'
import Link from "next/link"
import UserAuthForm from "./UserAuthForm"

const SignIn: FC = () => {
  return <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
    <div className="flex flex-col space-y-2 text-center">
      {/* logo */}
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="text-sm max-w-xs mx-auto">
        By continuing, you are setting up a Marites Online account and agree to our User Agreement and Privacy Policy
      </p>
      {/* sign in form */}
      <UserAuthForm/>
      <p className="px-8 text-center text-sm text-zinc-700">
        New to Marites Online?
        <Link href="/sign-up"
          className="hover:text-zinc-800 text-sm underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </div>
  </div>
}

export default SignIn