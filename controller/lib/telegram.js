const { getAxiosInstance } = require("./axios");
const { errorHandler } = require("./helpers");

const MY_TOKEN = process.env.TELE_BOT_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;
const axiosInstance = getAxiosInstance(BASE_URL);

function sendMessage(chatId, messageText) {
  return axiosInstance
    .get("sendMessage", {
      chat_id: chatId || MY_GROUP_CHAT_ID,
      text: messageText,
    })
    .catch((ex) => {
      errorHandler(ex, "sendMessage", "axios");
    });
}

async function handleMessage(messageObj) {
  const messageText = messageObj.text || "";

  if (!messageText) {
    errorHandler("No message text", "handleMessage");
    return "";
  }

  try {
    const chatId = messageObj.chat.id;
    if (messageText.charAt(0) === "/") {
      const command = messageText.substr(1);
      switch (command) {
        case "start":
          // we want to send a welcome message to the user
          return sendMessage(
            chatId,
            "Hi! Im a bot. I can help you sort out your bills"
          );

        default:
          return sendMessage(chatId, "Hey hi, i dont know that command");
      }
    } else {
      sendMessage(chatId, messageText);
    }
  } catch (error) {
    errorHandler(error, "handleMessage");
  }
}

module.exports = { sendMessage, handleMessage };
