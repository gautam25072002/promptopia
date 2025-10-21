import {auth} from '@/auth'
import FormWrapper from '@/components/FormWrapper'
import { redirect } from 'next/navigation'

const SignIn = async () => {
    const session = await auth()
    if(session) redirect('/')

    return (
        <div className='h-full flex justify-around items-center font-bold w-full'>
            <FormWrapper text="Sign In"/>
        </div>
    )
}

export default SignIn
