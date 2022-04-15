import serial
import os, time


# Enable Serial Communication
port = serial.Serial("/dev/ttyS0", baudrate=9600, timeout=1)

# Transmitting AT Commands to the Modem
# '\r\n' indicates the Enter key

#Vars
main_no = '09454776783'
contact_no = main_no.replace("0","+63",1)
body_temp = str(35.58)
pulse_rate = str(88)
spo2 = str(97)


port.write('AT'.encode())
port.write('\r\n'.encode())
time.sleep(1)

port.write('AT'.encode())       # Double this to confirm start
port.write('\r\n'.encode())
time.sleep(1)

port.write('ATE0'.encode())      # Disable the Echo
port.write('\r\n'.encode())
time.sleep(1)

port.write('AT+CMGF=1'.encode())  # Select Message format as Text mode
port.write('\r\n'.encode())
time.sleep(1)

# port.write('AT+CNMI=2,1,0,0,0'+'\r\n')   # New SMS Message Indications
# rcv = port.read(10)
# print rcv
# time.sleep(1)

port.write('AT+CMGS="{}"'.format(contact_no).encode()) # Sending a message to a particular Number
port.write('\r\n'.encode())
# rcv = port.read(10)
# print(rcv)
time.sleep(1)


port.write('Good day... message.. is\nBody Temperature: {}*C\nPulse Rate: {} BPM\nOxygen Saturation: {}% '.format(body_temp, pulse_rate, spo2).encode()) # Message
port.write('\r\n'.encode())
# rcv = port.read(10)
# print(rcv)
print("NUMBER:",contact_no)
port.write("\x1A".encode()) # Enable to send SMS
for i in range(10):
    rcv = port.read(10)
    print(rcv)