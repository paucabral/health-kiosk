#!/usr/bin/env python
import time
import serial
import numpy as np

ser = serial.Serial(
    # port='/dev/ttyS0',
    port='/dev/ttyAMA1',
    baudrate=9600,
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
    weights = np.repeat(1.0, window) / window
    sma = np.convolve(values, weights, 'valid')
    return sma


def compute_rawGPS(raw_val, direction):
    # Separate lat and long. Note: 2 digits to left of decimal point is min, rest is degree
    # Converted to string, to separate degree and minutes
    str_int = str(int((raw_val // 1)))
    str_flt = float((raw_val % 1))  # String as is
    # Left hand side of decimal
    deg = float(str_int[:-2])  # Degree is extracted, will be used as is
    min = float(str_int[-2:])

    flt_val = float(str_flt)  # Right hand side of decimal
    full_minutes = min + flt_val  # Combined

    coord_min = full_minutes / 60.0  # Take coordinate minute

    # To shorten decimal places (string)
    coordinate_val = float(str(deg + coord_min)[:10])

    if direction == "N" or direction == "E":  # Condition to determine whether coord is + or -
        signed_coord = coordinate_val
    else:
        signed_coord = float(("-" + str(coordinate_val)))

    if direction == "W" or direction == "E":  # Just for print, can be removed
        latlong = "Long: "
    else:
        latlong = "Lat: "

    print(signed_coord)
    return signed_coord


def computedGPS():
    ave_lat = 0.0
    ave_lng = 0.0
    gpscnt = 0                  # variable for iteration
    # array to hold all streams in string (for split function)
    strgpsarr = []

    latGPRMC = []               # arrays for lat and long unused
    longGPRMC = []

    latraw_val = 0.0            # initialize coord values and directions
    latdirection = ""
    longraw_val = 0.0
    longdirection = ""

    gpsarr = []                  # array to hold streams in b format
    gpslines = ser.readline()      # read from the port
    strgpslines = str(gpslines).split(',')  # split by ,
    gpsarr.append(strgpslines)

    if len(gpsarr) < 1:          # initial check if something is read
        print("EMPTY")

    else:                        # else proceed to check GPGLL
        if (gpsarr[0][0]) == "b'$GPGLL":
            print("FOUND GPGLL!")

            # Checked initially, the firstmost value of needed
            latraw_check = str(gpsarr[0][1])
            if (latraw_check != ''):
                # GPGLL pattern is $GPGLL, lat, lat_dir, lng, lng_dir
                latraw_val = float(gpsarr[0][1])
                latdirection = str(gpsarr[0][2])
                longraw_val = float(gpsarr[0][3])
                longdirection = str(gpsarr[0][4])

                # subject to computation
                lat = compute_rawGPS(latraw_val, latdirection)
                lng = compute_rawGPS(longraw_val, longdirection)

                # DSP for lat and long
                index_length = 5
                if (len(lat_sma_gps) < index_length):                  # DSP for Lat
                    lat_sma_gps.append(lat)
                else:
                    got_lat_val = movave(lat_sma_gps, index_length)
                    lat_sma_gps.pop(0)
                    lat_sma_gps.append(lat)
                    # print("COMPUTED LAT: ",got_lat_val[0])
                    ave_lat = float("{:.10f}".format(got_lat_val[0]))

                if (len(lng_sma_gps) < index_length):                   # DSP for Lng
                    lng_sma_gps.append(lng)
                else:
                    got_lng_val = movave(lng_sma_gps, index_length)
                    lng_sma_gps.pop(0)
                    lng_sma_gps.append(lng)
                    # print("COMPUTED lng: ",got_lng_val[0])
                    ave_lng = float("{:.10f}".format(got_lng_val[0]))

                    # lat_save = ave_lat                                      # save values in case
                    # lng_save = ave_lng
                coord_pairs = [{"lat": ave_lat}, {
                    "lng": ave_lng}]          # save as is

                # print(coord_pairs)
            else:
                coord_pairs = [{"lat": lat_save}, {"lng": lng_save}]
                print("Position untracked yet! But saved was: ", coord_pairs)

            print(coord_pairs)
            return coord_pairs

    gpscnt += 1
    if gpscnt == 8:
        gpscnt = 0
    # time.sleep(1.5)

# while 1:
#     computedGPS()
