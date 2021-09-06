const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar');
const { MessageButton } = require('discord-buttons');

exports.run = async (client, message, args) => {

const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.bot.footer}`, message.author.avatarURL({ dynamic: true })).setTimestamp()
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)

const delhook = new Discord.WebhookClient("879991923325165578", "yfjx0f6Ofaj877fL2qgNUSBB3Xf_GKT_vwy0jb_ppOpWfzHBINZJys2bSJWUNTVA1XAG")

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

const butoncuk = MessageButton

if(!message.member.roles.cache.get(arol.registerstaff) && !message.member.hasPermission("ADMINISTRATOR") && !abot.sahipler.includes(message.author.id)) return discowerror(`**Bu Komutu Kullanabilmek İçin** **\`Yeterli Yetkiye\`** **Sahip Değilsin.**`)

const kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
const isim = args[1]
const yas = Number(args[2])

if(!kullanıcı) return discowerror(`**Lütfen Bir** **\`Kullanıcı\`** **Belirt.**`)
if(!isim) return discowerror(`**Lütfen Bir** **\`İsim\`** **Belirt.**`)
if(!yas) return discowerror(`**Lütfen Bir** **\`Yaş\`** **Belirt.**`)
  
if(db.get("Yasi_Kucuk&"+kullanıcı.id) === "Evet") return discowerror(`**Bu Kullanıcı** **\`Daha Önce Kayıt Olmaya Çalışmış\`** **Ama Yaş Sınırını Karşılamadığı İçin KaraListeye Alınmış.**`)
if(yas < abot.yassiniri) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcı** **\`Yaş Sınırını\`** **Karşılamadığı İçin Kayıt Edemezsin.**`).then(x => db.set("Yasi_Kucuk&"+kullanıcı.id, "Evet"))

if(kullanıcı.id === message.author.id) return discowerror(`**Kendini** **\`Kayıt\`** **Edemezsin.**`)
if(kullanıcı.id === client.user.id) return discowerror(`**Beni** **\`Kayıt\`** **Edemezsin.**`)
if(kullanıcı.id === message.guild.owner.id) return discowerror(`**Sunucu Sahibini** **\`Kayıt\`** **Edemezsin.**`)
if(kullanıcı.roles.cache.get(arol.yetkilistaff)) return discowerror(`**Sunucu Yetkililerini** **\`Kayıt\`** **Edemezsin.**`)
if(kullanıcı.bot) return discowerror(`**Botları** **\`Kayıt\`** **Edemezsin.**`)
if(abot.sahipler.includes(kullanıcı.id)) return discowerror(`**Sahiplerimi** **\`Kayıt\`** **Edemezsin.**`)
if(abot.sahipler.includes(kullanıcı.id)) return discowerror(`**Botları** **\`Kayıt\`** **Edemezsin.**`)
if(kullanıcı.roles.highest.position >= message.member.roles.highest.position) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcının Rolleri Seninkinden Yüksek Veya Aynı Roldesiniz.**`)
  
if(!message.member.voice.channel) return discowerror(`**Birisini Kayıt Edebilmek İçin** **\`V. Confirmed\`** **Odasında Bulunmalısın.**`)
if(!kullanıcı.voice.channel) return discowerror(`**Kayıt Etmeğe Çalıştığın Kullanıcı Bir** **\`V. Confirmed\`** **Odasında Değil.**`)
  
