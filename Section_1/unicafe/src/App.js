import React, { useState, useEffect, useRef } from 'react'
import './App.css';

const Display = ({ text, count }) => <p>{text}: {count}</p>

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>
    {text}
  </button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [percent, setPercent] = useState(0)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isFirstRender.current) {
      setAverage((good + bad * -1) / all)
      setPercent(((good / all) * 100).toString() + ' %');
    }
  }, [all, good, bad]);

  useEffect(() => { 
    isFirstRender.current = false 
  }, [])

  const increaseGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(all / 3)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage(all / 3)
  }

  const increaseBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(all / 3)
  }

  return (
    <div>
      <Header header='Give feedback' />
      <Button onClick={increaseGood} text='good' />
      <Button onClick={increaseNeutral} text='neutral' />
      <Button onClick={increaseBad} text='bad' />
      <Header header='Statistics' />
      <Display text='Good' count={good} />
      <Display text='Neutral' count={neutral} />
      <Display text='Bad' count={bad} />
      <Display text='All' count={all} />
      <Display text='Average' count={average} />
      <Display text='Positive' count={percent} />
    </div>
  )
}

export default App;
