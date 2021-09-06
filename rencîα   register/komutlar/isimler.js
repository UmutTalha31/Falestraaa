const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar');

exports.run = async (client, message, args) => {

const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.bot.footer}`, message.author.avatarURL({ dynamic: true })).setTimestamp()
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)

const channel = message.channel
const guild = message.guild
const guildowner = message.guild.owner
const messageauthor = message.author
const messagemember = message.member
const kanal = message.channel
const sunucu = message.guild
const sunucusahip = message.guild.owner
const mesaj = message
const mesajsahip = message.author
const mesajuye = message.member

const abot = ayarlar.bot
const akanal = ayarlar.kanallar
const arol = ayarlar.roller

const discowsend = async message => {
kanal.send(discow.setDescription(`${message}`))
}

const discowerror = async message => {
kanal.send(discow.setDescription(`${dikkat} ${message} ${dikkat}`))
}

if(!message.member.roles.cache.get(arol.registerstaff) && !message.member.hasPermission("ADMINISTRATOR") && !abot.sahipler.includes(message.author.id)) return discowerror(`**Bu Komutu Kullanabilmek İçin** **\`Yeterli Yetkiye\`** **Sahip Değilsin.**`).then(x => {x.delete({ timeout: 15000 })})

const kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!kullanıcı) return discowerror(`**Lütfen Bir** **\`Kullanıcı\`** **Belirt.**`)
  
const secim = args[1]

if(secim === "sifirla") {
  if(!message.member.hasPermission("ADMINISTRATOR") && !abot.sahipler.includes(message.author.id)) return;
  discowsend(`${ok} **${kullanıcı} Kullanıcısının İsim Geçmişi Başarıyla Temizlendi.** ${tik}`)
  db.delete("İsimler&"+kullanıcı.id)
}

let isis = ``

var sayi = 1

if(db.get("İsimler&"+kullanıcı.id)) isis = `${db.get("İsimler&"+kullanıcı.id).map(x => `**\`${sayi++}\`. [\`${x.isim}\`] / [\`${x.cinsiyet}\`] / [${x.yetkili}] / [\`${x.tarih}\`]**`).join("\n")}`
if(db.get("İsimler&"+kullanıcı.id) === undefined) isis = `**\`\`\`Bulunamadı!\`\`\`**`
if(db.get("İsimler&"+kullanıcı.id) === null) isis = `**\`\`\`Bulunamadı!\`\`\`**`
if(!db.get("İsimler&"+kullanıcı.id)) isis = `**\`\`\`Bulunamadı!\`\`\`**`
if(db.get("İsimler&"+kullanıcı.id) === 0) isis = `**\`\`\`Bulunamadı!\`\`\`**`

discowsend(`${ok} **${kullanıcı} Kullanıcısının İsim Geçmişi :**
${isis}`)

}
exports.conf = {
    aliases: ['isimler', 'nicknames', 'gecmis', 'gecmiş', 'geçmiş', 'geçmis'],
  };
  
  exports.help = {
    name: 'İsimler Komutu',
  };