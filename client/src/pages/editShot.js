import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import PageTitle from '../components/Typography/PageTitle'
import { Input, Button, Label, Select } from '@windmill/react-ui'

import { useParams } from 'react-router';

function Forms() {
  const { id } = useParams();

  let history = useHistory();

  const [type, setType] = useState('two');
  const [attempt, setAttempt] = useState('');
  const [success, setSuccess] = useState('');
  const [date, setDate] = useState('');
  const addShot = async () => {
    await fetch(process.env.REACT_APP_BACKEND_URL + '/api/shot/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        type: type,
        attempt: attempt,
        success: success,
        date: date,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer '+ localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          history.push('/app/profile')
        } else {
          alert(data.message)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + '/api/shot/' + id)
      .then((response) => response.json())
      .then((shot) => {
        setAttempt(shot.attempt)
        setSuccess(shot.success)
        setType(shot.type)
        setDate(shot.date.substring(0, 10))
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id])

  return (
    <>
      <PageTitle>Edit Shots</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

        <Label className="mt-1">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Shot Type</span>
          <Select className="mt-1 font-semibold" value={type}
            onChange={(e) => setType(e.target.value)}>
            <option value="two">Two</option>
            <option value="three">Three</option>
            <option value="free">Free Throw</option>
          </Select>
        </Label>

        <Label className="mt-2">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Attempts</span>
          <Input className="mt-1 font-semibold" type="number" placeholder="99" value={attempt}
            onChange={(e) => setAttempt(e.target.value)} />
        </Label>
        <Label className="mt-2">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Success</span>
          <Input className="mt-1 font-semibold" type="number" placeholder="99" value={success}
            onChange={(e) => setSuccess(e.target.value)} />
        </Label>
        <Label className="mt-2">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Date</span>
          <Input className="mt-1 text-gray-700 dark:text-gray-300" type="date" value={date}
            onChange={(e) => setDate(e.target.value)} />
        </Label>
        <div className="mt-4 flex justify-end">
          <Button onClick={addShot}>Update Shot</Button>
        </div>
      </div>
    </>
  )
}

export default Forms
