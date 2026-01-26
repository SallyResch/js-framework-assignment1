const http = require("http");
const url = require("url");
const fs = require("fs");
const warframes = require("./data/warframes.js");

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
    console.log(address);
    //console.log(currentPath);
    //console.log(searchTerm);
    res.end();
  }

  if (currentPath === "/warframes") {
    res.write(navigation());
    res.write(header("Warframes"))
    let warframe = null;
    if (searchTerm.name) {
      warframe = warframes.find(v => v.name.toLowerCase() === searchTerm.name.toLowerCase());

      if (!warframe) {
        res.write(`<p>Couldnt find Warframe: ${searchTerm.name}</p>`)
      } else {
        res.write(`<p>Name: ${warframe.name}</p>`)
        res.write(`<p>Name: ${warframe.element}</p>`)
        res.write(`<p>Name: ${warframe.tacticalAbility}</p>`)
        res.write(`<p>Name: ${warframe.description}</p>`)
      }
    }
    warframes.forEach(warframe => {
      res.write(`<a href="/warframes?name=${warframe.name.toLowerCase()}">${warframe.name}</a>`)
    })
    res.write(footer("warframesfooter"));
    console.log(address);
    //console.log(currentPath);
    //console.log(searchTerm);
    res.end();
  }

  if (currentPath === "/mods") {
    res.write(navigation());
    res.write(header("Mods in Warframe"))
    res.write(footer("modsfooter"));
    res.end();
  }

  if (currentPath === "/pets") {
    res.write(navigation());
    res.write(header("Pets in Warframe"))
    res.write(footer("petsfooter"));
    res.end();
  }

  if (currentPath === "/about") {
    res.write(navigation());
    res.write(header("About"))
    fs.readFile("./content/about.html", (err, data) => {
      if (err) {
        res.write("ERROR");
        res.end()
        return
      }
      res.write(data);
      res.write(footer("aboutfooter"));
      res.end();
    })
  }
}).listen(3456, () => console.log("Listening on port 3456"))