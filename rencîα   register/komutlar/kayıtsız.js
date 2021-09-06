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

if(!message.member.roles.cache.get(arol.registerstaff) && !message.member.hasPermission("ADMINISTRATOR") && !abot.sahipler.includes(message.author.id)) return discowerror(`**Bu Komutu Kullanabilmek İçin** **\`Yeterli Yetkiye\`** **Sahip Değilsin.**`)

const kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!kullanıcı) return discowerror(`**Lütfen Bir** **\`Kullanıcı\`** **Belirt.**`)
  
await kullanıcı.roles.cache.forEach(x => {
  kullanıcı.roles.remove(x.id)
})
await kullanıcı.setNickname(`${kullanıcı.user.username.includes(abot.tag) ? abot.tag : abot.dtag} İsim | Yaş`)
await kullanıcı.roles.add(arol.kayitsiz)
await message.react("✅")

}
exports.conf = {
    aliases: ['kayıtsız', 'kayitsiz', 'unreg', 'unregister'],
  };
  
  exports.help = {
    name: 'Kayıtsız Komutu',
  };