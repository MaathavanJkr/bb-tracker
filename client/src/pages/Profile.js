import React, { useEffect, useState } from 'react'

import {
  Card,
  CardBody,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Button,
  Pagination,
} from '@windmill/react-ui'

import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'

import { EditIcon, TrashIcon } from '../icons'


function Profile() {
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
  const [page, setPage] = useState(1)
  const [shots, setShots] = useState([])
  const [totalResults, setTotalResults] = useState(0)

  // pagination setup
  const resultsPerPage = 10

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced players
  // here you would make another server request for new players
  useEffect(() => {
    fetch('http://localhost:8000/api/shot/player/1')
      .then((response) => response.json())
      .then((shots) => {
        setTotalResults(shots.length)
        setShots(shots.slice((page - 1) * resultsPerPage, page * resultsPerPage))
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [page])

  useEffect(() => {
    fetch('http://localhost:8000/api/player/1')
      .then((response) => response.json())
      .then((player) => {
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
    // eslint-disable-next-line
  }, [])

  const deleteShot = async (id) => {
    await fetch('http://localhost:8000/api/shot/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Deleted")
        } else {
          console.log(data)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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

        {/* <ChartCard title="Bars">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard> */}
      </div>


      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Type</TableCell>
              <TableCell>Attempt</TableCell>
              <TableCell>Success</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {shots.map((shot, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div>
                    <p className="font-semibold">{shot.type}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{shot.attempt}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{shot.success}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{shot.date.substring(0, 10)}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button onClick={() => { deleteShot(shot.id) }} layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Profile
