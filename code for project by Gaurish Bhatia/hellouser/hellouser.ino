
// Name : Gaurish Bhatia
// This is the code for the implementation of the two way communication via the use of MQTT.

// including the required libraries.
#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>

// Defining the variables for the interrupt and the actuators.
const byte interruptPin = 2;
const byte buzzer = LED_BUILTIN;
bool buttonstate = 0;

//SSID and Password for the internet.
char ssid[] = "gaurish";
char pass[] = "1234567890";

//varibale for the topic on which the GUI will publish the message.
const char topic[] = "shms/rec";

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "broker.hivemq.com";
int port = 1883;
const char topic1[] = "shms";

volatile bool buttonPressed = false;

// Setup and defining the interface and interrupt for each of the input and the output.
void setup() {
  pinMode(buzzer, OUTPUT);
  pinMode(interruptPin, INPUT_PULLUP);
  Serial.begin(9600);

  // ataching an interrupt to carry out the handlebuttonpress function in case the push button is pressed.
  attachInterrupt(digitalPinToInterrupt(interruptPin), handleButtonPress, RISING);

  while (!Serial) {
    // wait for serial port to connect
  }

  Serial.print("Attempting to connect to WPA SSID: ");
  Serial.println(ssid);
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    Serial.print(".");
    delay(5000);
  }

  Serial.println("You're connected to the network");
  Serial.println();

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(broker);

  if (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());
    while (1);
  }

  Serial.println("You're connected to the MQTT broker!");
  mqttClient.subscribe(topic);
  Serial.println();
}

void loop() {

  //Checking for any message on the mqtt client.
  int messageSize = mqttClient.parseMessage();
  if (messageSize) {
    // use the Stream interface to print the contents
    while (mqttClient.available()) {
      Serial.print((char)mqttClient.read());
      buttonstate = 1;
    }


  }
  // blinking the LED 3 times.
  if (buttonstate == 1) {
    digitalWrite(buzzer, HIGH);
    delay(3000);
    digitalWrite(buzzer, LOW);
    buttonstate = 0;
  }


}

// function for interrupt and sending the message onto the topic1, which will be displayed onto the GUI.
  void handleButtonPress() {
    mqttClient.poll();
    mqttClient.beginMessage(topic1);
    mqttClient.print("Emergency !!!! ");
    mqttClient.endMessage();
    buttonstate = 1;
  }
