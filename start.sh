#!/bin/bash

echo "Starting backend server..."
cd backend/
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi
export DEBUG=False
export ENVIRONMENT=production
export DB_ENVIRONMENT=production
[ ! -d "venv/" ] & python3 -m venv venv
source venv/bin/activate
python3 manage.py runserver 0.0.0.0:8000 &

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