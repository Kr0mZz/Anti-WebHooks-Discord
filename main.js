// ANTI WEBHOOKS BY KROMZZ
// ANTI WEBHOOKS BY KROMZZ
const {Client} = require('discord.js'),
    client = new Client;

client.login('TOKEN');

client.on('ready', async () => {
    console.log(`${client.user.tag} connected`)
})
// ANTI WEBHOOKS BY KROMZZ
client.on('webhookUpdate', async (channel) => {
    channel.guild.fetchAuditLogs({limit: 1, type: "WEBHOOK_CREATE"}).then(data => {
        const value = data.entries.first();
        if (value && value.executor) {
            const member = channel.guild.members.cache.get(value.executor.id);
            if (member)
                member.kick().catch(reason => console.error(reason.message)).then(() => console.log(`${member.user.tag} kicked because of webhook created !`));
        }
    }).catch(err => console.error(err.message))
    channel.fetchWebhooks().then(webs => webs.each(w => w.delete().catch(reason => console.error(reason.message)).then(() => console.log('Webhook deleted successfully')))).catch(error => console.error(error.message))
})


client.on('message', (message) => {
    if (message.mentions.everyone && (message.channel.type === "text" || message.channel.type === "news") ) {
        const chanPosition = message.channel.position;
        message.channel.delete().then(() => {
            message.channel.clone().then(value => {
                value.setPosition(chanPosition).then(() => {
                    if (message.member)
                        message.member.kick().catch(reason => console.error(reason.message)).then(() => {
                            console.log(`${message.member.user.tag} kicked because of everyone !`)
                        }).catch(err => console.error(err))
                }).catch(err => console.error(err))
            }).catch(err => console.error(err))
        }).catch(err => console.error(err))
    }
})
// ANTI WEBHOOKS BY KROMZZ
// ANTI WEBHOOKS BY KROMZZ
