#!/usr/bin/env python
import time
import serial
import numpy as np

ser = serial.Serial(
    # port='/dev/ttyS0',
    port='/dev/ttyAMA1',
    baudrate = 9600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
)

# For saving coords collected in case GPS signal fluctuates
lng_save = 0.0
lat_save = 0.0

lat_sma_gps = []
got_lat_val = 0.0
lng_sma_gps = []
got_lat_val = 0.0


def movave(values, window):
    weights = np.repeat(1.0, window)/window
    sma = np.convolve(values, weights, 'valid')
    return sma

def compute_rawGPS(raw_val, direction):
    #Separate lat and long. Note: 2 digits to left of decimal point is min, rest is degree
    str_int = str(int((raw_val//1)))    #Converted to string, to separate degree and minutes
    str_flt = float((raw_val%1))        #String as is
                                        #Left hand side of decimal
    deg = float(str_int[:-2])           #Degree is extracted, will be used as is
    min = float(str_int[-2:])
                 
    flt_val = float(str_flt)                        #Right hand side of decimal
    full_minutes = min+flt_val                      #Combined
    
    coord_min = full_minutes/60.0                   #Take coordinate minute

    coordinate_val = float(str(deg+coord_min)[:10]) #To shorten decimal places (string)

    if direction == "N" or direction == "E":        #Condition to determine whether coord is + or -
        signed_coord = coordinate_val
    else:
        signed_coord = float(("-"+str(coordinate_val)))
        
    if direction == "W" or direction == "E":        #Just for print, can be removed
        latlong = "Long: "
    else:
        latlong = "Lat: "

    print(signed_coord)
    return signed_coord

def computedGPS():
    coordinate_payload = {
        "lat": None,
        "lng": None    
    }
    gpscnt = 0                  # variable for iteration
    strgpsarr = []              # array to hold all streams in string (for split function)

    latGPRMC = []               # arrays for lat and long unused
    longGPRMC = []
    
    latraw_val = 0.0            # initialize coord values and directions
    latdirection = ""
    longraw_val = 0.0
    longdirection = ""
    
    gpsarr = []                  # array to hold streams in b format   
    gpslines=ser.readline()      # read from the port
    strgpslines = str(gpslines).split(',')  # split by ,
    gpsarr.append(strgpslines)     
    print(gpslines)
    if len(gpsarr) < 1:          # initial check if something is read
        print("EMPTY")            

    else:                        # else proceed to check GPGLL
        if (gpsarr[0][0]) == "b'$GPGLL":
            print("FOUND GPGLL!")

            latraw_check = str(gpsarr[0][1]) # Checked initially, the firstmost value of needed
            if (latraw_check != ''):
                latraw_val = float(gpsarr[0][1])       # GPGLL pattern is $GPGLL, lat, lat_dir, lng, lng_dir
                latdirection = str(gpsarr[0][2])
                longraw_val = float(gpsarr[0][3])
                longdirection = str(gpsarr[0][4])

                lat = compute_rawGPS(latraw_val, latdirection)      # subject to computation
                lng = compute_rawGPS(longraw_val, longdirection)      
                coordinate_payload["lat"] = lat          # save as is
                coordinate_payload["lng"] = lng      
                exit(0)
            else:
                print("no value received...")
                exit(1)

    gpscnt+=1
    if gpscnt==8:
        gpscnt = 0
    # time.sleep(1.5)

while 1:
    computedGPS()