until python3 rpi/rpi_gps_serial/get_location.py; do
    echo Getting location failed, retrying in 2 seconds...
    sleep 2;
done