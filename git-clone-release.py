#! /usr/bin/python

import os
import sys
import json
import zipfile
from urllib.request import urlopen, urlretrieve

def getFromAPI(user, repo):
	try:
		return json.loads(urlopen("https://api.github.com/repos/%(user)s/%(repo)s/releases/latest" % locals()).read().decode('utf-8'))
	except Exception as e:
		raise e

def downloadFile(url, name):
	try:
		# Needs fixing =). Over 100%??
		def dlProgress(count, blockSize, totalSize):
			i = int((count * totalSize) / totalSize)
			sys.stdout.write('\r')
			sys.stdout.write("[%-20s] %d%%" % ('='*i, 5*i))
			sys.stdout.flush()

		urlretrieve(url, name + '.zip', reporthook=dlProgress)
		print('\n')
		print("Download done! Created file " + name + '.zip (This will later be deleted).')
	except Exception as e:
		raise e

def extractZip(fileName):
	try:
		zip_ref = zipfile.ZipFile(fileName, 'r')
		zip_ref.extractall()
		zip_ref.close()
	except Exception as e:
		raise e

args = sys.argv
args.remove(__file__)

if (args != None):
	if (len(args) > 0):
		if (args[0]):
			userName = args[0]
		else:
			userName = input("GitHub username: ")
	else:
		userName = input("GitHub username: ")

	if (len(args) > 1):
		if (args[1]):
			repository = args[1]
		else:
			repository = input("GitHub repo: ")
	else:
		repository = input("GitHub repo: ")
else:
	userName = input("GitHub username: ")
	repository = input("GitHub repo: ")

print('\n')

print("Started getting info from GitHub")
APIVals = getFromAPI(userName, repository)
fileName = APIVals['name']

print("Started downloading file")
downloadFile(APIVals['zipball_url'], fileName)

print("Extracting zip file...")
extractZip(fileName + '.zip')

print("Removing temp files.")
os.remove(fileName + '.zip')