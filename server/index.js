const express = require("express");
const app = express();
const Aerospike = require("aerospike");
const bodyParser = require("body-parser");

app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

	// Request methods you wish to allow
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

	// Request headers you wish to allow
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", true);

	// Pass to next layer of middleware
	next();
});

app.use(bodyParser.json());

let client = null;

app.post(`/connect`, (req, res) => {
	const { hostIp, port } = req.body;
	client = Aerospike.client({
		hosts: [{ addr: hostIp, port: parseInt(port) }],
		log: {
			level: Aerospike.log.INFO,
		},
	});

	client.connect(function (error) {
		if (error) {
			res.send({
				success: false,
				hostIp: hostIp,
				port: port,
			});
			client = null;
		} else {
			res.send({
				success: true,
				hostIp: hostIp,
				port: port,
			});
		}
	});
});

app.get(`/namespaces/:namespace/:set`, (req, res) => {
	if (client === null) {
		res.send({
			success: false,
			message: "Aerospike Not connected. Please conenct again.",
		});
	}

	const { namespace, set } = req.params;

	let scan = client.scan(namespace, set);
	scan.concurrent = true;
	scan.nobins = false;

	let recordCount = 0;
	let recordList = [];
	let stream = scan.foreach();
	stream.on("data", function (record) {
		recordCount++;
		recordList.push(record);
	});
	stream.on("error", function (error) {
		console.error("Error while scanning: %s [%d]", error.message, error.code);
	});
	stream.on("end", function () {
		res.send({
			success: true,
			data: {
				records: recordList,
				totalRecords: recordCount,
			},
		});
	});
});

app.get("/namespaces/:namespace", (req, res) => {
	if (client === null) {
		res.send({
			success: false,
			message: "Aerospike Not connected. Please conenct again.",
		});
	}
	const { namespace } = req.params;
	let setList = [];
	client.infoAny(`sets/${namespace}`, function (error, response) {
		if (error) {
			// handle failure
		} else {
			response.split(";").map((set) => {
				if (set) {
					set.split(":").map((info) => {
						const [key, val] = info.split("=");
						if (key === "set") {
							setList.push(val);
						}
					});
				}
			});
			res.json({
				success: true,
				data: setList,
			});
		}
	});
});

app.get("/", function (req, res) {
	res.send("Hello World");
});

app.listen(5000, () => {
	console.log("listening ...");
});
