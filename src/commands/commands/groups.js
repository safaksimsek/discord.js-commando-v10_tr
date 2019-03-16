const { stripIndents } = require('common-tags');
const Command = require('../base');

module.exports = class ListGroupsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'groups',
			aliases: ['gruplar'],
			group: 'commands',
			memberName: 'groups',
			description: 'Komut gruplarını listeler.'
		});
	}

	hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
	}

	run(msg) {
		return msg.reply(stripIndents`
			**Komut Grupları**
			${this.client.registry.groups.map(grp =>
				`**${grp.name}:** ${grp.isEnabledIn(msg.guild) ? 'Açık' : 'Kapalı'}`
			).join('\n')}
		`);
	}
};
