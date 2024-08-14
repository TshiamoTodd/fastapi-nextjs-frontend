'use client'

import React, {useContext} from 'react'
import {AuthContext} from '@/app/context/AuthContext'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Link from 'next/link'
 
const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
})

const SignInPage = () => {
  const {login} = useContext(AuthContext)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      login(values.username, values.password)
    } catch (error) {
      console.log(error)
      
    }
  }


  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Workouts SignIn</CardTitle>
        <CardDescription>Access your workouts.</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Enter your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type="submit">Submit</Button>
          <p className='text-[12px] text-gray-500'>Don't have an account? <Link href={'/sign-up'} className='text-blue-500'>Sign Up</Link></p>
        </form>
      </Form>
      </CardContent>
    </Card>
  )
}

export default SignInPage