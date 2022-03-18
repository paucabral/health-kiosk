
#define buttonPin D8
void setup() {
  Serial.begin(115200);
  String input;
void loop() {
  // emulate the state of the pushbutton value:
      if(Serial.available()){
        input = Serial.read();
        Serial.print("You typed: " );
        Serial.println(input);
        if (input == "h"){
          millis(1000);
          digitalWrite(buttonPin, HIGH);
          millis(1500);
        }
        else if (input == "l") {
          millis(1000);
          digitalWrite(buttonPin, LOW);
          millis(1500);
        }
    }
}
