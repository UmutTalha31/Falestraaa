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

const kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  
const secim = args[1]

if(secim === "sifirla") {
  if(!message.member.hasPermission("ADMINISTRATOR") && !abot.sahipler.includes(message.author.id)) return;
  discowsend(`${ok} **${kullanıcı} Kullanıcısının Kayıt Verisi Başarıyla Temizlendi.** ${tik}`)
  db.delete("Kayit_Toplam&"+kullanıcı.id)
  db.delete("Kayit_Erkek&"+kullanıcı.id)
  db.delete("Kayit_Kiz&"+kullanıcı.id)
  db.delete("Kayit_İsim&"+kullanıcı.id)
}

let toplam = `${ok} **Toplam Kayıt Sayısı :** **\`${db.get("Kayit_Toplam&"+kullanıcı.id) ? db.get("Kayit_Toplam&"+kullanıcı.id) : "0"} Adet\`**`
let erkek = `${ok} **Toplam Erkek Kayıt Sayısı :** **\`${db.get("Kayit_Erkek&"+kullanıcı.id) ? db.get("Kayit_Erkek&"+kullanıcı.id) : "0"} Adet\`**`
let kiz = `${ok} **Toplam Kız Kayıt Sayısı :** **\`${db.get("Kayit_Kiz&"+kullanıcı.id) ? db.get("Kayit_Kiz&"+kullanıcı.id) : "0"} Adet\`**`
let isim = `${ok} **Toplam İsim Değiştirme Sayısı :** **\`${db.get("Kayit_İsim&"+kullanıcı.id) ? db.get("Kayit_İsim&"+kullanıcı.id) : "0"} Adet\`**`

discowsend(`${ok} **${kullanıcı} Kullanıcısının Kayıt Verisi :**
${toplam}
${erkek}
${kiz}
${isim}`)

}
exports.conf = {
    aliases: ['stat', 'me', 'kayitlarim', 'puanım', 'puanim'],
  };
  
  exports.help = {
    name: 'Stat Komutu',
  };