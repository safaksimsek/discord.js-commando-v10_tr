const { oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class EnableCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'enable',
			aliases: ['komutaç', 'komut-aç', 'ka'],
			group: 'commands',
			memberName: 'enable',
			description: 'Devre dışı bırakılan komutu veya komut grubunu aktifleştirir.',
			args: [
				{
					key: 'cmdOrGrp',
					label: 'komut/grup',
					prompt: 'Hangi komutu veya komut grubunu aktifleştirmek istersiniz?',
					type: 'group|command'
				}
			]
		});
	}

	hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
	}

	run(msg, args) {
		const group = args.cmdOrGrp.group;
		if(args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
			return msg.reply(
				`\`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'komutu' : 'grubu'} zaten açık${
					group && !group.enabled ? `, fakat \`${group.name}\` grubu kapalı olduğu için kullanılamaz` : '.'
				}.`
			);
		}
		args.cmdOrGrp.setEnabledIn(msg.guild, true);
		return msg.reply(
			`\`${args.cmdOrGrp.name}\` ${group ? 'komutu' : 'grubu'} aktifleştirildi${
				group && !group.enabled ? `, fakat \`${group.name}\` grubu kapalı olduğu için kullanılamaz` : '.'
			}.`
		);
	}
};
