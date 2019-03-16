const { oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Botun pingini gösterir.',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run(msg) {
		if(!msg.editable) {
			const pingMsg = await msg.reply('Ölçülüyor...');
			return pingMsg.edit(oneLine`
				${msg.channel.type !== 'dm' ? `${msg.author},` : ''}
				Mesaj gecikmesi: ${pingMsg.createdTimestamp - msg.createdTimestamp}ms.
				${this.client.ping ? `Normal gecikme: ${Math.round(this.client.ping)}ms.` : ''}
			`);
		} else {
			await msg.edit('Ölçülüyor...');
			return msg.edit(oneLine`
				Mesaj gecikmesi: ${msg.editedTimestamp - msg.createdTimestamp}ms.
				${this.client.ping ? `Normal gecikme: ${Math.round(this.client.ping)}ms.` : ''}
			`);
		}
	}
};
