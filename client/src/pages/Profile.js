import React, { useEffect, useState } from 'react'

import { Card, CardBody } from '@windmill/react-ui'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import {
  lineOptions,
  barOptions,
  doughnutLegends,
  lineLegends,
  barLegends,
} from '../utils/demo/chartsData'

function Charts() {
  const [player, setPlayer] = useState({})
  const doughnutOptions = {
    data: {
      datasets: [
        {
          data: [66, 33],
          backgroundColor: ['#dc2626', '#16a34a'],
          label: 'Shots',
        },
      ],
      labels: ['Shoes', 'Shirts'],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  }
  const doughnutLegends = [
    { title: 'Missed', color: 'bg-red-600' },
    { title: 'Success', color: 'bg-green-600' },
  ]
  useEffect(() => {
    fetch('http://localhost:8000/api/player/1')
      .then((response) => response.json())
      .then((player) => {
        console.log(player);
        setPlayer(player)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])
  return (
    <>
      <PageTitle>Profile</PageTitle>
      <Card className="mb-8 shadow-md">
        <CardBody>
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 leading-none">{player.first_name + " " + player.last_name}</h1>
          <h3 className="text-xl text-center text-gray-600 dark:text-gray-400">{"@" + player.user_name}</h3>
          <h3 className="mt-2 font-semibold text-xl text-center text-gray-700 dark:text-gray-300">Position: {player.position}</h3>
          <h3 className="-mt-2 font-semibold text-xl text-center text-gray-700 dark:text-gray-300">Number: {player.number}</h3>
          <ul className="py-4 mt-2 flex items-center justify-around">
            <li className="flex flex-col items-center justify-around">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">2000</div>
              <div className="text-md text-gray-600 dark:text-gray-400">Three Points</div>
            </li>
            <li className="flex flex-col items-center justify-between">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">3000</div>
              <div className="text-md text-gray-600 dark:text-gray-400">Two Points</div>
            </li>
            <li className="flex flex-col items-center justify-around">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">100</div>
              <div className="text-md text-gray-600 dark:text-gray-400">Free Throws</div>
            </li>
          </ul>
        </CardBody>
      </Card>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Shots">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Lines">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Bars">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Charts
