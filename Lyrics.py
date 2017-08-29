import sys
import json
from html.parser import HTMLParser
from urllib.request import Request, urlopen

base_url = "https://api.genius.com"
TOKEN = ''

headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
			 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			 'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
			 'Accept-Encoding': 'none',
			 'Accept-Language': 'en-US,en;q=0.8',
			 'Connection': 'keep-alive',
			 'Authorization': 'Bearer ' + TOKEN}

if (sys.argv):
	if (len(sys.argv) >= 3):
		song_title = str(sys.argv[1])
		artist_name = str(sys.argv[2])
	else:
		print('No sufficient args')
		exit()
else:
	print('No args')
	exit()

class MyHTMLParser(HTMLParser):

	def __init__(self):
		HTMLParser.__init__(self)
		self.recording = 0
		self.data = []
	def handle_starttag(self, tag, attrs):
		if tag == 'div':
			for name, value in attrs:
				if name == 'class' and value == 'lyrics':
					self.recording = 1


	def handle_endtag(self, tag):
		if tag == 'required_tag':
			self.recording -=1

	def handle_data(self, data):
		if (data.strip().lower() == 'more on genius'):
			self.recording -= 1

		if self.recording:
			self.data.append(data)

parser = MyHTMLParser()

def flatten(arr):
	string = ''

	for val in arr:
		if (val != ' '):
			string += val

	return string

def lyrics_from_song_api_path(song_api_path):
	song_url = base_url + song_api_path
	req = Request(song_url, headers=headers)
	response = urlopen(req)
	json_data = json.loads(response.read().decode(response.info().get_param('charset') or 'utf-8'))
	path = json_data["response"]["song"]["path"]
	#gotta go regular html scraping... come on Genius
	page_url = "http://genius.com" + path
	req = Request(page_url, headers=headers)
	response = urlopen(req)
	page = response.read().decode(response.info().get_param('charset') or 'utf-8')
	html = parser.feed(page)
	lyrics = parser.data
	parser.close()
	#remove script tags that they put in the middle of the lyrics
	# [h.extract() for h in html('script')]
	#at least Genius is nice and has a tag called 'lyrics'!
	# lyrics = html.find("div", class_="lyrics").get_text() #updated css where the lyrics are based in HTML
	return flatten(lyrics)

if __name__ == "__main__":
	if (song_title and artist_name):
		search_url = base_url + "/search?q=" + song_title
		req = Request(search_url, headers=headers)
		response = urlopen(req)
		json_data = json.loads(response.read().decode(response.info().get_param('charset') or 'utf-8'))
		song_info = None
		for hit in json_data["response"]["hits"]:
			if hit["result"]["primary_artist"]["name"].lower() == artist_name.lower():
				song_info = hit
				break
		if song_info:
			song_api_path = song_info["result"]["api_path"]
			print(lyrics_from_song_api_path(song_api_path))
