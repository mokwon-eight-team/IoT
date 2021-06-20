import serial
import post_data

ser = serial.Serial(port = '/dev/ttyACM0', baudrate = 9600)

while True:
    sensordata = ser.readline()
    print(sensordata)
    post_data.http_post_data(sensordata)