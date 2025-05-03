"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ArrowLeft, Code, FileCode, FolderOpen, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ScrollReveal from "@/components/scroll-reveal"
import { useState, useEffect } from "react"
import Planet from "@/components/planet"
import { motion, AnimatePresence } from "framer-motion"

// Project data
const projects = {
  "telegram-discord-bot": {
    title: "TELEGRAM-DISCORD BOT",
    description:
      "A connecting bridge between Discord and Telegram which helps to simplify the forwarding of messages for commercial purposes.",
    github: "https://github.com/Gafn1y/TelDisBot.git",
    tags: ["Python", "VSCode", "Telegram", "Discord"],
    color: "teal",
    files: [
      {
        name: "discord_bot.py",
        language: "python",
        content: `import disnake
import asyncio
import os
from disnake.ext import commands
from telegram.ext import Application

# Tokens
DISCORD_TOKEN = "token"
TELEGRAM_TOKEN = "token"
TELEGRAM_CHAT_ID = "id"

# Files for tracking
TRACKED_CHANNELS_FILE = "tracked_channels.txt"
TRACKED_USERS_FILE = "tracked_users.txt"
TRACKED_CHANNELS = []
TRACKED_USERS = []

# Function to load tracked channels from file
def load_tracked_channels():
    if os.path.exists(TRACKED_CHANNELS_FILE):
        with open(TRACKED_CHANNELS_FILE, "r") as f:
            return [line.strip() for line in f.readlines() if line.strip()]
    return []

# Function to load tracked users from file
def load_tracked_users():
    if os.path.exists(TRACKED_USERS_FILE):
        with open(TRACKED_USERS_FILE, "r") as f:
            return [line.strip() for line in f.readlines() if line.strip()]
    return []

# Function to save channel to file
def save_tracked_channel(channel_id: str):
    with open(TRACKED_CHANNELS_FILE, "a") as f:
        f.write(f"{channel_id}\\n")

# Function to save user to file
def save_tracked_user(user_id: str):
    with open(TRACKED_USERS_FILE, "a") as f:
        f.write(f"{user_id}\\n")

# Function to remove channel from list and file
def remove_tracked_channel(channel_id: str):
    global TRACKED_CHANNELS
    TRACKED_CHANNELS = [ch for ch in TRACKED_CHANNELS if ch != channel_id]
    with open(TRACKED_CHANNELS_FILE, "w") as f:
        for ch in TRACKED_CHANNELS:
            f.write(f"{ch}\\n")

# Function to remove user from list and file
def remove_tracked_user(user_id: str):
    global TRACKED_USERS
    TRACKED_USERS = [usr for usr in TRACKED_USERS if usr != user_id]
    with open(TRACKED_USERS_FILE, "w") as f:
        for usr in TRACKED_USERS:
            f.write(f"{usr}\\n")

# Load tracked channels and users
TRACKED_CHANNELS = load_tracked_channels()
TRACKED_USERS = load_tracked_users()

# Telegram bot setup
app = Application.builder().token(TELEGRAM_TOKEN).build()

# Discord bot setup
intents = disnake.Intents.default()
intents.messages = True
intents.message_content = True  # Enable permission to read messages!

bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"✅ Bot {bot.user} is launched and running!")

# ======= BOT COMMANDS =======

@bot.command(name="list_tracked")
async def list_tracked(ctx):
    """Show list of tracked users and channels"""
    if not TRACKED_CHANNELS and not TRACKED_USERS:
        await ctx.send("📋 Tracking list is empty.")
        return

    tracked_channels_str = "\\n".join(f"<#{ch}>" for ch in TRACKED_CHANNELS) if TRACKED_CHANNELS else "No tracked channels."
    tracked_users_str = "\\n".join(f"<@{usr}>" for usr in TRACKED_USERS) if TRACKED_USERS else "No tracked users."

    message = (f"📋 **Tracking List**:\\n\\n"
               f"**Channels:**\\n{tracked_channels_str}\\n\\n"
               f"**Users:**\\n{tracked_users_str}")

    await ctx.send(message)

@bot.command(name="add_channel")
async def add_channel(ctx, channel: disnake.TextChannel):
    """Add channel to tracking list"""
    channel_id_str = str(channel.id)
    if channel_id_str not in TRACKED_CHANNELS:
        TRACKED_CHANNELS.append(channel_id_str)
        save_tracked_channel(channel_id_str)
        await ctx.send(f"✅ Channel {channel.mention} added to tracking list.")
    else:
        await ctx.send(f"⚠️ Channel {channel.mention} is already being tracked.")

@bot.command(name="remove_channel")
async def remove_channel(ctx, channel: disnake.TextChannel):
    """Remove channel from tracking list"""
    channel_id_str = str(channel.id)
    if channel_id_str in TRACKED_CHANNELS:
        remove_tracked_channel(channel_id_str)
        await ctx.send(f"✅ Channel {channel.mention} removed from tracking list.")
    else:
        await ctx.send(f"⚠️ Channel {channel.mention} not found in the list.")

@bot.command(name="add_user")
async def add_user(ctx, user: disnake.Member):
    """Add user to tracking list"""
    user_id_str = str(user.id)
    if user_id_str not in TRACKED_USERS:
        TRACKED_USERS.append(user_id_str)
        save_tracked_user(user_id_str)
        await ctx.send(f"✅ User {user.mention} added to tracking list.")
    else:
        await ctx.send(f"⚠️ User {channel.mention} is already being tracked.")

@bot.command(name="remove_user")
async def remove_user(ctx, user: disnake.Member):
    """Remove user from tracking list"""
    user_id_str = str(user.id)
    if user_id_str in TRACKED_USERS:
        remove_tracked_user(user_id_str)
        await ctx.send(f"✅ User {user.mention} removed from tracking list.")
    else:
        await ctx.send(f"⚠️ Channel {channel.mention} not found in the list.")

# ======= MESSAGE PROCESSING =======

@bot.event
async def on_message(message: disnake.Message):
    """Processes messages and forwards them to Telegram if they are from tracked channels"""
    if message.author.bot:
        return  # Ignore messages from bots

    print(f"📩 Message received: {message.content} from {message.author}")  # Log the message

    if str(message.channel.id) in TRACKED_CHANNELS and str(message.author.id) in TRACKED_USERS:
        text = f"📩 Message from Discord\\n👤 From: {message.author}\\n💬 {message.content}"
        asyncio.create_task(send_to_telegram(text))

    await bot.process_commands(message)  # Without this, commands won't work!

async def send_to_telegram(text):
    """Sends message to Telegram"""
    await app.bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=text)

# Bot launch
bot.run(DISCORD_TOKEN)
`,
      },
    ],
    features: [
      "Bidirectional message forwarding between Discord and Telegram",
      "Support for text messages and media content",
      "User identification across platforms",
      "Selective tracking of specific channels and users",
      "Command system for managing tracked users and channels",
      "File-based persistence for tracking configuration",
    ],
    implementation: [
      "Uses disnake library for Discord API integration",
      "Uses python-telegram-bot for Telegram API integration",
      "Command-based architecture for bot management",
      "File-based storage for persistent configuration",
      "Event-based architecture for message handling",
    ],
  },
  "meteo-clock": {
    title: "METEO CLOCK",
    description:
      "A smart meteorological station built on Arduino, tracking CO2 emissions and weather data for real-time environmental analysis.",
    github: "https://github.com/Gafn1y/meteoClock",
    tags: ["C++", "Arduino", "Weather API", "IoT", "Environmental Monitoring"],
    color: "pink",
    files: [
      {
        name: "meteoClock_v1.5.ino",
        language: "cpp",
        content: `/*
  MeteoClock v1.5 - Smart meteorological station
  Tracks temperature, humidity, pressure, CO2 levels, and displays weather forecast
  
  Created by Alexey Sukovatitsyn, 2023
  https://github.com/Gafn1y/meteoClock
*/

#include <Wire.h>
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>
#include <MHZ19.h>
#include <SoftwareSerial.h>
#include <RTClib.h>
#include <Adafruit_BMP280.h>
#include <EEPROM.h>

// Display settings
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET    -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Sensor pins
#define DHTPIN 2
#define DHTTYPE DHT22
#define MHZ_RX 10
#define MHZ_TX 11
#define LED_PIN 13
#define BTN_PIN 3
#define PHOTO_PIN A3
#define BUZZER_PIN 12

// Settings
#define CO2_SENSOR 1      // 0 - disable, 1 - enable MH-Z19 sensor
#define PRESSURE_SENSOR 1 // 0 - disable, 1 - enable BMP280 sensor
#define LED_MODE 0        // 0 - disable LED, 1 - enable LED indicator
#define DISPLAY_BACKLIGHT 1 // 0 - disable backlight control, 1 - enable backlight control
#define BRIGHT_THRESHOLD 150 // Threshold for auto brightness (0-1023)
#define LED_BRIGHT_MAX 255   // Maximum LED brightness (0-255)
#define LED_BRIGHT_MIN 10    // Minimum LED brightness (0-255)
#define BUZZER_ENABLE 1      // 0 - disable buzzer, 1 - enable buzzer

// Initialize sensors
DHT dht(DHTPIN, DHTTYPE);
SoftwareSerial mhzSerial(MHZ_RX, MHZ_TX);
MHZ19 mhz19;
RTC_DS3231 rtc;
Adafruit_BMP280 bmp;

// Variables
float temperature = 0;
float humidity = 0;
int co2 = 0;
float pressure = 0;
float altitude = 0;
String timeStr = "";
String dateStr = "";
byte mode = 0;
boolean changeFlag = false;
int dispCO2 = 0;

// Timers
unsigned long sensorsTimer = 0;
unsigned long drawTimer = 0;
unsigned long clockTimer = 0;
unsigned long hourPlotTimer = 0;
unsigned long predictTimer = 0;
unsigned long brightTimer = 0;

// For pressure forecasting
#define PRESSURE_ARRAY_SIZE 24
float pressureArray[PRESSURE_ARRAY_SIZE];
byte pressureCount = 0;
byte time_array[6];

void setup() {
  Serial.begin(9600);
  
  // Initialize pins
  pinMode(PHOTO_PIN, INPUT);
  pinMode(BTN_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  if (BUZZER_ENABLE) pinMode(BUZZER_PIN, OUTPUT);
  
  // Initialize display
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  display.clearDisplay();
  display.setTextColor(WHITE);
  
  // Initialize sensors
  dht.begin();
  if (CO2_SENSOR) {
    mhzSerial.begin(9600);
    mhz19.begin(mhzSerial);
    mhz19.autoCalibration(true);
  }
  
  // Initialize RTC
  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }
  
  if (rtc.lostPower()) {
    Serial.println("RTC lost power, setting the time!");
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }
  
  // Initialize BMP280
  if (PRESSURE_SENSOR) {
    if (!bmp.begin(0x76)) {
      Serial.println("Could not find BMP280 sensor!");
    }
  }
  
  // Display startup message
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(10, 10);
  display.println("MeteoClk");
  display.setTextSize(1);
  display.setCursor(10, 40);
  display.println("v1.5 Starting...");
  display.display();
  
  // Beep on startup if enabled
  if (BUZZER_ENABLE) {
    tone(BUZZER_PIN, 2000, 100);
    delay(100);
    tone(BUZZER_PIN, 4000, 100);
  }
  
  delay(2000);
  
  // Load settings from EEPROM
  loadSettings();
  
  // Initialize timers
  sensorsTimer = millis();
  drawTimer = millis();
  clockTimer = millis();
  hourPlotTimer = millis();
  predictTimer = millis();
  brightTimer = millis();
}

void loop() {
  // Check brightness every 500ms
  if (millis() - brightTimer >= 500) {
    brightTimer = millis();
    checkBrightness();
  }
  
  // Button handling
  if (digitalRead(BTN_PIN) == LOW) {
    delay(100);  // debounce
    if (digitalRead(BTN_PIN) == LOW) {
      modeTick();
      drawTimer = millis();
    }
  }
  
  // Read sensors every 5 seconds
  if (millis() - sensorsTimer >= 5000) {
    sensorsTimer = millis();
    readSensors();
  }
  
  // Update display every 1 second
  if (millis() - drawTimer >= 1000) {
    drawTimer = millis();
    drawDisplay();
  }
  
  // Update clock every 500ms
  if (millis() - clockTimer >= 500) {
    clockTimer = millis();
    updateClock();
  }
  
  // Update hourly plot every hour
  if (millis() - hourPlotTimer >= 3600000) {
    hourPlotTimer = millis();
    updateHourlyPlot();
  }
  
  // Update weather prediction every 10 minutes
  if (millis() - predictTimer >= 600000) {
    predictTimer = millis();
    predictWeather();
  }
}

// The rest of the functions are implemented in functions.ino
`,
      },
      {
        name: "functions.ino",
        language: "cpp",
        content: `void checkBrightness() {
  if (analogRead(PHOTO_PIN) < BRIGHT_THRESHOLD) {   // if it's dark
    analogWrite(BACKLIGHT, LED_BRIGHT_MIN);
    #if (LED_MODE == 0)
      LED_ON = LED_BRIGHT_MIN;
    #else
      LED_ON = (255 - LED_BRIGHT_MIN);
    #endif
  } else {                                         // if it's light
    analogWrite(BACKLIGHT, LED_BRIGHT_MAX);
    #if (LED_MODE == 0)
      LED_ON = LED_BRIGHT_MAX;
    #else
      LED_ON = (255 - LED_BRIGHT_MAX);
    #endif
  }
  
  if (dispCO2 < 800) setLED(2);
  else if (dispCO2 < 1200) setLED(3);
  else if (dispCO2 >= 1200) setLED(1);
}

void modeTick() {
  button.tick();
  boolean changeFlag = false;
  if (button.isClick()) {
    mode++;
    
    #if (CO2_SENSOR == 1)
      if (mode > 8) mode = 0;
    #else
      if (mode > 0) mode = 0;
    #endif
    
    changeFlag = true;
  }
}

void readSensors() {
  // Read temperature and humidity from DHT22
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  
  // Read CO2 level from MH-Z19 if enabled
  if (CO2_SENSOR) {
    co2 = mhz19.getCO2();
    dispCO2 = co2;
  }
  
  // Read pressure and altitude from BMP280 if enabled
  if (PRESSURE_SENSOR) {
    pressure = bmp.readPressure() / 100.0F;
    altitude = bmp.readAltitude(1013.25); // Adjust for local sea level pressure
  }
  
  // Log data to serial
  logData();
}

void updateClock() {
  DateTime now = rtc.now();
  timeStr = String(now.hour()) + ":" + (now.minute() < 10 ? "0" : "") + String(now.minute());
  dateStr = String(now.day()) + "/" + String(now.month()) + "/" + String(now.year());
}

void drawDisplay() {
  display.clearDisplay();
  
  // Different display modes
  switch (mode) {
    case 0:  // Main screen with time, temperature, humidity
      drawMainScreen();
      break;
    case 1:  // CO2 level screen
      drawCO2Screen();
      break;
    case 2:  // Pressure and altitude screen
      drawPressureScreen();
      break;
    case 3:  // Weather forecast screen
      drawForecastScreen();
      break;
    case 4:  // Temperature graph
      drawTempGraph();
      break;
    case 5:  // Humidity graph
      drawHumidityGraph();
      break;
    case 6:  // CO2 graph
      drawCO2Graph();
      break;
    case 7:  // Pressure graph
      drawPressureGraph();
      break;
    case 8:  // Settings screen
      drawSettingsScreen();
      break;
  }
  
  display.display();
}

void drawMainScreen() {
  // Display time and date
  display.setTextSize(2);
  display.setCursor(5, 0);
  display.println(timeStr);
  display.setTextSize(1);
  display.setCursor(80, 5);
  display.println(dateStr);
  
  // Display temperature
  display.setTextSize(1);
  display.setCursor(0, 25);
  display.print("Temp: ");
  display.print(temperature);
  display.println(" C");
  
  // Display humidity
  display.setCursor(0, 35);
  display.print("Humidity: ");
  display.print(humidity);
  display.println("%");
  
  // Display CO2 if sensor is enabled
  if (CO2_SENSOR) {
    display.setCursor(0, 45);
    display.print("CO2: ");
    display.print(dispCO2);
    display.println(" ppm");
    
    // Display air quality indicator
    display.setCursor(0, 55);
    display.print("Air Quality: ");
    if (dispCO2 < 800) {
      display.println("Good");
    } else if (dispCO2 < 1200) {
      display.println("Fair");
    } else {
      display.println("Poor");
    }
  }
}

void drawCO2Screen() {
  if (!CO2_SENSOR) {
    display.setTextSize(1);
    display.setCursor(0, 0);
    display.println("CO2 sensor disabled");
    return;
  }
  
  display.setTextSize(2);
  display.setCursor(5, 0);
  display.println("CO2 Level");
  
  display.setTextSize(3);
  display.setCursor(20, 25);
  display.print(dispCO2);
  display.setTextSize(2);
  display.println(" ppm");
  
  // Draw air quality indicator
  display.setTextSize(1);
  display.setCursor(0, 55);
  display.print("Air Quality: ");
  if (dispCO2 < 800) {
    display.println("Good");
  } else if (dispCO2 < 1200) {
    display.println("Fair");
  } else {
    display.println("Poor");
  }
}

void drawPressureScreen() {
  if (!PRESSURE_SENSOR) {
    display.setTextSize(1);
    display.setCursor(0, 0);
    display.println("Pressure sensor disabled");
    return;
  }
  
  display.setTextSize(2);
  display.setCursor(5, 0);
  display.println("Pressure");
  
  display.setTextSize(2);
  display.setCursor(5, 25);
  display.print(pressure);
  display.setTextSize(1);
  display.println(" hPa");
  
  display.setTextSize(1);
  display.setCursor(0, 45);
  display.print("Altitude: ");
  display.print(altitude);
  display.println(" m");
}

void updateHourlyPlot() {
  // Shift all values in the array
  for (int i = 0; i < PRESSURE_ARRAY_SIZE - 1; i++) {
    pressureArray[i] = pressureArray[i + 1];
  }
  
  // Add new pressure value
  pressureArray[PRESSURE_ARRAY_SIZE - 1] = pressure;
  
  // Increment counter or reset if full
  if (pressureCount < PRESSURE_ARRAY_SIZE) pressureCount++;
}

void predictWeather() {
  // Simple weather prediction based on pressure trend
  if (pressureCount < 3) return;  // Need at least 3 readings
  
  float pressureDelta = pressureArray[pressureCount - 1] - pressureArray[pressureCount - 3];
  
  // Store prediction in EEPROM
  if (pressureDelta > 3.0) {
    // Rapidly rising pressure - clear weather coming
    EEPROM.write(0, 1);
  } else if (pressureDelta > 0.8) {
    // Slowly rising pressure - improving weather
    EEPROM.write(0, 2);
  } else if (pressureDelta > -0.8) {
    // Stable pressure - no change
    EEPROM.write(0, 3);
  } else if (pressureDelta > -3.0) {
    // Slowly falling pressure - deteriorating weather
    EEPROM.write(0, 4);
  } else {
    // Rapidly falling pressure - stormy weather coming
    EEPROM.write(0, 5);
  }
}

void drawForecastScreen() {
  display.setTextSize(2);
  display.setCursor(5, 0);
  display.println("Forecast");
  
  display.setTextSize(1);
  display.setCursor(0, 25);
  
  // Read prediction from EEPROM
  byte prediction = EEPROM.read(0);
  
  switch (prediction) {
    case 1:
      display.println("Clear weather coming");
      break;
    case 2:
      display.println("Improving weather");
      break;
    case 3:
      display.println("No change expected");
      break;
    case 4:
      display.println("Deteriorating weather");
      break;
    case 5:
      display.println("Stormy weather coming");
      break;
    default:
      display.println("Insufficient data");
      break;
  }
  
  display.setCursor(0, 45);
  display.print("Based on pressure trend");
}

void drawTempGraph() {
  // Implementation for temperature graph
}

void drawHumidityGraph() {
  // Implementation for humidity graph
}

void drawCO2Graph() {
  // Implementation for CO2 graph
}

void drawPressureGraph() {
  // Implementation for pressure graph
}

void drawSettingsScreen() {
  // Implementation for settings screen
}

void setLED(byte color) {
  // Set LED color based on air quality
  if (LED_MODE == 0) return;  // LED disabled
  
  switch (color) {
    case 0:  // Off
      digitalWrite(LED_PIN, LOW);
      break;
    case 1:  // Red - poor air quality
      analogWrite(LED_PIN, LED_ON);
      break;
    case 2:  // Green - good air quality
      analogWrite(LED_PIN, LED_ON / 2);
      break;
    case 3:  // Yellow - fair air quality
      analogWrite(LED_PIN, LED_ON / 4);
      break;
  }
}

void loadSettings() {
  // Load settings from EEPROM
  // Implementation for loading settings
}

void logData() {
  Serial.print("Time: ");
  Serial.print(timeStr);
  Serial.print(" Date: ");
  Serial.println(dateStr);
  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" C");
  
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println("%");
  
  if (CO2_SENSOR) {
    Serial.print("CO2: ");
    Serial.print(dispCO2);
    Serial.println(" ppm");
  }
  
  if (PRESSURE_SENSOR) {
    Serial.print("Pressure: ");
    Serial.print(pressure);
    Serial.println(" hPa");
    
    Serial.print("Altitude: ");
    Serial.print(altitude);
    Serial.println(" m");
  }
  
  Serial.println("---------------------");
}
`,
      },
    ],
    features: [
      "Real-time temperature, humidity, and CO2 monitoring",
      "Atmospheric pressure measurement and altitude calculation",
      "Weather forecasting based on pressure trends",
      "Multiple display modes with data visualization",
      "Automatic brightness adjustment based on ambient light",
      "Air quality assessment with LED indicator",
      "Historical data graphing for all environmental parameters",
      "Time and date display with RTC module",
    ],
    implementation: [
      "Built on Arduino platform with modular code structure",
      "Uses DHT22 sensor for temperature and humidity",
      "MH-Z19 sensor for CO2 measurement",
      "BMP280 sensor for pressure and altitude",
      "DS3231 RTC module for accurate timekeeping",
      "SSD1306 OLED display with multiple visualization modes",
      "EEPROM storage for settings and historical data",
      "Photoresistor for ambient light detection",
    ],
  },
  "auto-aiming-fan": {
    title: "AUTO-AIMING FAN",
    description:
      "An Arduino-based project to make it easier to use a fan in hot weather, using an ultrasonic sensor to improve airflow direction efficiency by 30%.",
    github: "https://github.com/Gafn1y/Auto-Aiming-Fan.git",
    tags: ["Arduino", "C++", "Hardware"],
    color: "yellow",
    files: [
      {
        name: "AutoAimingFan.ino",
        language: "cpp",
        content: `#include <Servo.h>
#include <NewPing.h>

// Pin definitions
#define TRIGGER_PIN  12
#define ECHO_PIN     11
#define SERVO_PIN    9
#define FAN_RELAY    7
#define TEMP_SENSOR  A0
#define MAX_DISTANCE 200 // Maximum distance we want to ping for (in centimeters)

// Create objects
Servo servo;
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

// Variables
int servoPos = 90;      // Initial servo position
int fanSpeed = 0;       // Fan speed (0 = off, 1 = on)
float temperature = 0;  // Current temperature
int distance = 0;       // Distance to object
unsigned long lastScan = 0;
unsigned long lastSpeedChange = 0;
bool objectDetected = false;
bool fanOn = false;

// Constants
const int SCAN_INTERVAL = 500;    // Time between scans (ms)
const int SPEED_INTERVAL = 30000; // Time between auto speed changes (ms)
const int SERVO_STEP = 5;         // Degrees to move per step
const int SERVO_MIN = 10;         // Minimum servo angle
const int SERVO_MAX = 170;        // Maximum servo angle
const float TEMP_THRESHOLD = 25.0; // Temperature threshold to turn on fan (Celsius)

void setup() {
  Serial.begin(9600);
  
  // Initialize servo
  servo.attach(SERVO_PIN);
  servo.write(servoPos);
  
  // Initialize fan relay
  pinMode(FAN_RELAY, OUTPUT);
  digitalWrite(FAN_RELAY, LOW); // Fan off initially
  
  // Initialize temperature sensor
  pinMode(TEMP_SENSOR, INPUT);
  
  Serial.println("Auto-Aiming Fan initialized");
  delay(1000);
}

void loop() {
  // Read temperature
  temperature = readTemperature();
  
  // Check if fan should be on based on temperature
  if (temperature > TEMP_THRESHOLD && !fanOn) {
    turnFanOn();
  } else if (temperature <= TEMP_THRESHOLD && fanOn) {
    turnFanOff();
  }
  
  // Only scan for objects if the fan is on
  if (fanOn) {
    // Scan for objects periodically
    if (millis() - lastScan > SCAN_INTERVAL) {
      scanForObjects();
      lastScan = millis();
    }
  }
  
  // Print status every 2 seconds
  static unsigned long lastPrint = 0;
  if (millis() - lastPrint > 2000) {
    printStatus();
    lastPrint = millis();
  }
}

float readTemperature() {
  // Read analog value from temperature sensor
  int sensorValue = analogRead(TEMP_SENSOR);
  
  // Convert to voltage
  float voltage = sensorValue * (5.0 / 1023.0);
  
  // Convert to temperature (LM35 outputs 10mV per degree Celsius)
  float tempC = voltage * 100.0;
  
  return tempC;
}

void scanForObjects() {
  // Measure distance
  distance = sonar.ping_cm();
  
  // If distance is valid (not 0, which means no echo)
  if (distance > 0 && distance < MAX_DISTANCE) {
    objectDetected = true;
    
    // Calculate new servo position to aim at the detected object
    int targetPos = map(distance, 0, MAX_DISTANCE, SERVO_MIN, SERVO_MAX);
    
    // Move servo gradually towards target
    if (servoPos < targetPos) {
      servoPos += SERVO_STEP;
    } else if (servoPos > targetPos) {
      servoPos -= SERVO_STEP;
    }
    
    // Ensure servo position is within limits
    servoPos = constrain(servoPos, SERVO_MIN, SERVO_MAX);
    
    // Update servo position
    servo.write(servoPos);
    
    Serial.print("Object detected at ");
    Serial.print(distance);
    Serial.println(" cm");
  } else {
    objectDetected = false;
    
    // If no object detected, sweep back and forth
    static int sweepDirection = 1;
    
    servoPos += SERVO_STEP * sweepDirection;
    
    if (servoPos >= SERVO_MAX || servoPos <= SERVO_MIN) {
      sweepDirection *= -1; // Reverse direction
    }
    
    servoPos = constrain(servoPos, SERVO_MIN, SERVO_MAX);
    servo.write(servoPos);
  }
}

void turnFanOn() {
  digitalWrite(FAN_RELAY, HIGH);
  fanOn = true;
  Serial.println("Fan turned ON");
}

void turnFanOff() {
  digitalWrite(FAN_RELAY, LOW);
  fanOn = false;
  Serial.println("Fan turned OFF");
}

void printStatus() {
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print("°C | Fan: ");
  Serial.print(fanOn ? "ON" : "OFF");
  Serial.print(" | Servo: ");
  Serial.print(servoPos);
  Serial.print("° | Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
}
`,
      },
    ],
    features: [
      "Automatic fan direction adjustment based on human presence",
      "Temperature-based fan activation",
      "Servo motor control for precise aiming",
      "Ultrasonic distance sensing for object detection",
      "Energy-efficient operation",
    ],
    implementation: [
      "Arduino-based control system",
      "HC-SR04 ultrasonic sensor for distance measurement",
      "Servo motor for directional control",
      "Relay module for fan power control",
      "LM35 temperature sensor for ambient temperature monitoring",
    ],
  },
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = projects[slug]
  const [activeFile, setActiveFile] = useState(0)
  const [isCodeLoaded, setIsCodeLoaded] = useState(false)

  if (!project) {
    notFound()
  }

  const colorMap: Record<string, string> = {
    teal: "text-teal-400",
    pink: "text-pink-400",
    yellow: "text-yellow-300",
  }

  const bgColorMap: Record<string, string> = {
    teal: "bg-teal-500",
    pink: "bg-pink-500",
    yellow: "bg-yellow-400",
  }

  const textColorMap: Record<string, string> = {
    teal: "text-teal-200",
    pink: "text-pink-200",
    yellow: "text-yellow-200",
  }

  // Add a typing effect for code display with improved performance
  useEffect(() => {
    setIsCodeLoaded(false)
    const codeElements = document.querySelectorAll("pre code")

    if (codeElements.length === 0) return

    const element = codeElements[0]
    const text = element.textContent || ""
    element.textContent = ""

    let i = 0
    const chunkSize = 100 // Process text in chunks for better performance

    const typeWriter = () => {
      if (i < text.length) {
        const end = Math.min(i + chunkSize, text.length)
        element.textContent += text.substring(i, end)
        i = end

        if (i < text.length) {
          requestAnimationFrame(typeWriter)
        } else {
          setIsCodeLoaded(true)
        }
      }
    }

    requestAnimationFrame(typeWriter)
  }, [activeFile])

  return (
    <div className="min-h-screen flex flex-col bg-darkPurple-950 text-white font-omori dark-gradient">
      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-darkPurple-950 to-darkPurple-900 opacity-80"></div>
        <div className="absolute inset-0 stars-bg"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-1">
        <div className="star-small" style={{ top: "15%", left: "10%" }}></div>
        <div className="star-medium" style={{ top: "25%", left: "85%" }}></div>
        <div className="star-large" style={{ top: "65%", left: "15%" }}></div>
        <div className="star-small" style={{ top: "80%", left: "80%" }}></div>
        <div className="star-tiny" style={{ top: "40%", left: "20%" }}></div>
        <div className="star-tiny" style={{ top: "30%", left: "70%" }}></div>
        <div className="star-small" style={{ top: "70%", left: "40%" }}></div>
        <div className="star-medium" style={{ top: "20%", left: "30%" }}></div>
        <div className="star-tiny" style={{ top: "50%", left: "90%" }}></div>
        <div className="star-large" style={{ top: "85%", left: "60%" }}></div>
      </div>

      {/* Glitch overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
        <div className="absolute inset-0 bg-[url('/noise.png')] mix-blend-overlay"></div>
      </div>

      <header className="sticky top-0 z-10 bg-darkPurple-950/80 backdrop-blur-sm border-b border-purple-400/10">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="font-omori text-xl">
            <span className="text-teal-400">Dev</span>Portfolio
          </Link>
          <Button
            variant="outline"
            className="border-purple-400/20 hover:bg-purple-800/30 font-omori text-teal-400 btn-interactive"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">BACK TO HOME</span>
              <span className="sm:hidden">BACK</span>
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 relative z-1 py-8 md:py-12">
        <div className="container">
          <div className="absolute top-10 right-10 animate-float-slow">
            <Star className="h-6 w-6 text-yellow-300 icon-interactive" />
          </div>
          <div className="absolute bottom-10 left-10 animate-float">
            <Star className="h-4 w-4 text-teal-400 icon-interactive" />
          </div>
          <div className="absolute top-40 left-20 animate-float-reverse">
            <Sparkles className="h-5 w-5 text-teal-400 icon-interactive" />
          </div>
          <div className="absolute bottom-40 right-20 animate-pulse-slow">
            <div className="star-custom bg-pink-400 icon-interactive"></div>
          </div>

          {/* Project Header */}
          <ScrollReveal>
            <div className="omori-dialogue mb-6 md:mb-8 p-4 sm:p-6 border-2 border-purple-400 relative bg-darkPurple-900/80 omori-dialogue-interactive">
              {/* Add a planet to the project title */}
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-omori mb-3 md:mb-4 ${colorMap[project.color]} text-glitch-hover flex items-center`}
              >
                {project.title}
                <div className="inline-block ml-4">
                  <Planet type={project.color as any} size="small" hasRing={project.color === "teal"} />
                </div>
              </h1>
              <p className="text-base md:text-lg text-purple-200 mb-4 md:mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  className={`${bgColorMap[project.color]} hover:${bgColorMap[project.color]}/90 text-purple-950 font-omori btn-interactive`}
                  asChild
                >
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    VIEW ON GITHUB
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Project Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <ScrollReveal delay={200}>
              <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white omori-card card-interactive">
                <CardHeader>
                  <CardTitle className={`font-omori ${colorMap[project.color]} text-glitch-hover`}>
                    <Star className="inline-block mr-2 h-5 w-5 icon-interactive" />
                    FEATURES
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span className={`${colorMap[project.color]} mr-2`}>•</span>
                        <span className="text-purple-200">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white omori-card card-interactive">
                <CardHeader>
                  <CardTitle className={`font-omori ${colorMap[project.color]} text-glitch-hover`}>
                    <Code className="inline-block mr-2 h-5 w-5 icon-interactive" />
                    IMPLEMENTATION
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.implementation.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span className={`${colorMap[project.color]} mr-2`}>•</span>
                        <span className="text-purple-200">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Project Files */}
          <ScrollReveal>
            <h2
              className={`text-xl md:text-2xl font-omori mb-4 md:mb-6 flex items-center ${colorMap[project.color]} text-glitch-hover`}
            >
              <FolderOpen className="mr-2 h-5 w-5 icon-interactive" />
              PROJECT FILES
            </h2>

            {/* File tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.files.map((file, index) => (
                <Button
                  key={index}
                  variant={activeFile === index ? "default" : "outline"}
                  className={`${activeFile === index ? bgColorMap[project.color] : "border-purple-400/50"} font-omori text-sm btn-interactive`}
                  onClick={() => setActiveFile(index)}
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  <span className="truncate max-w-[100px] sm:max-w-none">{file.name}</span>
                </Button>
              ))}
            </div>

            {/* Active file content */}
            <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white omori-card mb-8 card-interactive">
              <CardHeader className="border-b border-purple-400/20">
                <CardTitle className={`font-omori flex items-center ${colorMap[project.color]} text-glitch-hover`}>
                  <FileCode className="mr-2 h-5 w-5 icon-interactive" />
                  {project.files[activeFile].name}
                </CardTitle>
                <CardDescription className="text-purple-300">
                  {project.files[activeFile].language === "python" && "Python Source Code"}
                  {project.files[activeFile].language === "cpp" && "C++ Source Code"}
                  {project.files[activeFile].language === "text" && "Text File"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 bg-darkPurple-950/50 rounded-b-lg overflow-x-auto">
                  <pre className="text-sm text-purple-200 font-mono">
                    <code>{project.files[activeFile].content}</code>
                  </pre>
                  <AnimatePresence>
                    {!isCodeLoaded && (
                      <motion.div
                        className="flex justify-center mt-4"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="inline-flex items-center px-4 py-2 bg-purple-800/50 rounded-md text-sm text-purple-200">
                          <div className="mr-2 h-4 w-4 border-2 border-t-transparent border-purple-400 rounded-full animate-spin"></div>
                          Loading code...
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </main>

      <footer className="border-t border-purple-400/10 py-6 bg-darkPurple-950">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-purple-300">
            © {new Date().getFullYear()} Sukovatitsyn Alexey. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-purple-300 hover:text-white transition-colors nav-link-interactive">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-purple-300 hover:text-white transition-colors nav-link-interactive">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
