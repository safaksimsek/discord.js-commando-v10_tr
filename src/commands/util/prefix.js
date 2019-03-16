const { stripIndents, oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class PrefixCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'prefix',
			group: 'util',
			memberName: 'prefix',
			description: 'Komut prefix(önek)ini gösterir/değiştirir.',
			format: '[prefix/"default"/"none"]',
			
			examples: ['prefix', 'prefix -', 'prefix default', 'prefix none'],

			args: [
				{
					key: 'prefix',
					prompt: 'Prefix(önek) olarak ne kullanmak istersiniz? (tüm komutların başına yazacaksınız.)',
					type: 'string',
					max: 15,
					default: ''
				}
			]
		});
	}

	async run(msg, args) {
		// Just output the prefix
		if(!args.prefix) {
			const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix;
			return msg.reply(stripIndents`
				${prefix ? `Komut ön-eki: \`${prefix}\`.` : 'Burada ön-ek kullanmanıza gerek yok.'}
				Komut kullanmak için: ${msg.anyUsage('command')}.
			`);
		}

		// Check the user's permission before changing anything
		if(msg.guild) {
			if(!msg.member.hasPermission('ADMINISTRATOR') && !this.client.isOwner(msg.author)) {
				return msg.reply('Sunucuda sadece `Yönetici` izni olanlar prefix değiştirebilir.');
			}
		} else if(!this.client.isOwner(msg.author)) {
			return msg.reply("Küresel (global) prefixi sadece bot yapımcı(ları) değiştirebilir.");
		}

		// Save the prefix
		const lowercase = args.prefix.toLowerCase();
		const prefix = lowercase === 'none' ? '' : args.prefix;
		let response;
		if(lowercase === 'default') {
			if(msg.guild) msg.guild.commandPrefix = null; else this.client.commandPrefix = null;
			const current = this.client.commandPrefix ? `\`${this.client.commandPrefix}\`` : 'prefix yok';
			response = `Prefix normale döndürüldü. (${current}).`;
		} else {
			if(msg.guild) msg.guild.commandPrefix = prefix; else this.client.commandPrefix = prefix;
			response = prefix ? `Prefix \`${args.prefix}\` olarak ayarlandı.` : "Komut prefix'i kaldırıldı!";
		}

		await msg.reply(`${response} Komutları çalıştırmak için: ${msg.anyUsage('command')}.`);
		return null;
	}
};
