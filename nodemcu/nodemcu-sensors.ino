//***Practice code for testing multiple I2C devices, and being a server for API***
//***Next step is to make NodeMCU as server, to communicate with RPi***
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

//***********BP variables*****************
const byte numChars = 38;
char receivedChars[numChars];
char bpChars[numChars];
char bpCharToken[numChars];

String rawSYS;
String rawDIA;
String rawPR;

int dataSYS;
int dataDIA;
int dataPR;

//String allBP[] = {dataSYS, dataDIA, dataPR};

boolean newData = false;

//API Server configuration
aREST rest = aREST();                   //Create aREST instance

const char* ssid = "PLDTHOMEFIBR76798"; //Connect to local WiFi
const char* password = "PLDTWIFI8g59t";

#define LISTEN_PORT 80                  //incoming TCP connection port
WiFiServer server(LISTEN_PORT);         //Create server instance

void setup()
{
  Serial.begin(115200);

  WiFi.begin(ssid, password);
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
  rest.variable("mlxobj",&mlxobj);
  rest.variable("spo2", &spo2);
  rest.variable("sys", &dataSYS);
  rest.variable("dia", &dataDIA);
  rest.variable("pr", &dataPR);
//  rest.variable("allBP", &allBP);
  
  rest.set_id("1");
  rest.set_name("vital_signs");
}

void loop()
{
  pox.update();
  if (WiFi.status() != WL_CONNECTED){
    Serial.println("Disconnected...");
    ESP.reset();
    Serial.print("Reconnected...");
  }
  
  if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
//      Serial.print("pO2:");
//      Serial.print(pox.getSpO2());
//      Serial.print("% \t");
      spo2 = pox.getSpO2();
      spo2comp = spo2;
      spo2aux = spo2comp;
      
      if (spo2 == spo2comp){
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
      mlxobj = mlx.readObjectTempC();
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

//      allBP[0] = dataSYS;
//      allBP[1] = dataDIA;
//      allBP[2] = dataPR;
      
      newData = false;
    }
}
