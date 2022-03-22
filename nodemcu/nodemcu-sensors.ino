//***New code: Working Sensors and Automated BP (with millis) ***
//***Communicates with RPi through router (rpi as extender being developed)***
#include "ESP8266WiFi.h"
#include <aREST.h>
#include <Wire.h>
#include <string.h>
#include <Adafruit_MLX90614.h>
#include "MAX30100_PulseOximeter.h"

//********MAX30100 variables**********
#define REPORTING_PERIOD_MS     1000
PulseOximeter pox;
uint32_t tsLastReport = 0;
int spo2;
int spo2comp;
int spo2aux;
int maxNoRead = 0;

void onBeatDetected()
{
    Serial.println("Beat!");
}

//*********MLX90614 variables**************
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
double mlxobj;
float mlxobjAvg;
float thermtemp;      //Following three variables are for calibration
float thermmax;   
float thermmin;

const float alpha = 0.3; //Following variables are for Exponential Moving Average
double tempAvg = 0.0;
int i = 0;
double cur_sample = 0.0;
double cur_avg = 0.0;

//***********BP variables*****************
#define buttonD6 D6                     // Physical Extension Switch
#define buttonD7 D7                     // Virtual Power Switch
#define buttonD8 D8                     // Virtual Memory Switch
#define bpREPORTING_PERIOD_MS 62000     // Time to state sys/dia (to check if automation works)
#define bpSHUT_PERIOD_MS 10000          // Time to shutdown BP
uint32_t bpStartReport = 0;             // millis comparison
uint32_t bpCurrentReport = 0;           // ^
uint32_t bpToShutReport = 0;            // ^
int virtualPower = 0;                   // Instantiate as LOW
int virtualMemory = 0;                  // ^
int mainButtonState = 0;                // ^

const byte numChars = 38;               // Total characters that can be received through BP Serial
char receivedChars[numChars];           // Read BP Serial
char bpChars[numChars];                 // Used for conversion for input for computation
char bpCharToken[numChars];             // Pointer

String rawSYS;                          // String variables to convert with strtol
String rawDIA;
String rawPR;
int dataSYS;                            // Stores the converted strtol (in int)
int dataDIA;
int dataPR;

boolean newData = false;                // Check if new data comes from BP Serial

//API Server configuration
aREST rest = aREST();                   //Create aREST instance

const char* ssid = "PLDTHOMEFIBR76798"; //Connect to local WiFi
const char* password = "PLDTWIFI8g59t";

#define LISTEN_PORT 80                  //incoming TCP connection port
WiFiServer server(LISTEN_PORT);         //Create server instance

void setup()
{
  Serial.begin(115200);

  WiFi.begin(ssid, password);                   //Connect to WiFi
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  server.begin();
  Serial.println("Server started");
  Serial.println(WiFi.localIP());
  WiFi.setAutoReconnect(true);
  WiFi.persistent(true);

  //******* Start and configuration of MAX30102 *******
    Serial.print("Initializing pulse oximeter..");
    if (!pox.begin()) {
        Serial.println("FAILED");
        for(;;);
    } else {
        Serial.println("SUCCESS");
    }
    mlx.begin();  

    pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
    pox.setOnBeatDetectedCallback(onBeatDetected);

                           
  // ******* Assign variables for API ********
  rest.variable("tempAvg",&tempAvg);
  rest.variable("spo2", &spo2);
  rest.variable("sys", &dataSYS);
  rest.variable("dia", &dataDIA);
  rest.variable("pr", &dataPR);
  
  rest.set_id("1");
  rest.set_name("vital_signs");
  pinMode(buttonD6, INPUT);
  pinMode(buttonD7, OUTPUT);
  pinMode(buttonD8, OUTPUT);
  digitalWrite(buttonD8, HIGH);
  digitalWrite(buttonD7, HIGH);
}

