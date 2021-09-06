//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar');

//----------------------------------------------------------------------------- --------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------

module.exports = async client => {

//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------

const prefix = ayarlar.bot.prefix
const sahipler = ayarlar.bot.sahipler
const botlar = ayarlar.bot.botlar
const sunucuid = ayarlar.bot.sunucuid
const bottoken = ayarlar.bot.bottoken
const dtag = ayarlar.bot.tag2
const tag = ayarlar.bot.tag
const hatalog = client.channels.cache.get(ayarlar.bot.hatalog)
const footer = ayarlar.bot.footer
const status = ayarlar.bot.status

const abot = ayarlar.bot
const akanal = ayarlar.kanallar
const arol = ayarlar.roller

const registerchat = akanal.registerchat
const chat = akanal.chat
const seslioda = akanal.seslioda
const registerlog = akanal.registerlog
const taglilog = akanal.taglilog
const otorollog = akanal.otorollog
const invitelog = akanal.invitelog

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

let ccc = chalk.yellow(" | ")

const rgun = moment(new Date().toISOString()).format('DD')
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const rcre = `${rgun} ${ray} ${ryıl} | ${rsaat}`  

let tarihc = ccc+chalk.red("Tarih : ")+chalk.white("[")+chalk.green(rcre)+chalk.white("]")+ccc

let discowkomutc = chalk.magenta("Discow / Komutlar")
let discowmongoc = chalk.magenta("Discow / MongoDB")
let discowgirisc = chalk.magenta("Discow / Giriş")
let discowsesliodac = chalk.magenta("Discow / Sesli Oda")
let discowbotc = chalk.magenta("Discow / Bot")

const komutc = message => {
    console.log(`${discowkomutc} ${tarihc} `+chalk.red(message))
}

const girisc = message => {
    console.log(`${discowgirisc} ${tarihc} `+chalk.red(message))
}

const seslic = message => {
    console.log(`${discowsesliodac} ${tarihc} `+chalk.red(message))
}

const logc = message => {
    console.log(`${discowbotc} ${tarihc} `+chalk.red(message))
}

//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------

client.on("message", async message => {
        
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.bot.footer}`, message.author.avatarURL({ dynamic: true })).setTimestamp()
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)

if(message.author.bot) return;
if(message.channel.type === "dm") return;

const kanal = message.channel
const sunucu = message.guild
const sunucusahip = message.guild.owner
const mesaj = message
const mesajsahip = message.author
const mesajuye = message.member

        if (!message.content.startsWith(prefix)) return;
let command = message.content.split(' ')[0].slice(prefix.length);
let params = message.content.split(' ').slice(1);
let cmd;

        if (!client.commands.has(command)) {
        if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
} else {
        if(command == '') return;
}
}

        if (client.commands.has(command)) {
    cmd = client.commands.get(command);
} else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

        if (cmd) {

    cmd.run(client, message, params).catch(err => {

kanal.send(discow.setDescription(`${dikkat} **Komutta Bir Hata Oluştu.** ${dikkat}

${ok} **Komutu Kullanan :** **${mesajsahip}**
${ok} **Komutu Kullanan ID :** **\`${mesajsahip.id}\`**

${ok} **Kullanılan Komut :** **\`${prefix+command}\`**

${ok} **Tarih :** **[\`${rcre}\`]**`)
.addField(`${ok} **Hata :**`, `**\`\`\`js\n${err}\`\`\`**`))
kanal.send(`${abot.sahipler.map(x => `<@${x}>`)}`)

    })

    const komutlog = client.channels.cache.get(ayarlar.bot.komutlog)

    logc("Bir Komut Kullanıldı. / Kullanılan Komut : "+prefix+command+" / Komutun Adı : "+client.aliases.get(command))

    komutlog.send(discow.setDescription(`${tik} **Bir Komut Kullanıldı.** ${tik}
    
    ${ok} **Komutu Kullanan :** **${mesajsahip}**
    ${ok} **Komutu Kullanan ID :** **\`${mesajsahip.id}\`**
    
    ${ok} **Kullanılan Komut :** **\`${prefix+command}\`**
    
    ${ok} **Tarih :** **[\`${rcre}\`]**`))

}})};

