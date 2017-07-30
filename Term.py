import re
import json
import sys
import os

currentDir = os.getcwd()

# history = ['ls', 'ls k']
# historyIndex = 0

# Command functions
'''
def up(args):
	amount = 1
	global historyIndex

	if (args): amount = int(args.pop(0))
	if (len(history) > historyIndex + amount - 1):
		historyIndex += amount
		sys.stdout.write(history[historyIndex])

def down(args):
	amount = 1
	global historyIndex

	if (args): amount = int(args.pop(0))
	if (len(history) > historyIndex - amount + 1):
		historyIndex -= amount
		print(history[historyIndex])
	else:
		sys.stdout.write("")
'''

def cd(args):
	if (args):
		path = args.pop(0);

		print(type(path))

		if (os.path.exists(path)):
			currentDir = path
		else: print("ERROR: Path is invalid")
	else: print("ERROR: No arguments. Expected one")

def ls(args):
	for file in os.listdir(currentDir):
		if (os.path.isdir(file)):
			sys.stdout.write("\x1b[34m" + file + "\x1b[0m\t")
		elif (os.path.isfile(file)):
			sys.stdout.write("\x1b[32m" + file + "\x1b[0m\t")

	sys.stdout.write("\n")



def echo(args):
	print(''.join(args))

# Starting vars
running = True
commands = {
	"ls": ls,
	"cd": cd,
	"echo": echo
}

# Running code
print("\x1b[35m" + "Started pyterm (type help to show the available commands)" + "\x1b[0m\n")
while (running):
	try:
		input = raw_input()

		if (input.lower() == 'help'):
			outp = ""

			for command in commands:
				outp += command + ", "

			print("  \x1b[36m" + outp[:-2] + "\x1b[0m")
		else:
			arr = re.split(r'\s+', input)
			command = arr.pop(0).lower()

			if (command in commands):
				commands[command](arr)
			else:
				print("ERROR: Command not found")
	except KeyboardInterrupt:
		print("");
		exit()