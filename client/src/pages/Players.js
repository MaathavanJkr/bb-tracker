import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { EyeIcon } from '../icons'
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

function Players() {
  let history = useHistory();
  const [page, setPage] = useState(1)
  const [players, setPlayers] = useState([])
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
    fetch(process.env.REACT_APP_BACKEND_URL + '/api/player')
      .then((response) => response.json())
      .then((players) => {
        setTotalResults(players.length)
        setPlayers(players.slice((page - 1) * resultsPerPage, page * resultsPerPage))
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [page])

  return (
    <>
      <PageTitle>Players</PageTitle>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Player</TableCell>
              <TableCell>Attempt</TableCell>
              <TableCell>Success</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {players.map((player, i) => (
              <TableRow key={i} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900">
                <TableCell onClick={()=> {history.push('/app/profile/' + player.id)}} >
                  <div>
                    <p className="font-semibold">{player.firstname + " " + player.lastname}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{player.job}</p>
                  </div>
                </TableCell>
                <TableCell onClick={()=> {history.push('/app/profile/' + player.id)}}>
                  <span className="text-sm">{player.two_attempts}</span>
                </TableCell>
                <TableCell onClick={()=> {history.push('/app/profile/' + player.id)}}>
                  <span className="text-sm">{player.two_success}</span>
                </TableCell>
                <TableCell onClick={()=> {history.push('/app/profile/' + player.id)}}>
                  <span className="text-sm">{player.position}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button tag={Link} to={"profile/" + player.id} layout="link" size="icon" aria-label="Edit">
                      <EyeIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    {/* <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button> */}
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

export default Players
