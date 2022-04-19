import React, { useState } from 'react'

const VitalSignStatus = ({ vitalSign, value }) => {
  const [status, setStatus] = useState("STATUS")
  if (vitalSign == "TEMPERATURE") {

  }

  if (vitalSign == "PULSE_RATE") {

  }

  if (vitalSign == "O2_SATURATION") {

  }

  if (vitalSign == "SYSTOLIC_BP") {

  }

  if (vitalSign == "DIASTOLIC_BP") {

  }

  return status
}

export default VitalSignStatus