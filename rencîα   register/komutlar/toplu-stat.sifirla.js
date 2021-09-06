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

if(!ayarlar.bot.sahipler.includes(mesajsahip.id) && !message.member.hasPermission("ADMINISTRATOR")) return discowerror(`**Bu Komutu Kullanabilmek İçin** **\`Yeterli Yetkiye\`** **Sahip Değilsin.**`)
  
discowsend(`${ok} **Herkesin Kayıt Verisi Başarıyla Sıfırlandı.** ${tik}`)

db.all().filter(data => data.ID.startsWith("Kayit_Toplam&")).forEach(data => {
            db.delete(data.ID)
})
  
db.all().filter(data => data.ID.startsWith("Kayit_Erkek&")).forEach(data => {
            db.delete(data.ID)
})
  
db.all().filter(data => data.ID.startsWith("Kayit_Kiz&")).forEach(data => {
            db.delete(data.ID)
})
  
db.all().filter(data => data.ID.startsWith("Kayit_İsim&")).forEach(data => {
            db.delete(data.ID)
})

}
exports.conf = {
    aliases: ['toplu-stat-sifirla', 'toplu-stat'],
  };
  
  exports.help = {
    name: 'Toplu Stat Sifirla Komutu',
  };