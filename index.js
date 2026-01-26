const http = require("http");
const url = require("url");

const navigation = () => {
	return (`<nav><a href="/">Home</a><a href="/warframes">Warframes</a><a href="/about">About</a></nav>`)
}

http.createServer((req, res) => {
	let address = url.parse(req.url, true);
	const currentPath = address.pathname;
	const searchTerm = address.query;
	res.writeHead(200, "All is Okie Dokie", { "Content-type": "text/html" })

	if (currentPath === "/") {
		res.write(navigation());
		res.end();
	}
	if (currentPath === "/warframes") {
		res.write(navigation());
		res.end();
	}
	if (currentPath === "/about") {
		res.write(navigation());
		res.end();
	}
}).listen(3456, () => console.log("Listening on port 3456"))