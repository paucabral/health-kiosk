#!/bin/bash

# Run Backend
echo "Deploying backend server..."
cd backend/
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi
[ ! -d "venv/" ] & python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuserwithpassword --username $DEFAULT_ADMIN_USER --password $DEFAULT_ADMIN_PASSWORD --email $DEFAULT_ADMIN_EMAIL --preserve
python3 manage.py runserver 0.0.0.0:8000 &
BACKEND_JOB=$!
echo "$BACKEND_JOB"

# Go back to project root directory
cd ..

# Run Frontend
echo "Deploying frontend server..."
cd frontend/
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi
npm install
npm start &
FRONTEND_JOB=$!
echo "$FRONTEND_JOB"

# Kill processes on SIGINT (Ctrl + C)
trap "kill ${BACKEND_JOB} ${FRONTEND_JOB}; exit 1" SIGINT
echo -e "\n///////////////////////////////////////////////\n"
wait