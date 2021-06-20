#include <Keypad.h>
#include <Servo.h>


int lockSensor = 10;
int lockLED = 13;
int lockstates = 0;
unsigned long lockcnt = 0;
int lockvalue;

int val;
int count = 0;

Servo servo;

String password = "1234";

String userInput = "";

const byte ROWS = 4;
const byte COLS = 4;

char keys[ROWS][COLS] = {
    {'1', '2', '3', 'A'},
    {'4', '5', '6', 'B'},
    {'7', '8', '9', 'C'},
    {'*', '0', '#', 'D'}};

byte rowPins[ROWS] = {9, 8, 7, 6};
byte colPins[COLS] = {5, 4, 3, 2};

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);


void setup()
{
    Serial.begin(9600);
    pinMode(lockSensor, INPUT);
    pinMode(lockLED, OUTPUT);
    servo.attach(11);
}


int chkpassword()
{
   char key = keypad.getKey();

    if (key)
    {
        userInput += key;
        count += 1;

        if (count == 4)
        {
            count = 0;
            if (userInput == password)
            {
                return 1;
            }
            else
            {
                servo.write(0);
            }
            userInput = "";
        }
    }
    return 0;
}

int chkkey()
{
    char key = keypad.getKey();

    if (key)
    {
        if (key == '#')
            return 1;
    }
    return 0;
}

bool changed=true;
int prevlockvalue=0;

void loop()
{
    prevlockvalue = lockvalue;
    lockvalue = digitalRead(lockSensor);

(prevlockvalue!=lockvalue)
    {
        changed=true;
        delay(1000);
    }   

    if (lockvalue == HIGH)
    {
        digitalWrite(lockLED, LOW);
        if(changed)
        {
            Serial.println("택배함 미사용중");
            lockstates = 1;
            changed=false;
        }
    }
    else if (lockvalue == LOW)
    {
        digitalWrite(lockLED, HIGH);
        if(changed)
        {
            Serial.println("택배함 사용중");
            lockstates = 2;
            changed=false;
        }
    }
   
    if(lockstates==2)
    {
        if(chkpassword()==1)
        {
            servo.write(90);
       }            
    }
    else if(lockstates==1)
    {
        if(chkkey()==1)
        {
            servo.write(0);
        }
    }
}