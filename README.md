# node-red-contrib-wio-seeed
This project contains Wio Link Nodes using Grove modules for use with Node RED.

## Install
something something

## Nodes

### wio-grove-sensor
This node contains many Grove sensors and an option for returning the full JSON response or the parsed sensor output.

#### GroveTemp - Grove Temperature
temp: temperature - Celsius Temperature

#### GroveTempHum - Grove Temperature & Humidity
temperature: celsius_degree - Celsius Temperature
temperature_f: fahrenheit_degree - Fahrenheit Temperature
humidity: humidity - Humidity

#### GroveUltraRanger - Grove Ultrasonic Ranger
range_in_inch: range_inch - Inches Range
range_in_cm: range_cm - Centimeters Range

#### GrovePIRMotion - Grove PIR Motion
approach: approach - Approach

#### GroveAirquality - Grove Air Quality
quality: quality - Quality

#### GroveBaroBMP280 - Grove Barometer BMP28
temperature: temperature - Celsius Temperature
altitude: altitude - Altitude
pressure: pressure - Pressure

#### GroveDigitalLight - Grove Digital Light
lux: lux - Lux

#### GroveMoisture - Grove Moisture
moisture: moisture - Moisture

#### GroveGesture - Grove Gesture
motion: motion - Motion

#### GroveIRRecv - Grove Infrared Receiver
protocol_parameters: n/a - Protocol Parameters
last_data_recved: last_data_recved - Last Data Received

#### GroveMagneticSwitch - Grove Magnetic Switch
approach: mag_approach - Approach

### wio-grove-relay [GroveRelay - Grove Relay]
This node provides the ability to drive the relay manually to the desired state or automatically using the payload value.

### wio-grove-digit [Grove4Digit - Grove 4-Digit Display]
This node provides the ability to set single or multiple characters on the display using the payload value.

### wio-grove-ws2812 [GroveLedWs2812 - Grove WS2812 LED Strip]
This node provides the ability to set single or multiple LED's to the specified colors manually or automatically using the payload value.
