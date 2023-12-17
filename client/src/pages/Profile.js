import React, { useEffect, useState } from 'react'

import { Card, CardBody } from '@windmill/react-ui'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import {
  barOptions,
  lineLegends,
  barLegends,
} from '../utils/demo/chartsData'

function Charts() {
  const months = ['0', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const [player, setPlayer] = useState({})
  const [shotDoughnut, setShotDoughnut] = useState({
    data: {
      datasets: [
        {
          // data: [33, 33],
          backgroundColor: ['#dc2626', '#16a34a'],
          label: 'Shots',
        },
      ],
      labels: ['Missed', 'Success'],
    },
    options: {
      responsive: true,
      cutoutPercentage: 60,
    },
    legend: {
      display: false,
    },
  })

  const [shotLine, setShotLine] = useState({
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value',
          },
        },
      },
    },
    legend: {
      display: false,
    },
  });

  const doughnutLegends = [
    { title: 'Success', color: 'bg-green-600' },
    { title: 'Missed', color: 'bg-red-600' },
  ]

  const lineLegends = [
    { title: 'Attempt', color: 'bg-blue-600' },
    { title: 'Success', color: 'bg-green-600' },
  ]
  
  useEffect(() => {
    fetch('http://localhost:8000/api/player/1')
      .then((response) => response.json())
      .then((player) => {
        console.log(player);
        setPlayer(player)

        let attemptData = []
        let successData = []
        let labels = []
        player.stat.forEach((item) => {
          attemptData.push(item.two_attempts)
          successData.push(item.two_success)
          labels.push(months[item.month_number])
        })

        let successDataSet = {
          label: 'Success',
          backgroundColor: '#15803d',
          borderColor: '#16a34a',
          data: successData,
          fill: false,
        }
        let attemptDataSet = {
          label: 'Attempt',
          fill: false,
          backgroundColor: '#1d4ed8',
          borderColor: '#2563eb',
          data: attemptData,
        }

        setShotLine({
          ...shotLine,
          data: {
            labels: labels,
            datasets: [attemptDataSet, successDataSet]
          }
        })

        setShotDoughnut({ ...shotDoughnut, data: { ...shotDoughnut.data, datasets: [{ ...shotDoughnut.data.datasets[0], data: [player.total_two_attempts - player.total_two_success, player.total_two_success] }] } })
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
          <h1 className="mt-4 text-4xl font-bold text-center text-gray-800 dark:text-gray-200 leading-none">{player.first_name + " " + player.last_name}</h1>
          <h3 className="text-xl text-center text-gray-600 dark:text-gray-400">{"@" + player.user_name}</h3>
          <h3 className="mt-2 font-semibold text-xl text-center text-gray-700 dark:text-gray-300">Position: {player.position}</h3>
          <h3 className="-mt-2 font-semibold text-xl text-center text-gray-700 dark:text-gray-300">Number: {player.number}</h3>
          <ul className="py-4 mt-2 flex items-center justify-around">
            <li className="flex flex-col items-center justify-around">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{player.total_three_attempts}</div>
              <div className="text-md text-gray-600 dark:text-gray-400">Three Points</div>
            </li>
            <li className="flex flex-col items-center justify-between">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{player.total_two_attempts}</div>
              <div className="text-md text-gray-600 dark:text-gray-400">Two Points</div>
            </li>
            <li className="flex flex-col items-center justify-around">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{player.total_free_attempts}</div>
              <div className="text-md text-gray-600 dark:text-gray-400">Free Throws</div>
            </li>
          </ul>
        </CardBody>
      </Card>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Total Shots">
          <Doughnut {...shotDoughnut} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Shots per Month">
          <Line {...shotLine} />
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
