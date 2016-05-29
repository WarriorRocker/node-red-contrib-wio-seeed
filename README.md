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

| Name | Module | Method | Parsed Value |
| --- | --- | --- | --- |
| Generic Digital Input | GenericDIn | input | input |
| Generic Digital Output | GenericDOut | onoff_status | onoff |
| Generic PWM Output | GenericPWMOut | pwm | |
| Generic Analog Input | GenericAIn | analog | analog |
| Grove Button | GroveButton | pressed | pressed |
| Grove Moisture | GroveMoisture | moisture | moisture |
| Grove Ultrasonic Ranger | GroveUltraRanger | range_in_inch | range_inch |
| | | range_in_cm | range_cm |
| Grove Temperature | GroveTemp | temp | temperature |
| Grove Infrared Receiver | GroveIRRecv | protocol_parameters | |
| | | last_data_recved | last_data_recved |
|  Grove Temperature & Humidity Pro | GroveTempHumPro | temperature | celsius_degree |
| | | temperature_f | fahrenheit_degree |
| | | humidity | humidity |
|  Grove Temperature & Humidity | GroveTempHum | temperature | celsius_degree |
| | | temperature_f | fahrenheit_degree |
| | | humidity | humidity |
| Grove PIR Motion | GrovePIRMotion | approach | approach |
| Grove Digital Light | GroveDigitalLight | lux | lux |
| Grove 3-Axis Digital Compass | GroveCompass | compass_heading | heading_deg |
| Grove Magnetic Switch | GroveMagneticSwitch | approach | mag_approach |
| Grove 3-Axis Digital Accelerometer | GroveAccMMA7660 | shaked | shaked |
| Grove IR Distance Interrupter | GroveIRDistanceInterrupter | approach | approach |
| Grove Air Quality | GroveAirquality | quality | quality |
| Grove Gesture | GroveGesture | motion | motion |
| Grove Barometer BMP28 | GroveBaroBMP280 | temperature | temperature |
| | | altitude | altitude |
| | | pressure | pressure |

### wio-relay [GroveRelay - Grove Relay]
This node provides the ability to drive the relay manually to the desired state or automatically using the payload value.

### wio-digit [Grove4Digit - Grove 4-Digit Display]
This node provides the ability to set single or multiple characters on the display using the payload value.

### wio-ws2812 [GroveLedWs2812 - Grove WS2812 LED Strip]
This node provides the ability to set single or multiple LED's to the specified colors manually or automatically using the payload value.
