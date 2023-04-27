import { NextRequest, NextResponse } from 'next/server'

interface user {
  email: string;
  password: string;
}

interface CustomError extends Error {
  errors?: { email?: string, password?: string }
}

export async function POST(request: Request) {
  try {
    const { email, password }: Partial<user> = await request.json()
    const errors: { email?: string, password?: string } = {}
    if (!email) {
      errors.email = 'Email is required'
    }
    if (!password) {
      errors.password = 'Password is required'
    }
    if (Object.keys(errors).length > 0) {
      const error: CustomError = new Error('Missing required data')
      error.errors = errors
      throw error
    }
  // Check if email and password match with specific values
  if (email !== 'dahal.harry1@gmail.com' || password !== 'mmm') {
    const error: CustomError = new Error('Invalid email or password')
    error.errors = { email: 'email not match', password: 'password not match' }
    throw error
  }

    return NextResponse.json({ response: [{ email, password }] })
  }
    catch (error) {
    if (error instanceof Error) {
      const customError = error as CustomError
      return NextResponse.json({ errors:[{ message: customError.message }]}, { status: 400 })
    } else {
      return NextResponse.json({ errors:[{ message: 'An unknown error occurred' }]}, { status: 500 })
    }
  }
}
