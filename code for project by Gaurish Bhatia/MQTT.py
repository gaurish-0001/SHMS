# Name : Gaurish Bhatia
# Remarks: This is the code for the implementation of the mqtt broker on the raspberry pi 4.
# Importing the paho mqtt library.
import paho.mqtt.client as mqtt

# Variables 
broker_address = "broker.hivemq.com" # Replace with your HiveMQ broker address
port = 1883  # Default MQTT port
topic = "shms"  # Replace with the MQTT topic you want to subscribe to

# function for callback when the device is connected to the MQTT broker.
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT broker")
        client.subscribe(topic)
    else:
        print(f"Failed to connect to MQTT broker with code {rc}")

# Function for callback in case a message is recieved.
def on_message(client, userdata, message):
    print(f"Received message on topic '{message.topic}': {message.payload.decode()}")

# Creating an MQTT client variable and initialising it.
client = mqtt.Client()

# Setting the functions for callback.
client.on_connect = on_connect
client.on_message = on_message

# Connecting to the  MQTT broker,
client.connect(broker_address, port)

#the loop for always listening on the mqtt broker.
client.loop_forever()