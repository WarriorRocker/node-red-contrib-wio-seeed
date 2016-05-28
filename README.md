# node-red-contrib-wio-seeed
This project contains Wio Link Nodes using Grove modules for use with Node RED.

## Install
something something

## Nodes

### wio-event
This node contains many Wio events and an option for returning th full JSON response or switched input for the parsed output.

| Name | Module | Parsed Value | Description |
| --- | --- | --- | --- |
| Generic Digital Input | GenericDIn | input_changed | Input Changed |
| Grove Button | GroveButton | button_pressed | Button Pressed |
| Grove Infrared Receiver | GroveIRRecv | ir_recv_data_len | Data Length |
| | | ir_recv_data_hex | Data Hex |
| Grove PIR Motion | GrovePIRMotion | ir_moved | PIR Motion |
| Grove Magnetic Switch | GroveMagneticSwitch | mag_approach | Approach |
| Grove IR Distance Interrupter | GroveIRDistanceInterrupter | ir_approached | IR Approached |


### wio-sensor
This node contains many Wio sensors and an option for returning the full JSON response or the parsed sensor output.

| Name | Module | Method | Parsed Value | Description |
| --- | --- | --- | --- | --- |
| Grove Temperature | GroveTemp | temp | temperature | Celsius Temperature |
|  Grove Temperature & Humidity | GroveTempHum | temperature | celsius_degree | Celsius Temperature |
| | | temperature_f | fahrenheit_degree | Fahrenheit Temperature |
| | | humidity | humidity | Humidity |
| Grove Ultrasonic Ranger | GroveUltraRanger | range_in_inch | range_inch | Inches Range |
| | | range_in_cm | range_cm | Centimeters Range |
| Grove PIR Motion | GrovePIRMotion | approach | approach | Approach |
| Grove Air Quality | GroveAirquality | quality | quality | Quality |
| Grove Barometer BMP28 | GroveBaroBMP280 | temperature | temperature | Celsius Temperature |
| | | altitude | altitude | Altitude |
| | | pressure | pressure | Pressure |
| Grove Digital Light | GroveDigitalLight | lux | lux | Lux |
| Grove Moisture | GroveMoisture | moisture | moisture | Moisture |
| Grove Gesture | GroveGesture | motion | motion | Motion |
| Grove Infrared Receiver | GroveIRRecv | protocol_parameters | | Protocol Parameters |
| | | last_data_recved | last_data_recved | Last Data Received |
| Grove Magnetic Switch | GroveMagneticSwitch | approach | mag_approach | Approach |

### wio-relay [GroveRelay - Grove Relay]
This node provides the ability to drive the relay manually to the desired state or automatically using the payload value.

### wio-digit [Grove4Digit - Grove 4-Digit Display]
This node provides the ability to set single or multiple characters on the display using the payload value.

### wio-ws2812 [GroveLedWs2812 - Grove WS2812 LED Strip]
This node provides the ability to set single or multiple LED's to the specified colors manually or automatically using the payload value.
