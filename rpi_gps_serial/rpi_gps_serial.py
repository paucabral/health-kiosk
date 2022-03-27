#!/usr/bin/env python
import time
import serial

ser = serial.Serial(
    port='/dev/ttyS0',
    baudrate = 9600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
)

gpscnt = 0
strgpsarr = []
latGPRMC = []
longGPRMC = []
latraw_val = 0.0
latdirection = ""
longraw_val = 0.0
longdirection = ""

def compute_rawGPS(raw_val, direction):
    #Separate lat and long. Note: 2 digits to left of decimal point is min, rest is degree
    str_int = str(int((raw_val//1))) #Converted to string, to separate degree and minutes
    # str_flt = ("{:.4f}".format(raw_val%1)) # String as is
    str_flt = float((raw_val%1)) # String as is

    #Left hand side of decimal
    deg = float(str_int[:-2]) #Degree is extracted, will be used as is
    min = float(str_int[-2:])

    #Right hand side of decimal
    flt_val = float(str_flt)

    #combined
    full_minutes = min+flt_val

    #To take coordinate minute, refer to formula above
    # coord_min = ("{:.4f}".format(full_minutes/60))
    coord_min = full_minutes/60

    coordinate_val = float(str(deg+coord_min)[:8])
    if direction == "N" or direction == "E":
        signed_coord = coordinate_val

    else:
        signed_coord = float(("-"+str(coordinate_val)))
        
    if direction == "W" or direction == "E":
        latlong = "Long: "

    else:
        latlong = "Lat: "
    print(latlong, signed_coord)


def computedGPS():
    gpsarr = []
    gpslines=ser.readline()
    strgpslines = str(gpslines).split(',')
    gpsarr.append(strgpslines)
    if len(gpsarr) < 1:
        print("EMPTY")

    else:
        if (gpsarr[0][0]) == "b'$GPGLL":
            print("FOUND IT!")
            # latraw_val = float(gpsarr[0][1])
            # latdirection = str(gpsarr[0][2])
            # longraw_val = float(gpsarr[0][3])
            # longdirection = str(gpsarr[0][4])
            latraw_val = float(1437.57826)
            latdirection = str('N')
            longraw_val = float(12105.98656)
            longdirection = str('E')            
            print("RAW_Lat:",latraw_val)
            print("RAW_latdir:",latdirection)
            print("RAW_Long:",longraw_val)
            print("RAW_longdir:",longdirection)
            lat = compute_rawGPS(latraw_val, latdirection)
            lng = compute_rawGPS(longraw_val, longdirection)
            coord_dic = {"lat": lat, "lng": lng}
            jsonStr = json.dumps(coord_dic)
    
    
    gpscnt+=1
    if gpscnt==8:
        gpscnt = 0
    # time.sleep(1.5)

while 1:
    computedGPS()