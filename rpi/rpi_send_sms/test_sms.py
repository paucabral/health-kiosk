#Test confirmation comms
import serial
import os, time

port = serial.Serial('/dev/ttyS0', baudrate=9600, timeout=1)

port.write("AT".encode())
port.write('\r\n'.encode())
rcv=port.read(10)
print(rcv)

port.write('AT+CMGS="+639709467719"'.encode())
port.write('\r\n'.encode())
rcv=port.read(10)
print(rcv)

port.write('Here is a test message from health kiosk'.encode())
port.write('\r\n'.encode())
port.write('\x1A'.encode())
# port.write('\x1A'.encode())
port.write('\r\n'.encode())
rcv=port.read(10)
print(rcv)