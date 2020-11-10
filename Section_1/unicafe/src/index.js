import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom';

const StatisticLine = ({ count }) => <p>{count}</p>

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>
    {text}
  </button>

const Statistics = ({ statistics }) => {
  // Jos kaikkien objektin ominaisuuksien arvo on nolla, 'No given feedback' renderöidään ruudulle
  if (Object.values(statistics).every((value) => value === 0)) {
    return (
      <div>
        <h2>No given feedback</h2>
      </div>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Good</td>
              <td>
                <StatisticLine count={statistics.good} />
              </td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>
                <StatisticLine count={statistics.neutral} />
              </td>
            </tr>
            <tr>
              <td>Bad</td>
              <td>
                <StatisticLine count={statistics.bad} />
              </td>
            </tr>
            <tr>
              <td>All</td>
              <td>
                <StatisticLine count={statistics.all} />
              </td>
            </tr>
            <tr>
              <td>Average</td>
              <td>
                <StatisticLine count={statistics.average} />
              </td>
            </tr>
            <tr>
              <td>Positive</td>
              <td>
                <StatisticLine count={statistics.percent} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const [statistics, setStatistics] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    percent: 0
  })
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isFirstRender.current) {
      const newStatistics = {
        good: statistics.good,
        neutral: statistics.neutral,
        bad: statistics.bad,
        all: statistics.all,
        average: (statistics.good + statistics.bad * -1) / statistics.all,
        percent: ((statistics.good / statistics.all) * 100).toString() + ' %'
      }
      setStatistics(newStatistics)
    }
  }, [statistics.all, statistics.good, statistics.bad, statistics.neutral]);

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  const increaseGood = () => {
    const newStatistics = {
      good: statistics.good + 1,
      neutral: statistics.neutral,
      bad: statistics.bad,
      all: statistics.all + 1,
      average: statistics.all / 3,
      percent: statistics.percent
    }
    setStatistics(newStatistics)
  }

  const increaseNeutral = () => {
    const newStatistics = {
      good: statistics.good,
      neutral: statistics.neutral + 1,
      bad: statistics.bad,
      all: statistics.all + 1,
      average: statistics.all / 3,
      percent: statistics.percent
    }
    setStatistics(newStatistics)
  }

  const increaseBad = () => {
    const newStatistics = {
      good: statistics.good,
      neutral: statistics.neutral,
      bad: statistics.bad + 1,
      all: statistics.all + 1,
      average: statistics.all / 3,
      percent: statistics.percent
    }
    setStatistics(newStatistics)
  }

  return (
    <div>
      <Header header='Give feedback' />
      <Button onClick={increaseGood} text='good' />
      <Button onClick={increaseNeutral} text='neutral' />
      <Button onClick={increaseBad} text='bad' />
      <Header header='Statistics' />
      <Statistics statistics={statistics} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));