#!/bin/bash

echo "Deploying backend server..."
cd backend/
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi
export ENVIRONMENT=production
export DB_ENVIRONMENT=production
[ ! -d "venv/" ] & python3 -m venv venv
source venv/bin/activate
sudo su postgres <<EOF
psql -c "SELECT 'CREATE DATABASE $DB_NAME' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')"
psql -c "
  do
  $$
  begin
    if exists (select * from pg_user where rolname = '$DB_USER') then 
      create role $DB_USER password '$DB_PASSWORD';
    end if;
  end
  $$
  ;
"
psql -c "grant all privileges on database $DB_NAME to $DB_USER;"
echo "Postgres User '$DB_USER' and database '$DB_NAME' created."
EOF
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuserwithpassword --username $DEFAULT_ADMIN_USER --password $DEFAULT_ADMIN_PASSWORD --email $DEFAULT_ADMIN_EMAIL --preserve
gunicorn heath-kiosk.wsgi

cd ..

echo "Deploying frontend server..."
cd frontend/
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi
npm run build
serve -l 3000 -s build