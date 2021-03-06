//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');

const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');

const ayarlar = require('./ayarlar');
require('discord-buttons')(client);
require('dotenv')
require('moment-duration-format')

const prefix = ayarlar.bot.prefix
const sahipler = ayarlar.bot.sahipler
const botlar = ayarlar.bot.botlar
const sunucuid = ayarlar.bot.sunucuid
const bottoken = process.env.TOKEN
const dtag = ayarlar.bot.tag2
const tag = ayarlar.bot.tag
const hatalog = client.channels.cache.get(ayarlar.bot.hatalog)
const komutlog = client.channels.cache.get(ayarlar.bot.komutlog)
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
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","??ubat").replace("03","Mart").replace("04", "Nisan").replace("05", "May??s").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "A??ustos").replace("09", "Eyl??l").replace("10","Ekim").replace("11","Kas??m").replace("12","Aral??k")
const ry??l = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const rcre = `${rgun} ${ray} ${ry??l} | ${rsaat}`  

let tarihc = ccc+chalk.red("Tarih : ")+chalk.white("[")+chalk.green(rcre)+chalk.white("]")+ccc

let discowkomutc = chalk.magenta("Discow / Komutlar")
let discowmongoc = chalk.magenta("Discow / MongoDB")
let discowgirisc = chalk.magenta("Discow / Giri??")
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

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

