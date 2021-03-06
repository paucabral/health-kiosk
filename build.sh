#!/bin/bash

cd /home/pi/health-kiosk/ || cd ~/health-kiosk/

# Open Ports
sudo chmod 666 /dev/ttyAMA1
sudo chmod 666 /dev/ttyS0

echo "Building backend server..."
cd backend/
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi
export DEBUG=False
export ENVIRONMENT=production
export DB_ENVIRONMENT=production

mkdir -p build/django/
mkdir -p build/site/
mkdir -p build/site/logs/
mkdir -p build/site/public/

cd build/

cd django/

cp -R ../../../backend/. .

mkdir -p media/
chmod 777 media/

sudo su postgres <<EOF
createdb $DB_NAME
psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
psql -c "ALTER USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
psql -c "grant all privileges on database $DB_NAME to $DB_USER;"
echo "Postgres User '$DB_USER' and database '$DB_NAME' created."
EOF

[ ! -d "venv/" ] & python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
python3 manage.py collectstatic --noinput
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuserwithpassword --username $DEFAULT_ADMIN_USER --password $DEFAULT_ADMIN_PASSWORD --email $DEFAULT_ADMIN_EMAIL --preserve

sudo cp apache.conf /etc/apache2/sites-available/000-default.conf
sudo a2enmod ssl
sudo apache2ctl configtest
sudo systemctl restart apache2
sudo systemctl enable apache2

cd /home/pi/health-kiosk/ || cd ~/health-kiosk/

echo "Building frontend server..."
cd frontend/
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi
npm run build
