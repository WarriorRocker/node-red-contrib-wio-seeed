# node-red-contrib-wio-seeed
This package contains many nodes for Node-Red that make using Wio modules such as Grove sensors and displays more streamlined. Currently supported are all of the modules included in the Wio Link Deluxe Kit Plus, all Generic inputs and outputs provided by the Wio board, and many more. Contributions and improvements are welcomed.

## Install
```
$ npm -g install node-red-contrib-wio-seeed
```

## Configuration
All of the nodes included in this package require the access token provided when logging into Seeed's IOT API. Currently the only way to obtain this token is by performing a post request to the API.

http://seeed-studio.github.io/Wio_Link/#user-login

Write down the resulting token as you should only need to do this once. Next in Node-RED drag one of the nodes under the Wio category and open the configuration dialog. The first time a Wio node is used for a particular flow you will need to click the pencil icon next to the Connection field to add a new wio-config node.

Enter your token and change the server to a private Wio server or leave it as default for use with the official Seeed IOT API server. Next select Add then select Ok and deploy the current flow. You may need to allow the flow to be deployed even if the node(s) are not fully configured. This is due to the way the Node-RED admin interface works, see the TODO list if you think you can make this better. Once you have deployed the wio-config for the first time with your current flow all subsequent Wio nodes can be easily managed without needing to deploy again.

Now re-open the configuration dialog for the Wio node and you should see all of the Wio Nodes (devices) under your user account. Select the correct Node and the correct Port should be automatically selected, if there is more than one compatible module configured you can use the drop down to select the correct Port identifier. Lastly select any additional options and select Ok. .. That's it! You should now be able to easily interact with your Wio using Node-RED.

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

### wio-output
This node provides the ability to drive modules with a boolean state such as a relay manually to the desired state or automatically using the payload value.

| Name | Module | Method |
| --- | --- | --- |
| Generic Digital Output | GenericDOut | onoff |
| Grove Relay | GroveRelay | onoff |
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
| Grove Air Quality | GroveAirquality | quality | quality |
| Grove Gesture | GroveGesture | motion | motion |
| Grove Barometer BMP28 | GroveBaroBMP280 | temperature | temperature |
| | | altitude | altitude |
| | | pressure | pressure |

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
- Update the wio-config node to utilize Node-RED credential storage for the username and password and perform the request for a new access token dynamically.
- Refactor the wio-common functions into a more robust and reusable class.
- Move the admin interface functions into a service provided by the wio-config node to unify the usage of $.getJSON and https.request.

## Known Issues and Limitations
- Although the option is provided to set a different server I have not yet tested this using a private Wio server, although this is planned in the near future.
- Sometimes it may be necessary to re-open the configuration dialog when Nodes or Ports fail to appear and should be fixed as part of the TODO's above.
