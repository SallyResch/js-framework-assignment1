const http = require("http");
const url = require("url");
const fs = require("fs");
const warframes = require("./data/warframes.js");
const mods = require("./data/mods.js");

const navigation = () => {
  return (`<nav><a href="/">Home </a><a href="/warframes">Warframes </a><a href="/about">About </a><a href="/mods">Mods </a></nav>`)
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
    res.write("<div>In lack of insperation for a theme, it became a warframes information page (its a game)</div>")
    res.write(footer("homefooter"));
    res.end();
  }

  if (currentPath === "/warframes") {
    res.write(navigation());
    res.write(header("Warframes"))
    warframes.forEach(warframe => {
      res.write(`<a href="/warframes?name=${warframe.name.toLowerCase()}">${warframe.name}</a><br>`)
    })

    let warframe = null;


    if (searchTerm.name) {
      warframe = warframes.find(
        v => v.name.toLowerCase() === searchTerm.name.toLowerCase()
      );

      if (!warframe) {
        res.write(`<p>Couldnt find Warframe: ${searchTerm.name}</p>`)
        res.write(footer("warframesfooter"));
        res.end();
      } else {
        res.write(`<p>Name: ${warframe.name}</p>`)
        res.write(`<p>Element: ${warframe.element}</p>`)
        res.write(`<p>Tactical Ability: ${warframe.tacticalAbility}</p>`)
        fs.readFile(warframe.description, "utf8", (err, data) => {
          if (err) {
            console.error('Error reading file: ', err);
            res.write("<p>Error loading description</p>");
          } else {
            res.write(`<p>${data}</p>`);
          }
          res.write(footer("warframesFooter"));
          res.end();
        });
      }
    } else {
      res.write(footer("warframesfooter"));
      res.end();
    }
  }

  if (currentPath === "/mods") {
    res.write(navigation());
    res.write(header("Mods in Warframe"));
    res.write(`<form method="GET" action="/mods">
      <label>Effect:
        <select name="effect">
          <option value="">All</option>
          ${mods.map(m => `
            <option value="${m.effect.toLowerCase()}">
              ${m.effect}
            </option>
          `).join("")}
        </select>
      </label>
      <label>
        Rarity:
        <select name="rarity">
          <option value="">All</option>
           ${mods.map(m => `
            <option value="${m.rarity.toLowerCase()}">
              ${m.rarity}
            </option>
          `).join("")}
        </select>
      </label>
      <label>
        Rank:
        <select name="rank">
          <option value="">All</option>
            ${mods.map(m => `
            <option value="${m.rank}">
              ${m.rank}
            </option>
          `).join("")}
        </select>
      </label>
      <button type="submit">Filter</button>
    </form>`);

    let filteredMods = mods;
    if (searchTerm.name) {
      filteredMods = filteredMods.filter(
        m => m.name.toLowerCase() === searchTerm.name.toLowerCase()
      );
    }

    if (searchTerm.effect) {
      filteredMods = filteredMods.filter(
        m => m.effect.toLowerCase().includes(searchTerm.effect.toLowerCase())
      );
    }

    if (searchTerm.rank) {
      filteredMods = filteredMods.filter(
        m => m.rank === Number(searchTerm.rank)
      );
    }

    if (searchTerm.rarity) {
      filteredMods = filteredMods.filter(
        m => m.rarity.toLowerCase() === searchTerm.rarity.toLowerCase()
      );
    }

    if (filteredMods.length === 0) {
      res.write("<p>No mods found</p>");
    } else {
      filteredMods.forEach(mod => {
        res.write(`
        <hr>
        <p>Name: ${mod.name}</p>
        <p>Effect: ${mod.effect}</p>
        <p>Rank: ${mod.rank}</p>
        <p>Rarity: ${mod.rarity}</p>
      `);
      });
    }
    res.write(footer("modsfooter"));
    res.end();
  }

  if (currentPath === "/about") {
    res.write(navigation());
    res.write(header("About"))
    fs.readFile("./content/about.html", "utf8", (err, data) => {
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