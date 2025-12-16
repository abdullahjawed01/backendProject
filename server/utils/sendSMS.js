import twilio from "twilio"
import dotenv from "dotenv"
dotenv.config()

async function sendSMS(to,body ) {
    try {
        const client = twilio(process.env.Account_SID, process.env.Auth_Token);

        const message = await client.messages.create({
            body: body,
            from: process.env.Number,
            to: to
        });

        console.log("SMS sent: " + message.sid);
    } catch (error) {
        console.log("Error sending SMS: ", error);
        throw error;
    }
}
export  default sendSMS