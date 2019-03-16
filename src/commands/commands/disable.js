const { oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class DisableCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'disable',
			aliases: ['komutkapat', 'kk', 'komut-kapat'],
			group: 'commands',
			memberName: 'disable',
            guildOnly: true,
			description: 'Bir komutu veya komut grubunu devre dışı bırakır.',

			args: [
				{
					key: 'cmdOrGrp',
					label: 'komut/grup',
					prompt: 'Hangi komutu veya komut grubunu devre dışı bırmak istersiniz?',
					type: 'command|group'
				}
			]
		});
	}

	hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
	}

	run(msg, args) {
		if(!args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
			return msg.reply(`\`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'komutu' : 'grubu'} zaten devre dışı.`);
		}
		if(args.cmdOrGrp.guarded) {
			return msg.reply(`\`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'komudunu' : 'grubunu'} devre dışı bırakamazsın.`);
		}
		args.cmdOrGrp.setEnabledIn(msg.guild, false);
		return msg.reply(`\`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'komutu' : 'grubu'} devre dışı bırakıldı.`);
	}
};
