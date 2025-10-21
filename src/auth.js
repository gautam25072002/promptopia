import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import User from "./models/user"
import bcrypt from 'bcrypt'
import { connectToDB } from "./app/utils/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google login
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      credentials:{
        email:{
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password:{
          type: "password",
          label: "Password",
          placeholder: "*****",
        }
      },
      authorize: async (credentials) => { 
        await connectToDB()
        const findByEmail = await User.findOne({email:credentials.email})
        if(!findByEmail){
          throw new Error("User not found")
        }

        const user = await bcrypt.compare(credentials.password,findByEmail.password)

        if(!user){
          throw new Error("Invalid credentials")
        }
        return {
          id:findByEmail._id.toString(),
          name:findByEmail.name,
          email:findByEmail.email
        }
      },
  })
  ],
  callbacks: {
    async redirect({url,baseUrl }) {
      return baseUrl + "/profile"; 
    },
    async jwt({token,user}){
      if(user) token.id = user.id || user._id.toString()
      return token
    },
    async session({session,token,user}){
      if(token?.id){
        session.user.id = token.id
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectToDB();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
          });
          user.id = newUser._id.toString(); 
        } else {
           user.id = existingUser._id.toString(); 
        }
      }
      return true;
    }

  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in" 
},

})