if(kullanıcı.roles.cache.get(arol.erkek1)) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcı Zaten Kayıtlı.**`)
if(kullanıcı.roles.cache.get(arol.kiz1)) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcı Zaten Kayıtlı.**`)
if(!kullanıcı.roles.cache.get(arol.kayitsiz)) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcının Kayıtsız Rolü Bulunmamakta.**`)

  
const erkekbuton = new MessageButton().setStyle(1).setLabel("👨 | Erkek Kayıt").setID("erkek_buton")
const kizbuton = new MessageButton().setStyle(1).setLabel("👩 | Kız Kayıt").setID("kiz_buton")
const isimbuton = new MessageButton().setStyle(1).setLabel("💬 | İsim Değiştir").setID("isim_buton")
const iptalbuton = new MessageButton().setStyle(4).setLabel("❌ | İptal Et").setID("iptal_buton")

const rgun = moment(new Date()).format('DD')
const ray = moment(new Date()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date()).format('YYYY')
const rsaat = moment(new Date()).add(3, "hours").format('HH:mm:ss')
const tarih = `${rgun} ${ray} ${ryıl} | ${rsaat}`  

let toplams = db.get("Kayit_Toplam&"+message.author.id) ? `${db.get("Kayit_Toplam&"+message.author.id)} Adet` : `0 Adet`
let erkeks = db.get("Kayit_Erkek&"+message.author.id) ? `${db.get("Kayit_Erkek&"+message.author.id)} Adet` : `0 Adet`
let kizs = db.get("Kayit_Kiz&"+message.author.id) ? `${db.get("Kayit_Kiz&"+message.author.id)} Adet` : `0 Adet`
let isims = db.get("Kayit_İsim&"+message.author.id) ? `${db.get("Kayit_İsim&"+message.author.id)} Adet` : `0 Adet`

let isis = ``

var sayi = 1

if(db.get("İsimler&"+kullanıcı.id)) isis = `${db.get("İsimler&"+kullanıcı.id).map(x => `**\`${sayi++}\`. [\`${x.isim}\`] / [\`${x.cinsiyet}\`] / [${x.yetkili}] / [\`${x.tarih}\`]**`).join("\n")}`
if(db.get("İsimler&"+kullanıcı.id) === undefined) isis = `**\`\`\`Bulunamadı!\`\`\`**`
if(db.get("İsimler&"+kullanıcı.id) === null) isis = `**\`\`\`Bulunamadı!\`\`\`**`
if(!db.get("İsimler&"+kullanıcı.id)) isis = `**\`\`\`Bulunamadı!\`\`\`**`
if(db.get("İsimler&"+kullanıcı.id) === 0) isis = `**\`\`\`Bulunamadı!\`\`\`**`

