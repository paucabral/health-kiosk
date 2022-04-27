#!/bin/bash
cd /home/pi/health-kiosk/ || cd ~/health-kiosk/

echo "Starting backend server..."
cd backend/
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi
export DEBUG=False
export ENVIRONMENT=production
export DB_ENVIRONMENT=production

sudo systemctl start apache2

# GPS LOCK UP -- Uncomment on production to set GPS before proceeding
# until python3 rpi/rpi_gps_serial/get_location.py; do
#     echo Getting location failed, retrying in 2 seconds...
#     sleep 2;
# done

cd ..

echo "Starting frontend server..."
cd frontend/
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi
serve -l 3000 -s build &

# Application Display
cd ..
until curl -s http://localhost:3000 | grep "HEALTH KIOSK"; do
    echo "Waiting for the application to deploy, retrying in 2 seconds..."
    sleep 2;
done
chromium-browser --kiosk http://localhost:3000 || chromium --kiosk http://localhost:3000