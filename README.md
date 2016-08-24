# node-red-contrib-wio-seeed
This package contains many nodes for Node-RED that make using Wio modules such as Grove sensors and displays more streamlined. Currently supported are all of the modules included in the Wio Link Deluxe Kit Plus, all Generic inputs and outputs provided by the Wio board, and many more. Contributions and improvements are welcomed.

![Node-RED Wio Nodes](http://www.xodustech.com/images/nodered/node-red-flows.png) 

## Install
```
$ npm install node-red-contrib-wio-seeed
```

## Configuration
All of the nodes included in this package require the access token provided when logging into Seeed's IOT API. The token can be obtained by logging in with your email and password or entered manually when adding the config node.

Once the config node is added or updated in the Connections section of the node then select the desired Node from the list. Once a Node is selected the correct Port should be automatically selected, if there is more than one compatible module configured you can use the drop down to select the correct Port identifier and Module name. Lastly select any additional options and select Ok. .. That's it! You should now be able to easily interact with your Wio using Node-RED.

Instructions on how to obtain a token manually can be found in Seeed's IoT API docs at: http://seeed-studio.github.io/Wio_Link/#use-seeed-39-s-user-system

## Nodes

### wio-digit
This node provides the ability to set single or multiple characters on the display using the payload value.

| Name | Module | Method |
| --- | --- | --- |
| Grove 4 Digit | Grove4Digit | display_digits |
| | | display_one_digit |

## wio-display
This node provides the ability to set strings and values on the display using the payload value.

| Name | Module | Method |
| --- | --- | --- |
| Grove LCD RGB Backlight | GroveLCDRGB | string |
| Grove OLED 128x64 | GroveOLED12864 | string |

### wio-event
This node contains many Wio events and an option for returning the full JSON response or switched input for the parsed output.

| Name | Module | Parsed Value | Description |
| --- | --- | --- | --- |
| Generic Digital Input | GenericDIn | input_changed | Input Changed |
| Grove Button | GroveButton | button_pressed | Button Pressed |
| Grove Infrared Receiver | GroveIRRecv | ir_recv_data_len | Data Length |
| | | ir_recv_data_hex | Data Hex |
| Grove PIR Motion | GrovePIRMotion | ir_moved | PIR Motion |
| Grove Magnetic Switch | GroveMagneticSwitch | mag_approach | Approach |
| Grove IR Distance Interrupter | GroveIRDistanceInterrupter | ir_approached | IR Approached |

### wio-output
This node provides the ability to drive modules with a boolean state such as a relay manually to the desired state or automatically using the payload value.

| Name | Module | Method |
| --- | --- | --- |
| Generic Digital Output | GenericDOut | onoff |
| Grove Electromagnet | GroveElecMagnet | onoff |
| Grove Relay | GroveRelay | onoff |
| Grove SPDT Relay | GroveSPDTRelay30A | onoff |
| Grove Dry Reed Relay | GroveDryReedRelay | onoff |

### wio-pwm
This node provides the ability to set the duty and frequency for a PWM signal manually or automatically using the payload value.

| Name | Module | Method |
| --- | --- | --- |
| Generic PWM Output | GenericPWMOut | pwm |
| | | pwm_with_freq |

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
| Grove Electromagnet | GroveElecMagnet | onoff_status | onoff |
| Grove Air Quality | GroveAirquality | quality | quality |
| Grove Gesture | GroveGesture | motion | motion |
| Grove Barometer BMP28 | GroveBaroBMP280 | temperature | temperature |
| | | altitude | altitude |
| | | pressure | pressure |
| Grove Relay | GroveRelay | onoff_status | onoff |
| Grove SPDT Relay | GroveSPDTRelay30A | onoff_status | onoff |
| Grove Dry Reed Relay | GroveDryReedRelay | onoff_status | onoff |
| Grove Servo | GroveServo | angle | degree |

### wio-servo
This node provides the ability to drive a servo to the desired angle over a duration manually or automatically using the payload value.

| Name | Module | Method |
| --- | --- | --- |
| Grove Servo | GroveServo | angle_motion_in_seconds |

### wio-speaker
This node provides the ability to output, start, or stop a sound on the speaker manually or automatically using the payload value.

| Name | Module | Method |
| --- | --- | --- |
| Grove Speaker | GroveSpeaker | sound_ms |
| | | sound_start |
| | | sound_stop |

### wio-ws2812
This node provides the ability to set single or multiple LED's to the specified colors manually or automatically using the payload value.

| Name | Module | Method |
| --- | --- | --- |
| Grove LED WS2812 | GroveLedWs2812 | segment |

## Todo
- Refactor the wio-common functions into a more robust and reusable class.
- Move the admin interface functions into a service provided by the wio-config node to unify the usage of $.getJSON and https.request.
- ~~Update the wio-config node to utilize Node-RED credential storage for the username and password and perform the request for a new access token dynamically.~~

## Known Issues and Limitations
- Although the option is provided to set a different server I have not yet tested this using a private Wio server, although this is planned in the near future.
- Sometimes it may be necessary to re-open the configuration dialog when Nodes or Ports fail to appear and should be fixed as part of the TODO's above.
