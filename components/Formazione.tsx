import React from 'react'
import { Timeline } from './ui/timeline'
import {data} from './ui/timeline'

const Formazione = () => {
  return (
    <div>
      <Timeline data={data} />
    </div>
  )
}

export default Formazione