require('./events/komut')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
  fs.readdir("./komutlar/", (err, files) => {
    if (err) console.error(err);
    console.log(chalk.bold.yellow("??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"))
  komutc(`${files.length} Adet Komut Y??klenicek.`);
  files.forEach(f => {
let props = require(`./komutlar/${f}`);
  komutc(`Bir Komut Y??klendi. / Y??klenen Komut : ${props.help.name} / Y??klenen Kod : ${f} / Komutun Alias'lar?? : [ ${props.conf.aliases.slice(0, 5).map(x => `${x}`).join(", ")} ]`);
  client.commands.set(props.help.name, props);
  props.conf.aliases.forEach(alias => {
  client.aliases.set(alias, props.help.name);
}); 
});
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.reload = command => {
    return new Promise((resolve, reject) => {
    try {
  delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);});
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
  client.aliases.set(alias, cmd.help.name);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

client.load = command => {
    return new Promise((resolve, reject) => {
    try {
let cmd = require(`./komutlar/${command}`);
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
  client.aliases.set(alias, cmd.help.name);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

client.unload = command => {
    return new Promise((resolve, reject) => {
    try {
  delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const tokens = require('./token-girme')

client.login(tokens.token).then(x => {
  console.log("")
  girisc("Bot Ba??ar??yla Giri?? Yapt??.")
}).catch(err => girisc("Bot Giri?? Yaparken Bir Hata Olu??tu."))

client.on("ready", async () => {
  client.user.setPresence({ activity: { name: abot.footer, type: "PLAYING" }, status: abot.status })
  client.channels.cache.get(seslioda).join().then(x => {
  seslic("Bot Ba??ar??yla Sese Giri?? Yapt??.")
  console.log(chalk.bold.yellow("??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"))
}).catch(err => seslic("Bot Sese Girerken Bir Hata Olu??tu."))
})

const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(abot.footer, abot.icon).setTimestamp()
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)

const webhooks = new Discord.WebhookClient("884466011292708974", "HvIeuSsQJv2cbuRg5_SE_PSuKtyhvrSk4sLXWaJtjo0fKyhT4_cCqeXE2kOGDvIvmqT0")

client.on("error", async (err) => {
  webhooks.send(discow.setDescription(`??? **Botta Bir Hata Olu??tu.** ???
  
**??? Hata :**
**\`\`\`yml
${err}
\`\`\`**`))
})

client.on("warn", async (err) => {
  webhooks.send(discow.setDescription(`??? **Botta Bir Uyar?? Olu??tu.** ???
  
**??? Uyar?? :**
**\`\`\`yml
${err}
\`\`\`**`))
})

client.on("uncaughtException", async (err) => {
  webhooks.send(discow.setDescription(`??? **Botta Bilinmeyen Bir Hata Olu??tu.** ???
  
**??? Hata :**
**\`\`\`yml
${err}
\`\`\`**`))
})

client.on("unhandledRejection", async (err) => {
  webhooks.send(discow.setDescription(`??? **Botta Bilinmeyen Bir Hata Olu??tu.** ???
  
**??? Hata :**
**\`\`\`yml
${err}
\`\`\`**`))
})



//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("guildMemberAdd", async member => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const sunucu = member.guild
const sunucusahip = member.guild.owner
const mesajsahip = member.user
const mesajuye = member

if(member.guild.id != sunucuid) return;

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)

const kurallar = client.emojis.cache.get(ayarlar.emojiler.discow_kurallar)
const kristal = client.emojis.cache.get(ayarlar.emojiler.discow_kristal)
const yetkili = client.emojis.cache.get(ayarlar.emojiler.discow_yetkili)
const ses = client.emojis.cache.get(ayarlar.emojiler.discow_ses)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const discow000 = client.emojis.cache.get(ayarlar.emojiler.discow000)
const discow001 = client.emojis.cache.get(ayarlar.emojiler.discow001)
const discow002 = client.emojis.cache.get(ayarlar.emojiler.discow002)
const discow003 = client.emojis.cache.get(ayarlar.emojiler.discow003)
const discow004 = client.emojis.cache.get(ayarlar.emojiler.discow004)
const discow005 = client.emojis.cache.get(ayarlar.emojiler.discow005)
const discow006 = client.emojis.cache.get(ayarlar.emojiler.discow006)
const discow007 = client.emojis.cache.get(ayarlar.emojiler.discow007)
const discow008 = client.emojis.cache.get(ayarlar.emojiler.discow008)
const discow009 = client.emojis.cache.get(ayarlar.emojiler.discow009)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const rcreated = member.user.createdAt
const rgun = moment(new Date(rcreated).toISOString()).format('DD')
const ray = moment(new Date(rcreated).toISOString()).format('MM').replace("01", "Ocak").replace("02","??ubat").replace("03","Mart").replace("04", "Nisan").replace("05", "May??s").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "A??ustos").replace("09", "Eyl??l").replace("10","Ekim").replace("11","Kas??m").replace("12","Aral??k")
const ry??l = moment(new Date(rcreated).toISOString()).format('YYYY')
const rsaat = moment(new Date(rcreated).toISOString()).format('HH:mm')
const rcre = `${rgun} ${ray} ${ry??l} | ${rsaat}`  

const kurulus = new Date().getTime() - member.user.createdAt.getTime();  
const gecen = moment.duration(kurulus).format(`YY [Y??l,] DD [G??n,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 

var kontrol;
  if (kurulus < 1296000000) kontrol = `**\`G??venli De??il\`** ${dikkat}`
  if (kurulus > 1296000000) kontrol = `**\`G??venli\`** ${tik}`

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const taglimi = member.user.username.includes(abot.tag) ? `${abot.tag} ??sim | Ya??` : `${abot.dtag} ??sim | Ya??`

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const voiceChannels = member.guild.channels.cache.filter(c => c.type === 'voice');
let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

var uyesayi = member.guild.memberCount.toString().replace(/ /g, "    ")
var us = uyesayi.match(/([0-9])/g)
  uyesayi = uyesayi.replace(/([a-zA-Z])/g, "Bilinmiyor").toLowerCase()
    if(us) {
  uyesayi = uyesayi.replace(/([0-9])/g, d => {
    return {
  '0': `${discow000}`,
  '1': `${discow001}`,
  '2': `${discow002}`,
  '3': `${discow003}`,
  '4': `${discow004}`,                       
  '5': `${discow005}`,
  '6': `${discow006}`,
  '7': `${discow007}`,
  '8': `${discow008}`,
  '9': `${discow009}`
}[d];
})}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  
var sessay?? = count.toString().replace(/ /g, "    ")
var ??s2 = sessay??.match(/([0-9])/g)
  sessay?? = sessay??.replace(/([a-zA-Z])/g, "Bilinmiyor").toLowerCase()
    if(??s2) {
  sessay?? = sessay??.replace(/([0-9])/g, d => {
    return {
  '0': `${discow000}`,
  '1': `${discow001}`,
  '2': `${discow002}`,
  '3': `${discow003}`,
  '4': `${discow004}`,                       
  '5': `${discow005}`,
  '6': `${discow006}`,
  '7': `${discow007}`,
  '8': `${discow008}`,
  '9': `${discow009}`
}[d];
})}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const discow = new Discord.MessageEmbed()
.setColor('BLACK')
.setFooter(abot.footer, member.user.avatarURL({ dynamic: true }))
.setTimestamp()

    if(!member.user.bot) {

  await client.channels.cache.get(registerchat).send(discow
.setDescription(`${ok} **${member}, Sunucumuza Ho??geldin.**
  
${ses} **Seninle Beraber** ${uyesayi} **Ki??i Olduk. / ??uanda Sunucumuzun Ses Kanallar??nda** ${sessay??} **Ki??i Bulunmakta.**
  
${yetkili} **Kay??t Olmak ????in Sol Tarafta Bulunan <#${akanal.welcome1}> Odas??n?? Girip** **\`Ses Teyit\`** **Verebilirsin.**

${kristal} **E??er Sende Ailemizden Olmak ??stersen Tag??m??z?? Alabilirsin.** **[** **\`${abot.tag}\`** **]**

${kurallar} **Sunucu Kurallar??m??z <#${akanal.kurallar}> Kanal??nda Belirtilmi??tir. Unutma Sunucu ????erisindeki \`Ceza ????lemlerin Kurallar?? Okudu??unu Varsayarak Uygulanacak\`.**

${ok} **Hesab??n** **\`${gecen}\`** **??nce Olu??turulmu??.**

**??????????????????????????????????????????????????????????????????????????????????????????????????????????????????**`)
.addField(`Hesab??n Olu??turulma Tarihi :`, `**\`${rcre}\`**`, true)
.addField(`Hesap G??venlimi :`, `${kontrol}`, true))

  await client.channels.cache.get(registerchat).send(`**<@&${arol.registerstaff}> - ${member}**`)
  
} if(member.user.bot) {

  await client.channels.cache.get(registerchat).send(discow
.setDescription(`${ok} **Sunucuya Bir Bot Eklendi.**`)
.addField(`${ok} **Bot :**`, `**${member} / \`${member.user.username}\`**`)
.addField(`${ok} **Bot ID :**`, `\`${member.id}\``)
.addField(`Hesap Olu??turulma Tarihi :`, `**\`${rcre}\`**`, true))

  await client.channels.cache.get(registerchat).send(`**${abot.sahipler.map(x => `<@${x}>`).join("\n")}**`)

  await member.roles.set(arol.botlar);
  
  await member.setNickname("Yeni Bot")

}

}) 

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("guildMemberAdd", async member => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const sunucu = member.guild
const sunucusahip = member.guild.owner
const mesajsahip = member.user
const mesajuye = member

if(member.guild.id != sunucuid) return;

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const discow = new Discord.MessageEmbed()
.setColor('BLACK')
.setFooter(abot.footer, member.user.avatarURL({ dynamic: true }))
.setTimestamp()

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)
const kurallar = client.emojis.cache.get(ayarlar.emojiler.discow_kurallar)
const kristal = client.emojis.cache.get(ayarlar.emojiler.discow_kristal)
const yetkili = client.emojis.cache.get(ayarlar.emojiler.discow_yetkili)
const ses = client.emojis.cache.get(ayarlar.emojiler.discow_ses)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const discow000 = client.emojis.cache.get(ayarlar.emojiler.discow000)
const discow001 = client.emojis.cache.get(ayarlar.emojiler.discow001)
const discow002 = client.emojis.cache.get(ayarlar.emojiler.discow002)
const discow003 = client.emojis.cache.get(ayarlar.emojiler.discow003)
const discow004 = client.emojis.cache.get(ayarlar.emojiler.discow004)
const discow005 = client.emojis.cache.get(ayarlar.emojiler.discow005)
const discow006 = client.emojis.cache.get(ayarlar.emojiler.discow006)
const discow007 = client.emojis.cache.get(ayarlar.emojiler.discow007)
const discow008 = client.emojis.cache.get(ayarlar.emojiler.discow008)
const discow009 = client.emojis.cache.get(ayarlar.emojiler.discow009)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

var uyesayi = member.guild.memberCount.toString().replace(/ /g, "    ")
var us = uyesayi.match(/([0-9])/g)
  uyesayi = uyesayi.replace(/([a-zA-Z])/g, "Bilinmiyor").toLowerCase()
    if(us) {
  uyesayi = uyesayi.replace(/([0-9])/g, d => {
return {
  '0': `${discow000}`,
  '1': `${discow001}`,
  '2': `${discow002}`,
  '3': `${discow003}`,
  '4': `${discow004}`,                       
  '5': `${discow005}`,
  '6': `${discow006}`,
  '7': `${discow007}`,
  '8': `${discow008}`,
  '9': `${discow009}`
}[d];
})}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    if(member.user.username.includes(abot.tag)) {
      
      const kurulus = new Date().getTime() - member.user.createdAt.getTime();  
const gecen = moment.duration(kurulus).format(`YY [Y??l,] DD [G??n,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 

var kontrol;
if (kurulus > 1296000000) {

  await member.roles.add(arol.kayitsiz);
  await member.roles.add(arol.tagli);
  await member.setNickname(`${abot.tag} ??sim | Ya??`);

  await client.channels.cache.get(akanal.taglilog).send(discow.setDescription(`${ok} **${member}, Aram??za** **\`Tagl??\`** **??ekilde Kat??ld??.** ${tik}`))
  await client.channels.cache.get(akanal.otorollog).send(discow.setDescription(`${ok} **${member} Aram??za Kat??ld??.**
**Sunucuda Toplam** ${uyesayi} **Ki??i Bulunuyor.** ${tik}`))
    } else {
      
          await member.roles.add(arol.supheli);
  await member.setNickname(`${abot.tag} ????pheli Hesap`);

  await client.channels.cache.get(akanal.otorollog).send(discow.setDescription(`${ok} **${member} Aram??za Kat??ld??.**
**Sunucuda Toplam** ${uyesayi} **Ki??i Bulunuyor.** ${tik}`))
      
    }
} else {
  
  const kurulus = new Date().getTime() - member.user.createdAt.getTime();  
const gecen = moment.duration(kurulus).format(`YY [Y??l,] DD [G??n,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 

var kontrol;
  if (kurulus > 1296000000) {

  await member.roles.add(arol.kayitsiz);
  await member.setNickname(`${abot.dtag} ??sim | Ya??`);

  await client.channels.cache.get(akanal.otorollog).send(discow.setDescription(`${ok} **${member} Aram??za Kat??ld??.**
**Sunucuda Toplam** ${uyesayi} **Ki??i Bulunuyor.** ${tik}`))

}else {
  
    await member.roles.add(arol.supheli); 
  await member.setNickname(`${abot.dtag} ????pheli Hesap`);

  await client.channels.cache.get(akanal.otorollog).send(discow.setDescription(`${ok} **${member} Aram??za Kat??ld??.**
**Sunucuda Toplam** ${uyesayi} **Ki??i Bulunuyor.** ${tik}`))
      
    }

}

})

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("userUpdate", async (eski, yeni) => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    if(eski.username === yeni.username) return;

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const discow = new Discord.MessageEmbed()
.setColor('BLACK')
.setFooter(abot.footer, yeni.avatarURL({ dynamic: true }))
.setTimestamp()

const guild = client.guilds.cache.get(abot.sunucuid);
const member = guild.members.cache.get(eski.id);

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)
const kurallar = client.emojis.cache.get(ayarlar.emojiler.discow_kurallar)
const kristal = client.emojis.cache.get(ayarlar.emojiler.discow_kristal)
const yetkili = client.emojis.cache.get(ayarlar.emojiler.discow_yetkili)
const ses = client.emojis.cache.get(ayarlar.emojiler.discow_ses)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const eskiu = client.guilds.cache.get(abot.sunucuid).members.cache.get(eski.id)
const yeniu = client.guilds.cache.get(abot.sunucuid).members.cache.get(yeni.id)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    if(yeni.username.includes(abot.tag) && !eskiu.roles.cache.has(arol.tagli)) {

  await client.channels.cache.get(akanal.taglilog).send(discow.setDescription(`${ok} **${yeni}, Tag??m??z?? Ald?? Ve** **\`Tagl??\`** **Rol??ne Sahip Oldu.** ${tik}`))

  await client.guilds.cache.get(abot.sunucuid).members.cache.get(yeni.id).roles.add(arol.tagli);

  await member.setNickname(member.displayName.replace(abot.dtag, abot.tag))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if(!yeni.username.includes(abot.tag) && eskiu.roles.cache.has(arol.tagli)) {

  await client.channels.cache.get(akanal.taglilog).send(discow.setDescription(`${ok} **${yeni}, Tag??m??z?? ????kard?? Ve** **\`Tagl??\`** **Rol?? Kendisinden Al??nd??.** ${tik}`))

  await client.guilds.cache.get(abot.sunucuid).members.cache.get(yeni.id).roles.remove(arol.tagli);

  await member.setNickname(member.displayName.replace(abot.tag, abot.dtag))
}

})

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("message", async msg => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  
if(msg.author.bot) return;
if(msg.channel.type === "dm") return;

const kanal = msg.channel
const sunucu = msg.guild
const sunucusahip = msg.guild.owner
const mesaj = msg
const mesajsahip = msg.author
const mesajuye = msg.member

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const discow = new Discord.MessageEmbed()
.setColor('BLACK')
.setFooter(abot.footer, mesajsahip.avatarURL({ dynamic: true }))
.setTimestamp()

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------


let komut1 = "tag"
let komut2 = "Tag"
let komut3 = "!tag"
let komut4 = "!Tag"
let komut5 = "-tag"
let komut6 = "-Tag"
let komut7 = "_tag"
let komut8 = "_Tag"
let komut9 = "*tag"
let komut10 = "*Tag"
let komut11 = "?tag"
let komut12 = "?Tag"
let komut13 = "+tag"
let komut14 = "+Tag"
let komut15 = "%tag"
let komut16 = "%Tag"
let komut17 = ".tag"
let komut18 = ".Tag"

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    if(msg.content.toLowerCase() === komut1) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut2) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut3) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut4) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut5) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut6) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut7) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut8) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut9) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut10) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut11) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut12) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut13) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut14) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut15) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut16) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut17) return kanal.send(abot.tag)
    if(msg.content.toLowerCase() === komut18) return kanal.send(abot.tag)


})

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------