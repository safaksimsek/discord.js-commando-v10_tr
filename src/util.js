function disambiguation(items, label, property = 'name') {
	const itemList = items.map(item => `"${(property ? item[property] : item).replace(/ /g, '\xa0')}"`).join(',   ');
	return `Fazla ${label} bulundu, lütfen bunlardan birini seçin: ${itemList}`;
}

function paginate(items, page = 1, pageLength = 10) {
	const maxPage = Math.ceil(items.length / pageLength);
	if(page < 1) page = 1;
	if(page > maxPage) page = maxPage;
	const startIndex = (page - 1) * pageLength;
	return {
		items: items.length > pageLength ? items.slice(startIndex, startIndex + pageLength) : items,
		page,
		maxPage,
		pageLength
	};
}

const permissions = {
	ADMINISTRATOR: 'Yönetici',
	VIEW_AUDIT_LOG: 'Denetim kaydını görüntüle',
	MANAGE_GUILD: 'Sunucuyu yönet',
	MANAGE_ROLES: 'Rolleri yönet',
	MANAGE_CHANNELS: 'Kanalları yönet',
	KICK_MEMBERS: 'Üyeleri at',
	BAN_MEMBERS: 'Üyeleri yasakla',
	CREATE_INSTANT_INVITE: 'Davet oluştur',
	CHANGE_NICKNAME: 'Kullanıcı adını değiştir',
	MANAGE_NICKNAMES: 'Kullanıcı adlarını yönet',
	MANAGE_EMOJIS: 'Emojileri yönet',
	MANAGE_WEBHOOKS: 'Webhookları yönet',
	VIEW_CHANNEL: 'Metin kanallarını oku & ses kanallarını gör',
	SEND_MESSAGES: 'Mesaj gönder',
	SEND_TTS_MESSAGES: 'Sesli mesaj gönder',
	MANAGE_MESSAGES: 'Mesajları yönet',
	EMBED_LINKS: 'Gömülü bağlantılar',
	ATTACH_FILES: 'Dosya ekle',
	READ_MESSAGE_HISTORY: 'Mesaj geçmişini oku',
	MENTION_EVERYONE: 'Herkesi etiketle (everyone etiketi)',
	USE_EXTERNAL_EMOJIS: 'Harici emojiler kullan',
	ADD_REACTIONS: 'Tepki ekle',
	CONNECT: 'Bağlan',
	SPEAK: 'Konuş',
	MUTE_MEMBERS: 'Kullanıcıları sustur',
	DEAFEN_MEMBERS: 'Kullanıcıları sağırlaştır',
	MOVE_MEMBERS: 'Kullanıcıları taşı',
	USE_VAD: 'Ses eylemini kullan'
};

module.exports = {
	disambiguation,
	paginate,
	permissions
};
