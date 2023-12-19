import React, { useState, useEffect } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import ChartCard from '../components/Chart/ChartCard'
import { Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'

function Dashboard() {
  const [playerBar, setPlayerBar] = useState({
    data: {
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  });

  const barLegends = [
    { title: 'Attempt', color: 'bg-purple-600' },
    { title: 'Success', color: 'bg-teal-600' },
  ]
  useEffect(() => {
    fetch('http://localhost:8000/api/player/shots')
      .then((response) => response.json())
      .then((players) => {
        let attemptData = []
        let successData = []
        let labels = []
        players.forEach((item) => {
          attemptData.push(item.two_attempts)
          successData.push(item.two_success)
          labels.push(item.username)
        })

        let successDataSet = {
          label: 'Success',
          backgroundColor: '#0694a2',
          borderWidth: 1,
          data: successData,
        }
        let attemptDataSet = {
          label: 'Attempts',
          backgroundColor: '#7e3af2',
          borderWidth: 1,
          data: attemptData,
        }

        setPlayerBar({
          ...playerBar,
          data: {
            labels: labels,
            datasets: [attemptDataSet, successDataSet]
          }
        })

      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <div className="h-40">
      <ChartCard title="Two Point Stats">
        <Bar {...playerBar} />
        <ChartLegend legends={barLegends} />
      </ChartCard>
      </div>
    </>
  )
}

export default Dashboard
