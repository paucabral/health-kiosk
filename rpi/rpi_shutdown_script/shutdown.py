#!/usr/bin/python
import RPi.GPIO as GPIO
import time
import subprocess

# we will use the pin numbering to match the pins on the Pi, instead of the 
# GPIO pin outs (makes it easier to keep track of things)

GPIO.setmode(GPIO.BOARD)
# GPIO.setmode(GPIO.BCM)

# use the same pin that is used for the reset button (one button to rule them all!)
GPIO.setup(15, GPIO.IN, pull_up_down = GPIO.PUD_UP)

oldButtonState1 = True
buttonDelay = 0

while True:
    #grab the current button state
    buttonState1 = GPIO.input(15)
    print(buttonState1)
    while buttonState1 == 0:
      buttonState1 = GPIO.input(15)
      if buttonDelay == 5:
        subprocess.call("poweroff", shell=True, 
          stdout=subprocess.PIPE, stderr=subprocess.PIPE)
      
      buttonDelay += 1
      if buttonState1 == 1:
        buttonDelay = 0
        continue
      time.sleep(1)
    time.sleep(1)
