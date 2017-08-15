About:

It is an individual project developed for the Amazon dot and echo devices as an Alexa skill. In July Amazon started a contest for Alexa skill developers that first 5000 developers would receive some kind of goodies like dot devices. I thought it was a good opportunity to learn something new so, I started developing this skill.  This is a trivia game where users can ask the device to toss a coin and get the result either as tails or heads

Development process:

In this project I used Node.js to code and hosted in AWS lambda. So, to develop this skill we need to first know about parameters that are to be sent, intents, slots and logic.
There are certain parameters that echo device will know so we have to send them as attributes for ex- response, re prompt, session ending.
Intents are like hello Intent, help intent, cancel intent, and custom intents. Basically these are used to define what to be done based on the user request.
Slots are blanks which are to be filled with certain words like Alexa ask toss it to toss the coin 
Logic is to write the code in a way what has to be done for ex in this skill I used random function and it generates number based on which we will make it either as tails or heads.
