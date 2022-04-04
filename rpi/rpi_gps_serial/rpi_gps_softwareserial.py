#!/usr/bin/python

import sys
import time
import difflib
import pigpio

RX=18

try:
    pi = pigpio.pi()
    pi.set_mode(RX, pigpio.INPUT)
    pi.bb_serial_read_open(RX, 9600, 8)

    print("DATA - SOFTWARE SERIAL:")
    while 1:
        gpsarr = []
        (count, data) = pi.bb_serial_read(RX)
        if count:
            print(count)
            bdata = data
            strbdata = str(bytes(bdata)).split('\\r\\n')
            # splcom = str(strbdata).split(',')
            print(strbdata)
            # counted = strbdata.count(' $GPRMC')
            # print(counted)
            # gpsarr.append(splcom)
            # print(gpsarr)
            print("NEW READDD")
        time.sleep(1)

except:
    pi.bb_serial_read_close(RX)
    pi.stop()