const express = require("express");
const cors = require("cors");

require("dotenv").config()
// Importing Fast2SMS

const fast2sms = require('fast-two-sms')

const Discord = require("discord.js");
const client = new Discord.Client();
const apiKey = process.env.SMS_API_KEY;
const token = process.env.DISCORD_TOKEN;

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log(`Server is connected at : ${port}`))
app.get("/", (req, res) => res.send("Server is connected...."));

client.on("ready", () => {
  console.log("Bot is running");
});

client.on("message", async(text) => {
  if (text.author.bot) return;
  if (text.content.toLowerCase() === "$generate") {
    text.channel.send(
      "------INSTRUCTIONS------ \n Enter phone number followed by a @ after the @text \n FOR EX:`@SAMPLE MESSAGE` `PHONE-NUMBER`"
    );
  }
  console.log(text.content.toLowerCase());

  if (text.content.startsWith("@")) {
    const arr = text.content.split("@");
    text.channel.send(`message :: ${arr[1]}`);
    text.channel.send(`address ph no :: ${arr[2]}`);

    // Sending message using Fast2SMS
    const options = {
        authorization : apiKey, 
        message : `${arr[1]}` ,  
        numbers : [`${arr[2]}`]
    } 
    const res = await fast2sms.sendMessage(options);
    text.channel.send(res.message[0])
  }
});


client.login(token);