await message.channel.send(discow.setDescription(`${dikkat} **${message.member} Lütfen Bir Cinsiyet Seç.** ${dikkat}

${ok} **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
${ok} **Kayıt Edilen Kullanıcı :** **${kullanıcı} / \`${kullanıcı.user.tag}\`**

${ok} **Kullanıcının Yeni İsmi :** **\`${kullanıcı.user.username.includes(abot.tag) ? abot.tag : abot.dtag} ${isim} | ${yas}\`**
${ok} **Taglımı :** **\`${kullanıcı.user.username.includes(abot.tag) ? "Evet" : "Hayır"}\`**
`), { buttons: [erkekbuton, kizbuton, isimbuton, iptalbuton]}).then(async function(discowm) {

discowm.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
    
if(button.id === "iptal_buton") {
  await button.reply.defer()
  await button.message.delete()
  await discowsend(`${ok} **${message.member} İşlem Başarıyla İptal Edildi.** ${tik}`)
}
  
if(button.id === "isim_buton") {
  await button.reply.defer()
  await button.message.delete()
  await discowsend(`${ok} **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
${ok} **Kayıt Edilen Kullanıcı :** **${kullanıcı} / \`${kullanıcı.user.tag}\`**
  
${ok} **Yetkilinin Toplam Kayıt Sayısı :** **\`${toplams}\`**
${ok} **Yetkilinin Toplam İsim Değiştirme Sayısı :** **\`${isims}\`**

${ok} **Kullanıcının Önceki İsimleri :**
${isis}`)
  
  await kullanıcı.setNickname(`${kullanıcı.user.username.includes(abot.tag) ? abot.tag : abot.dtag} ${isim} | ${yas}`).catch(err => { })
  
  await db.add("Kayit_Toplam&"+message.author.id, +1)
  await db.add("Kayit_İsim&"+message.author.id, +1)
  await db.push("İsimler&"+kullanıcı.id, { isim: `${kullanıcı.user.username.includes(abot.tag) ? abot.tag : abot.dtag} ${isim} | ${yas}`, cinsiyet: "İsim", yetkili: `**${message.member} / \`${message.author.tag}\`**`, tarih: `${tarih}`})
}
  
if(button.id === "kiz_buton") {
  await button.reply.defer()
  await button.message.delete()
  await discowsend(`${ok} **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
${ok} **Kayıt Edilen Kullanıcı :** **${kullanıcı} / \`${kullanıcı.user.tag}\`**
  
${ok} **Yetkilinin Toplam Kayıt Sayısı :** **\`${toplams}\`**
${ok} **Yetkilinin Toplam Kız Kayıt Sayısı :** **\`${kizs}\`**

${ok} **Kullanıcının Önceki İsimleri :**
${isis}`)
  await delhook.send(discow.setDescription(`
**${kullanıcı} / \`${kullanıcı.user.tag}\`**

**\`»\`** **Kayıt İşlemin Başarıyla Gerçektirildi.**

**\`»\`** **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
**\`»\`** **Cinsiyetin :** **\`Kız\`**`))
  
  await kullanıcı.roles.remove(arol.kayitsiz).catch(err => { })
  await kullanıcı.roles.add(arol.kiz1).catch(err => { })
  await kullanıcı.setNickname(`${kullanıcı.user.username.includes(abot.tag) ? abot.tag : abot.dtag} ${isim} | ${yas}`).catch(err => { })
  
  await db.add("Kayit_Toplam&"+message.author.id, +1)
  await db.add("Kayit_Kiz&"+message.author.id, +1)
  await db.push("İsimler&"+kullanıcı.id, { isim: `${kullanıcı.user.username.includes(abot.tag) ? abot.tag : abot.dtag} ${isim} | ${yas}`, cinsiyet: "Kız", yetkili: `**${message.member} / \`${message.author.tag}\`**`, tarih: `${tarih}`})
}
  
if(button.id === "erkek_buton") {
  await button.reply.defer()
  await button.message.delete()
  await discowsend(`${ok} **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
${ok} **Kayıt Edilen Kullanıcı :** **${kullanıcı} / \`${kullanıcı.user.tag}\`**
  
${ok} **Yetkilinin Toplam Kayıt Sayısı :** **\`${toplams}\`**
${ok} **Yetkilinin Toplam Erkek Kayıt Sayısı :** **\`${erkeks}\`**

${ok} **Kullanıcının Önceki İsimleri :**
${isis}`)
  await delhook.send(discow.setDescription(`
**${kullanıcı} / \`${kullanıcı.user.tag}\`**

**\`»\`** **Kayıt İşlemin Başarıyla Gerçektirildi.**

**\`»\`** **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
**\`»\`** **Cinsiyetin :** **\`Erkek\`**`))
  
  await kullanıcı.roles.remove(arol.kayitsiz).catch(err => { })
  await kullanıcı.roles.add(arol.erkek1).catch(err => { })
  await kullanıcı.setNickname(`${kullanıcı.user.username.includes(abot.tag) ? abot.tag : abot.dtag} ${isim} | ${yas}`).catch(err => { })
  
  await db.add("Kayit_Toplam&"+message.author.id, +1)
  await db.add("Kayit_Erkek&"+message.author.id, +1)
  await db.push("İsimler&"+kullanıcı.id, { isim: `${kullanıcı.user.username.includes(abot.tag) ? abot.tag : abot.dtag} ${isim} | ${yas}`, cinsiyet: "Erkek", yetkili: `**${message.member} / \`${message.author.tag}\`**`, tarih: `${tarih}`})
}
    
})})
  

  
}
exports.conf = {
    aliases: ['kayıt', 'kayit', 'e', 'erkek', 'man', 'k', 'kız', 'kiz', 'woman', 'nick', 'isim', 'nickname'],
  };
  
  exports.help = {
    name: 'Kayıt Komutu',
  };