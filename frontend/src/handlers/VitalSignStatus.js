import React, { useState } from 'react'

const VitalSignStatus = (vitalSign, value, value2) => {
  if (vitalSign == "TEMPERATURE") {
    if (value >= 35.0 && value <= 37.5) {
      return "NORMAL"
    }
    else if (value < 35.0) {
      return "BELOW NORMAL"
    }
    else if (value > 37.5 && value <= 40.0) {
      return "ABOVE NORMAL (Fever)"
    }
    else if (value > 40.0) {
      return "HIGH FEVER"
    }
    else {
      return "NA"
    }
  }

  if (vitalSign == "PULSE_RATE") {
    if (value >= 60 && value <= 100) {
      return "NORMAL"
    }
    else if (value < 60) {
      return "BELOW NORMAL"
    }
    else if (value > 100) {
      return "ABOVE NORMAL"
    }
    else {
      return "NA"
    }
  }

  if (vitalSign == "O2_SATURATION") {
    if (value >= 95 && value <= 100) {
      return "NORMAL"
    }
    else if (value >= 91 && value < 95) {
      return "BELOW NORMAL (Cause for concern)"
    }
    else if (value >= 86 && value < 91) {
      return "LOW BLOOD OXYGEN (Medical Emergency)"
    }
    else if (value >= 80 && value < 86) {
      return "LACK OF OXYGEN"
    }
    else if (value >= 67 && value < 80) {
      return "CRITICAL"
    }
    else {
      return "NA"
    }
  }

  if (vitalSign == "BLOOD_PRESSURE") {
    if ((value < 120) && (value2 < 80)) {
      return "NORMAL"
    }
    else if ((value >= 120 && value <= 129) && (value2 < 80)) {
      return "ELEVATED"
    }
    else if ((value > 129 && value <= 139) || (value2 >= 80 && value2 <= 89)) {
      return "HIGH BLOOD PRESSURE (Hypertension) Stage 1"
    }
    else if ((value > 139 && value <= 180) || (value2 > 89 && value2 <= 120)) {
      return "HIGH BLOOD PRESSURE (Hypertension) Stage 2"
    }
    else if ((value > 180) || (value > 120)) {
      return "HYPERTENSIVE CRISIS (Consult Immediately)"
    }
    else {
      return "NA"
    }
  }
  return "STATUS"
}

export default VitalSignStatus