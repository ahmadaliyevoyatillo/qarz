const TelegramBot = require("node-telegram-bot-api")

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling:true})

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    // agar foydalanuvchi allaqachon ro'yxatdan o'tgan bo'lsa
    const user = await User.findOne({ where: { telegram: chatId } });
    if (!user) {
        // bu yerda user yaratishingiz yoki faqat chat id saqlashingiz mumkin
        console.log("Yangi foydalanuvchi Chat ID:", chatId);
    }
});

module.exports = bot