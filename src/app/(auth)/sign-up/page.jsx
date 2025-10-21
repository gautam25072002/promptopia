import GoogleSignIn from '@/components/GoogleSignIn'
import SubmitButton from '@/components/SubmitButton'
import Link from 'next/link'
import {FcGoogle} from 'react-icons/fc'
import Register from '@/actions/register'

const SignUp = () => {

  return (
    <div className="h-full flex flex-col md:flex-row justify-around items-center font-bold w-full gap-4 p-4">
      <div className="text-6xl w-full font-extrabold tracking-tight text-center md:text-start md:ml-4 hidden md:block">
       <p>
           Get Started 
          <span className="text-md md:block my-2 mx-2">With</span>
          <span className="block bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-4xl tracking-wider">
            Promptopia
          </span>
       </p>
      </div>

      <div className="w-[60%] flex flex-col lg:flex-row lg:w-[50%] gap-4 lg:justify-center lg:items-center mt-6">
        <div className="md:w-80 w-full flex flex-col gap-4">
          <h1 className='text-4xl font-bold text-center md:hidden  mb-4 '>Register for <span className='font-extrabold bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>Promptopia</span></h1>
          <div className="border-2 px-4 py-3 flex justify-center items-center gap-2 rounded-md">
            <FcGoogle size={20} />
            <GoogleSignIn />
          </div>
          <p className="text-center">OR</p>
          <form
            className="flex flex-col gap-4 mb-2"
            action={Register}
          >
            <input
              type="text"
              name="name"
              className="px-4 py-3 w-full rounded-md border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
              placeholder="Enter your name"
              required
            />

            <input
              type="email"
              name="email"
              className="px-4 py-3 w-full rounded-md border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />

            <input
              type="password"
              name="password"
              className="px-4 py-3 w-full rounded-md border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />

            <SubmitButton type="Sign In" text="Logging in..." />
          </form>

          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
