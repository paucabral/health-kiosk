#!/bin/bash

# Run Backend
cd backend
[ ! -d "venv/" ] & python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver &
BACKEND_JOB=$!
echo "$BACKEND_JOB"

# Go back to project root directory
cd ..

# Run Frontend
cd frontend
npm install
npm start &
FRONTEND_JOB=$!
echo "$FRONTEND_JOB"

# Kill processes on SIGINT (Ctrl + C)
trap "kill ${BACKEND_JOB} ${FRONTEND_JOB}; exit 1" SIGINT
echo -e "\n///////////////////////////////////////////////\n"
wait