// server/server.ts
import express4 from "express";
import * as Path2 from "node:path";
import * as URL2 from "node:url";

// server/routes/cineRoutes.ts
import express from "express";

// server/auth0.ts
import { expressjwt as jwt } from "express-jwt";
import jwks from "jwks-rsa";
var domain = "https://vitor-pohutukawa.au.auth0.com";
var audience = "https://cine/api";
var checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`
  }),
  audience,
  issuer: `${domain}/`,
  algorithms: ["RS256"]
});
var auth0_default = checkJwt;

// server/db/knexfile.js
import * as Path from "node:path";
import * as URL from "node:url";
var __filename = URL.fileURLToPath(import.meta.url);
var __dirname = Path.dirname(__filename);
var knexfile_default = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: Path.join(__dirname, "dev.sqlite3")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: ":memory:"
    },
    migrations: {
      directory: Path.join(__dirname, "migrations")
    },
    seeds: {
      directory: Path.join(__dirname, "seeds")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};

// server/db/connection.ts
import knex from "knex";
var environment = process.env.NODE_ENV || "development";
var config = knexfile_default[environment];
var connection = knex(config);
var connection_default = connection;

// server/db/db.ts
async function insertIntoWatchlistDb(watchlistItem, db = connection_default) {
  await db("watchlist").insert(watchlistItem);
}
async function deleteFromWatchlist(watchlistItem, db = connection_default) {
  return await db("watchlist").where("auth_id", watchlistItem.auth_id).where("content_id", watchlistItem.content_id).del();
}
async function upsertProfile(user, db = connection_default) {
  await db("users").insert(user).onConflict("auth_id").merge();
}
async function getWatchlist(authId, db = connection_default) {
  return await db("watchlist").where("auth_id", authId).select();
}
async function getCompletedlist(authId, db = connection_default) {
  return await db("seen").where("auth_id", authId).select();
}
async function deleteFromCompletedList(watchlistItem, db = connection_default) {
  return await db("seen").where("auth_id", watchlistItem.auth_id).where("content_id", watchlistItem.content_id).del();
}
async function addToCompleted(watchlistItem, db = connection_default) {
  await db("seen").insert(watchlistItem);
}

// server/routes/cineRoutes.ts
var router = express.Router();
router.post("/", auth0_default, async (req, res) => {
  try {
    const userData = req.body;
    const auth0Id = req.auth?.sub;
    const user = {
      auth_id: auth0Id,
      ...userData
    };
    await upsertProfile(user);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
var cineRoutes_default = router;

// server/routes/watchlist.ts
import express2 from "express";
var router2 = express2.Router();
router2.post("/", auth0_default, async (req, res) => {
  try {
    const userData = req.body;
    const auth0Id = req.auth?.sub;
    const watchlist = {
      auth_id: auth0Id,
      ...userData
    };
    await insertIntoWatchlistDb(watchlist);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
router2.delete("/", auth0_default, async (req, res) => {
  try {
    const userData = req.body;
    const auth0Id = req.auth?.sub;
    const watchlist = {
      auth_id: auth0Id,
      ...userData
    };
    await deleteFromWatchlist(watchlist);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
router2.get("/", auth0_default, async (req, res) => {
  try {
    const auth0Id = req.auth?.sub;
    const result = await getWatchlist(auth0Id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
var watchlist_default = router2;

// server/routes/completed.ts
import express3 from "express";
var router3 = express3.Router();
router3.get("/", auth0_default, async (req, res) => {
  try {
    const auth0Id = req.auth?.sub;
    const result = await getCompletedlist(auth0Id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
router3.delete("/", auth0_default, async (req, res) => {
  try {
    const userData = req.body;
    const auth0Id = req.auth?.sub;
    const watchlist = {
      auth_id: auth0Id,
      ...userData
    };
    await deleteFromCompletedList(watchlist);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
router3.post("/", auth0_default, async (req, res) => {
  try {
    const userData = req.body;
    const auth0Id = req.auth?.sub;
    const watchlist = {
      auth_id: auth0Id,
      ...userData
    };
    await addToCompleted(watchlist);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
var completed_default = router3;

// server/server.ts
var __filename2 = URL2.fileURLToPath(import.meta.url);
var __dirname2 = Path2.dirname(__filename2);
var server = express4();
server.use(express4.json());
server.use(express4.static(Path2.join(__dirname2, "public")));
server.use("/api/v1/cine", cineRoutes_default);
server.use("/api/v1/watchlist", watchlist_default);
server.use("/api/v1/watchlist/completed", completed_default);
server.get("*", (req, res) => {
  res.sendFile(Path2.join(__dirname2, "public/index.html"));
});
var server_default = server;

// server/index.ts
var port = 3e3;
server_default.listen(port, () => {
  console.log("Server listening on port", port);
});