void loop()
{
  pox.update();
  mainButtonState = digitalRead(buttonD6);
  if (WiFi.status() != WL_CONNECTED){
    Serial.println("Disconnected...");
    ESP.reset();
    Serial.print("Reconnected...");
  }
 
  if (mainButtonState == HIGH){
    virtualPower = 1;
  }

  if (virtualPower == 1) {
    bpStartReport = millis();
    bpToShutReport = millis();
    virtualPowerSwitch();
    virtualPower = 0;
    virtualMemory = 1;
  }

  if (virtualMemory == 1){
    bpCurrentReport = millis();
    if (bpCurrentReport - bpStartReport > bpREPORTING_PERIOD_MS){
      Serial.print(bpCurrentReport);
      Serial.print(" - ");
      Serial.print(bpStartReport);
      Serial.print(" = ");
      Serial.println(bpCurrentReport - bpStartReport);
      virtualMemorySwitch();
      bpStartReport = bpCurrentReport;
      if (bpCurrentReport - bpToShutReport > bpSHUT_PERIOD_MS){
        virtualPowerSwitch();
        bpToShutReport = bpCurrentReport;
        mlx.begin();
        virtualMemory = 0;
      }
    }
  }
   
  if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
//      Serial.print("pO2:");
//      Serial.print(pox.getSpO2());
//      Serial.print("% \t");
      spo2 = pox.getSpO2();
      spo2comp = spo2;
      spo2aux = spo2comp;
      
      if (spo2 == spo2comp && spo2 !=0){
        maxNoRead += 1;
        if (maxNoRead == 7){
          Serial.println("Re-init Max");
          pox.begin();
        }
      }
      tsLastReport = millis();
//      Serial.print("\tObject = "); 
//      Serial.print(mlx.readObjectTempC()); 
//      Serial.print("*C\t");
//      Serial.println("");
//      mlxobj = mlx.readObjectTempC();
        cur_sample = mlx.readObjectTempC();
        cur_avg = (cur_sample*alpha) + ((tempAvg)*(1-alpha));
        tempAvg = cur_avg;
  }

  //BP
  recvWithEndMarker();
  bpData();

  

  WiFiClient client = server.available();
  if (!client){
    return;
  }
  while(!client.available()){
    delay(1);
  }
  rest.handle(client);

}

void recvWithEndMarker() {
    static byte ndx = 0;
    static byte index = 0;
    char endMarker = '\n';
    char rc;
    
    while (Serial.available() > 0 && newData == false) {
        rc = Serial.read();

        if (rc != endMarker) {
            receivedChars[ndx] = rc;
            ndx++;
            if (ndx >= numChars) {
                ndx = numChars - 1;
            }
        }
        else {
            receivedChars[ndx] = '\0'; // terminate the string
            ndx = 0;
            newData = true;
        }
       if (ndx >= 37){
        for (int i = 0; i<sizeof(receivedChars); i++){
          bpChars[i] = receivedChars[i];
        }
       }
      }
     }

void bpData() {
    if (newData == true) {
      
      strcpy(bpCharToken, bpChars);
      Serial.println(bpCharToken);
      char* piece = strtok(bpCharToken," ");

      rawSYS = piece;
      rawDIA = strtok(NULL," ");
      strtok(NULL," ");
      rawPR = strtok(NULL," ");
      
      dataSYS = strtol(rawSYS.c_str(), NULL, 16);
      dataDIA = strtol(rawDIA.c_str(), NULL, 16);
      dataPR= strtol(rawPR.c_str(), NULL, 16);

      Serial.print("dataSYS: ");
      Serial.println(dataSYS);
      Serial.print("dataDIA: ");
      Serial.println(dataDIA);    
      Serial.print("dataPR: ");
      Serial.println(dataPR);

      pox.begin();
      newData = false;
    }
}


void virtualPowerSwitch() {
  digitalWrite(buttonD7, HIGH);
  Serial.println("BUTTON D7: HIGH");
  delay(500);
  digitalWrite(buttonD7, LOW);
  Serial.println("BUTTON D7: LOW");
  delay(500);
  digitalWrite(buttonD7, HIGH);
  Serial.println("BUTTON D7: HIGH");
  delay(500);
}

void virtualMemorySwitch() {
  for (int i = 0; i < 2; i++){
    digitalWrite(buttonD8, HIGH);
    Serial.println("BUTTON D8: HIGH");
    delay(500);
    digitalWrite(buttonD8, LOW);
    Serial.println("BUTTON D8: LOW");
    delay(500);
    digitalWrite(buttonD8, HIGH);
    Serial.println("BUTTON D8: HIGH");
    delay(500);
  }
}