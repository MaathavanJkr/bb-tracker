import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";

function Register() {
  let history = useHistory();

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [position, setPosition] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token) {
      history.push('/app')
    }
  });

  const registerPlayer = async () => {
    if (password == cpassword) {
      await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          first_name: firstname,
          last_name: lastname,
          position: position,
          number: number,
          password: password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("token", data.token);
            history.push('/app')
          } else {
            alert(data.message)
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert("wrong password")
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Label>
                <span>Username</span>
                <Input className="mt-1" type="text" placeholder="username" value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </Label>
              <Label className="mt-2">
                <span>First Name</span>
                <Input className="mt-1" type="text" placeholder="John" value={firstname}
                  onChange={(e) => setFirstname(e.target.value)} />
              </Label>
              <Label className="mt-2">
                <span>Last Name</span>
                <Input className="mt-1" type="text" placeholder="Doe" value={lastname}
                  onChange={(e) => setLastname(e.target.value)} />
              </Label>
              <Label className="mt-2">
                <span>Position</span>
                <Input className="mt-1" type="text" placeholder="Point Guard" value={position}
                  onChange={(e) => setPosition(e.target.value)} />
              </Label>
              <Label className="mt-2">
                <span>Number</span>
                <Input className="mt-1" type="number" placeholder="99" value={number}
                  onChange={(e) => setNumber(e.target.value)} />
              </Label>
              <Label className="mt-2">
                <span>Password</span>
                <Input className="mt-1" placeholder="***************" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </Label>
              <Label className="mt-2">
                <span>Confirm password</span>
                <Input className="mt-1" placeholder="***************" type="password" value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)} />
              </Label>

              <Label className="mt-6" check>
                <Input type="checkbox" />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>

              <Button onClick={registerPlayer} block className="mt-4">
                Create account
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Register
