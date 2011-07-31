express = require("express")
app = express.createServer()
http = require("http")

app.configure () ->
	app.use(express.static(__dirname + '/public'))
	
options = { host: "laftraf.laughinglarkllc.com", port: 80, path: "/cameras.json"}

response = ""

responseCallback = (res) ->
	res.on 'data', (chunk) ->
		response += chunk

client = http.request options, responseCallback

client.end()
	
app.get '/', (req, res) ->
	res.sendfile(__dirname + '/public/index.html')
	
app.get '/cameras', (req, res) ->
	res.send(response)


app.listen(3000)
	
