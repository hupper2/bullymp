'use strict';

const commandManager = bullymp.events.call('get_command_manager')[0];
const chat = bullymp.events.call('get_chat')[0];

commandManager.add('cl_eval', function(player, ...split_code) {
	if(typeof split_code === 'undefined') {
        chat.send(player, chat.colors.grey, 'Syntax: /cl_eval [code]');
        return;
	}
	
	const code = split_code.join(' ');
	bullymp.events.callRemote(player, 'eval', code);
});

commandManager.add('eval', function(player, ...split_code) {
	if(typeof split_code === 'undefined') {
        chat.send(player, chat.colors.grey, 'Syntax: /eval [code]');
        return;
	}
	
	const code = split_code.join(' ');
    console.log(code);

    try {
        let result = eval(code);
        chat.send(player, chat.colors.green, `EVAL: ${result}`);
    } catch (e) {
        chat.send(player, chat.colors.red, `EVAL: ${e}`);
    };
});
