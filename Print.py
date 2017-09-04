import socket

TCP_IP = '192.168.X.X'
TCP_PORT = 9100

while(True):
	try:
		s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		s.connect((TCP_IP, TCP_PORT))
		s.sendall(content.encode())
		s.shutdown(socket.SHUT_WR)
		s.close()

		print(s)
	except:
		print("Couldn't connect")
