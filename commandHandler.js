class CommandHandler {
	constructor(commands) {
		this.commands = commands;
	}

	run(str) {
		const parsed = CommandHandler.parseCommand(str);

		if (parsed.cmd in this.commands) {
			try {
				return this.commands[parsed.cmd](parsed.opts, parsed.args, parsed.all);
			} catch (err) {
				console.error('FunctionExecutionError', err);
				return 'Error: Something went wrong with executing the function';
			}
		} else return 'Error: Command not found';
	}

	add(...args) {
		args.forEach(command => {
			if (command instanceof Array) {
				command.forEach((object, key) => {
					this.add(object);
				});
			} else if (command instanceof Object) {
				Object.assign(this.commands, command);
			} else return Error('Given argument is not an array or object');
		});
	}

	static parseCommand(str) {
		const outp = {
			cmd: '',
			all: [],
			args: [],
			opts: {
				all: [],
				long: [],
				short: []
			}
		}

		if (str) {
			if ((typeof str).toLowerCase() == 'string') {
				const arr = str.split(/\s+/);
				const cmd = arr.shift();

				arr.forEach((object, key) => {
					if (object.startsWith('--')) {
						outp.opts.all.push(object.replace('--', '').toLowerCase());
						outp.opts.long.push(object.replace('--', '').toLowerCase());
					} else if (object.startsWith('-')) {
						outp.opts.all = outp.opts.all.concat(object.replace('-', '').toLowerCase().split(''));
						outp.opts.short = outp.opts.short.concat(object.replace('-', '').toLowerCase().split(''));
					} else outp.args.push(object);
				});

				outp.cmd = cmd;
				outp.all = arr;
				return outp;
			} else return outp;
		} else return outp;
	}
}

const commandHandler = new CommandHandler({
	echo: (opts, args, all) => {
		if (opts.short.includes('h') || opts.long.includes('help')) {
			return 'HELP SUMMARY';
		} else if (opts.short.includes('k')) {
			return 'YAY K';
		} else {
			return args.join(' ');
		}
	}
});

console.log(commandHandler.run('echo -k ls kaas'));