#GPRMC info => $GPRMC,194530.000,A,3051.8007,N,10035.9989,W,1.49,111.67,310714,,,A*74
#Take => lat=3051.8007; long=10035.9989
#lat -> 30 deg; 51.8007 mins, divide -> 51.8007/60 = 0.86335, therefore 30.806335
#long -> 100 deg, 35.9989 mins, divide ->  35.9989/60 = 0.59998, therefore 100.59998
#Must be: for lat N(+), S(-); for long E(+), W(-)
# raw_lat = 3051.8007
# raw_long = 10035.9989

# latGPRMC = [3051.8007, "N"]
# longGPRMC = [10035.9989, "W"]

latGPRMC = [1437.57826, "N"]
longGPRMC = [12105.98656, "E"]

#NMEA Parser and computation(lat,long)
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
    
latraw_val, latdirection = latGPRMC    
longraw_val, longdirection = longGPRMC   
 
compute_rawGPS(latraw_val, latdirection)
compute_rawGPS(longraw_val, longdirection)
