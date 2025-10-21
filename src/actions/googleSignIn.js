'use server'
import { signIn } from "@/auth"

export const Google = async () => {
     await signIn('google')
}
