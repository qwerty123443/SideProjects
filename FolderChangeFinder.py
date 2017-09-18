import os

def listDir(path):
	return os.listdir(path)

def isFileContentsTheSame(filePathOne, filePathTwo):
	fileContentsOne = open(filePathOne, 'r').read()
	fileContentsTwo = open(filePathTwo, 'r').read()

	if (len(fileContentsOne) == len(fileContentsTwo)):
		if (fileContentsOne == fileContentsTwo):
			return True
		else:
			return False
	else:
		return False

def check(dirOne, dirTwo):
	dirOneContents = listDir(dirOne)
	dirTwoContents = listDir(dirTwo)

	for val in dirOneContents:
		if (not val in dirTwoContents):
			if (os.path.isdir(dirOne + "/" + val)):
				print("Folder '" + val + "' is not in '" + dirOne[:-1] + "'")
			elif (os.path.isfile(dirOne + "/" + val)):
				print("'" + val + "' not in '" + dirTwo[:-1] + "'")
			else:
				print("Something went wrong...")
				exit(0)
		else:
			if (os.path.isdir(dirOne + "/" + val)):
				check(dirOne + val + "/", dirTwo + val + "/")
			elif (os.path.isfile(dirOne + "/" + val)):
				if (not isFileContentsTheSame(dirOne + "/" + val, dirTwo + "/" + val)):
					print("'" + val + "' is in '" + dirTwo[:-1] + "', but the contents changed")
			else:
				print('Something went wrong...')
				exit(0)

oldDir = input('Old directory: ')
newDir = input('New directory: ')

if (os.path.isdir(oldDir) and os.path.isdir(newDir)):
	print('------------------')

	if ((not oldDir.endswith('/')) or (not oldDir.endswith('\\'))):
		oldDir = oldDir + '/'

	if ((not newDir.endswith('/')) or (not newDir.endswith('\\'))):
		newDir = newDir + '/'

	check(oldDir, newDir)
	check(newDir, oldDir)
else:
	print("One or both of the given values is not a directory")

input()