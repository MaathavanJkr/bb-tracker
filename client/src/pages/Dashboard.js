import React, { useState, useEffect } from 'react'

import { EditIcon, TrashIcon } from '../icons'
import PageTitle from '../components/Typography/PageTitle'
import {
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

function Dashboard() {
  const [page, setPage] = useState(1)
  const [players, setPlayers] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = players.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced players
  // here you would make another server request for new players
  useEffect(() => {
    fetch('http://localhost:8000/api/player')
      .then((response) => response.json())
      .then((players) => {
        console.log(players);
        setPlayers(players.slice((page - 1) * resultsPerPage, page * resultsPerPage))
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [page])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Player</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {players.map((player, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div>
                    <p className="font-semibold">{player.first_name + " " + player.last_name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{player.job}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{player.position}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
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

export default Dashboard
