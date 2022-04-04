// Testing playground for BP Automation
// Note: Must have sufficient delay in between (500ms)
// Pins 2 and 4 are GND; Pins 1 and 3 are VCC
// K is optimal (HIGH LOW HIGH) on Pins 1 or 3 (3 in this case)

#define switchPin D8          // Virtual Switch pin
String input;

void setup() {
  Serial.begin(115200);
  // initialize the pushbutton pin as an input:
  pinMode(switchPin, OUTPUT);
}

void loop() {
      if(Serial.available()){
        input = Serial.read();
        if (input == "h"){
          digitalWrite(switchPin, HIGH);
          delay(500);
        }
        else if (input == "l"){
          digitalWrite(switchPin, LOW);
          delay(500);
        }
        else if (input == "k"){
          digitalWrite(switchPin, HIGH);
          delay(500);
          digitalWrite(switchPin, LOW);
          delay(500);
          digitalWrite(switchPin, HIGH);
          delay(500);
        }
        else if (input == "j"){
          digitalWrite(switchPin, LOW);
          delay(500);
          digitalWrite(switchPin, HIGH);
          delay(500);
          digitalWrite(switchPin, LOW);
          delay(500);
        }
        Serial.println(input);
    }
}