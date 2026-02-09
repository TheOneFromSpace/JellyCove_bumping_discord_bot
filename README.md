# JellyCove Bumping Discord Bot

A Discord bot that tracks **Disboard bumps** made in the **JellyCove** Discord server.

👉 Join the server: [https://discord.gg/jellystara](https://discord.gg/jellystara)
⚠️ This bot is designed **exclusively for the JellyCove server**, though it supports scaling to multiple servers if needed.

---

## 📦 Version Control

* **Current version:** `v1.0.4d`
* **Release date:** **February 2, 2026**

---

## 🗄️ Database

* Uses a **free public MariaDB (SQL) server** by default
* Can be switched to a **private SQL server** if required

Each server’s bumps are stored **separately**, allowing future multi-server support without data conflicts.

---

## 🖥️ Hosting / Server Runtime

* Runs on a **free public hosting service**
* The server stays online for **29 days** before a **forced shutdown & restart**
* Designed to safely resume operation after restarts

---

## 🤖 Bot Commands

### User Commands

* **`/bump`** *(used via the Disboard bot)*
  Adds a bump to the user’s account.

* **`/bumps {user}`**
  Shows how many bumps a user has made.

  * If `{user}` is omitted, it defaults to the command issuer.

* **`/bumpleaderboard`**
  Displays the **top 10 bumpers** and their bump counts.

---

### Admin Commands

> 🔒 Admin-only permissions required

* **`/addbump {user} {amount}`**
  Adds bumps to a user.
  *Use case:* someone bumped while the bot was offline.

* **`/removebump {user} {amount}`**
  Removes bumps from a user.
  *Use case:* duplicate bumps caused by lag or errors.

* **`/setbump {user} {amount}`**
  Sets a user’s bump count to a specific number.
  *Use case:* restoring known values after a restart or database issue.

---

## 💻 Local Development & Usage

To run the bot on your own machine, **Node.js is required**.

### Requirements

* Node.js
* Dependencies listed in `package.json`

### Running the Bot

1. Open a terminal in the project root folder
2. Run:

```
node src/index.js
```

The bot should now come online.

---

## 🔐 Environment Variables / Secrets

You must create a file containing the following **secret credentials**:

* `APP_ID`
* `DISCORD_TOKEN`
* `PUBLIC_KEY`
* `DB_HOST`
* `DB_PORT`
* `DB_USER`
* `DB_PASSWORD`
* `DB_NAME`

⚠️ **IMPORTANT:**

* **DO NOT EVER commit this file to version control**
* Keep it private and secure at all times

---

## 🛑 Security Notice

This project handles sensitive credentials and database access. Improper handling may compromise the bot, the database, or the Discord server.

Treat all secret values as **confidential**.

---

## 🧪 Status

Actively used in the JellyCove Discord server.
