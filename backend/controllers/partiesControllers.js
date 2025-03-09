const createDbConnection = require("../db");

async function createParty(req, res) {
  const { name, id, host, rounds, time } = req.body;

  if (!name || !id || !host) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = await createDbConnection();

  try {
    // Проверяем, существует ли партия с таким ID
    const [existingParty] = await db.query("SELECT * FROM party WHERE id = ?", [
        id,
    ]);

    if (existingParty.length > 0) {
      return res
        .status(400)
        .json({ error: "Party with this ID already exists" });
    }

    // Вставляем новую партию в таблицу party
    await db.query(
      "INSERT INTO party (id, name, map, time, rounds) VALUES (?, ?, ?, ?, ?)",
      [id, name, "default_map", time || 60, rounds || 3]
    );

    // Вставляем хоста в таблицу users
    await db.query(
      "INSERT INTO users (user_id, name, role, main_table_id) VALUES (?, ?, ?, ?)",
      [`user_${Date.now()}`, host, "host", id]
    );

    console.log(
      `${host} created party: ${name} (ID: ${id}) with ${rounds} rounds and ${time} seconds.`
    );

    res.status(201).json({
      message: `Party ${name} created successfully.`,
      party: {
        id: id,
        name: name,
        host: host,
        players: [host],
        rounds: rounds || 3,
        time: time || 60,
      },
    });
  } catch (error) {
    console.error("Error creating party:", error);
    res.status(500).json({ error: "Failed to create party" });
  } finally {
    await db.end(); // Закрываем соединение с базой данных
  }
}

async function connectToParty(req, res) {
  const { partyId, username } = req.body;

  if (!partyId || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = await createDbConnection();

  try {
    // Проверяем, существует ли партия
    const [party] = await db.query("SELECT * FROM party WHERE id = ?", [
      partyId,
    ]);

    if (party.length === 0) {
      return res.status(404).json({ error: "Party not found" });
    }

    // Проверяем, сколько игроков уже в партии
    const [players] = await db.query(
      "SELECT * FROM users WHERE main_table_id = ?",
      [partyId]
    );

    if (players.length >= 2) {
      return res.status(400).json({ error: "Party is full" });
    }

    // Добавляем пользователя в таблицу users
    await db.query(
      "INSERT INTO users (user_id, name, role, main_table_id) VALUES (?, ?, ?, ?)",
      [`user_${Date.now()}`, username, "player", partyId]
    );

    console.log(`${username} joined party: ${partyId}`);

    res.status(200).json({
      message: `You have joined the party ${partyId}.`,
      party: {
        id: partyId,
        name: party[0].name,
        host: party[0].host,
        players: [...players.map((p) => p.name), username], // Все игроки, включая нового
        rounds: party[0].rounds,
        time: party[0].time,
      },
    });
  } catch (error) {
    console.error("Error joining party:", error);
    res.status(500).json({ error: "Failed to join party" });
  } finally {
    await db.end(); // Закрываем соединение с базой данных
  }
}

async function deleteParty(req, res) {
  const { partyId } = req.body;

  if (!partyId) {
    return res.status(400).json({ error: "Missing party ID" });
  }

  const db = await createDbConnection();

  try {
    // Проверяем, существует ли партия
    const [party] = await db.query("SELECT * FROM party WHERE id = ?", [
      partyId,
    ]);

    if (party.length === 0) {
      return res.status(404).json({ error: "Party not found" });
    }

    // Удаляем всех пользователей, связанных с партией
    await db.query("DELETE FROM users WHERE main_table_id = ?", [partyId]);

    // Удаляем саму партию
    await db.query("DELETE FROM party WHERE id = ?", [partyId]);

    console.log(`Party ${partyId} deleted successfully.`);

    res.status(200).json({
      message: `Party ${partyId} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting party:", error);
    res.status(500).json({ error: "Failed to delete party" });
  } finally {
    await db.end(); // Закрываем соединение с базой данных
  }
}

async function deleteAllTheParties(req, res) {
  const db = await createDbConnection();

  try {
    // Удаляем всех пользователей
    await db.query("DELETE FROM users");

    // Удаляем все партии
    await db.query("DELETE FROM party");

    console.log("All parties and users deleted successfully.");

    res.status(200).json({
      message: "All parties and users deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting all parties:", error);
    res.status(500).json({ error: "Failed to delete all parties" });
  } finally {
    await db.end(); // Закрываем соединение с базой данных
  }
}

async function getParties(req, res) {
  const db = await createDbConnection();

  try {
    // Получаем все партии из таблицы party
    const [parties] = await db.query("SELECT * FROM party");

    // Для каждой партии получаем список пользователей
    const partiesWithUsers = await Promise.all(
      parties.map(async (party) => {
        const [users] = await db.query(
          "SELECT name, role FROM users WHERE main_table_id = ?",
          [party.id]
        );
        return {
          ...party,
          players: users.map((user) => user.name),
          host: users.find((user) => user.role === "host")?.name,
        };
      })
    );

    res.status(200).json({
      message: "Parties retrieved successfully.",
      parties: partiesWithUsers,
    });
  } catch (error) {
    console.error("Error retrieving parties:", error);
    res.status(500).json({ error: "Failed to retrieve parties" });
  } finally {
    await db.end(); // Закрываем соединение с базой данных
  }
}

module.exports = { createParty, connectToParty, deleteParty, getParties, deleteAllTheParties };
