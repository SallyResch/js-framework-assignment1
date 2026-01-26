const http = require("http");
const url = require("url");

const navigation = () => {
	return (`<nav><a href="/">Home</a><a href="/warframes">Warframes</a><a href="/about">About</a></nav>`)
}
const header = (headerTitle) => {
	return (`<header><h1>${headerTitle}</h1></header>`);
}

const footer = (footerTitle) => {
	return (`<footer><h1>${footerTitle}</h1></footer>`);
}
http.createServer((req, res) => {
	let address = url.parse(req.url, true);
	const currentPath = address.pathname;
	const searchTerm = address.query;
	res.writeHead(200, "All is Okie Dokie", { "Content-type": "text/html" })

	if (currentPath === "/") {
		res.write(navigation());
		res.write(header("Home"))
		res.write(footer("homefooter"));

		res.end();
	}
	if (currentPath === "/warframes") {
		res.write(navigation());
		res.write(header("Warframes"))
		res.write(footer("warframesfooter"));

		res.end();
	}
	if (currentPath === "/about") {
		res.write(navigation());
		res.write(header("About"))
		res.write(footer("aboutfooter"));
		res.end();
	}
}).listen(3456, () => console.log("Listening on port 3456"))