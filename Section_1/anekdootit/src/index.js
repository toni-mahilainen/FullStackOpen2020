import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>
    {text}
  </button>

const ShowVotes = ({ points, selected }) => <p>has {points[selected]} votes</p>

const MostVoted = ({ anecdotes, mostVoted, points }) => {
  let tbody = []
  for (let index = 0; index < mostVoted.length; index++) {
    const element = mostVoted[index];
    tbody[tbody.length] =
      <tr>
        <td>{points[element]}</td>
        <td>{anecdotes[element]}</td>
      </tr>;
  }

  if (Object.values(points).every((value) => value === 0)) {
    return (
      <div>
        <h2>No votes yet</h2>
      </div>
    )
  } else {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Votes</th>
              <th>Anecdote</th>
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </table>
      </div>
    )
  }
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState([])
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isFirstRender.current) {
      // Anekdoottien pistemäärät taulukkoon
      const properties = Object.values(points)
      // Maksimi pistemäärä muuttujaan
      var max = Math.max.apply(Math, properties.map((o) => o))
      // Eniten äänestettyjen anekdoottien indekseistä taulukko
      const mostVotedIndx = properties.map((e, i) => e === max ? i : '').filter(String)
      setMostVoted(mostVotedIndx)
    }
  }, [points]);

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  const addVote = (selected) => {
    const pointsCopy = { ...points }
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  const randomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    setSelected(randomNumber)
  }

  return (
    <div>
      <Header header='Anecdote of the day' />
      <p>{props.anecdotes[selected]}</p>
      <ShowVotes points={points} selected={selected} />
      <Button text='vote' onClick={() => addVote(selected)} />
      <Button text='next anecdote' onClick={randomAnecdote} />
      <Header header='Anecdote(s) with most votes' />
      <MostVoted anecdotes={props.anecdotes} mostVoted={mostVoted} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)