"use client"
import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from "next/router";
import Link from "next/link"

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:3005',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });
 
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    doRequest();
  };

  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-400">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="/auth/reset" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  name="password"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {errors}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
               Sign in
               {/* <Link href="/auth/signup">sign In</Link> */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default SignIn