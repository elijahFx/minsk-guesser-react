const createDbConnection = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "5h" });
}

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function signup(req, res) {
  let connection;
  
  try {
    connection = await createDbConnection(); // Create the MySQL connection

    const { name, id, date, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Необходимо указать хотя бы логин и пароль");
    }

    // Check if the user already exists
    const [existingUser] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);

    if (existingUser.length > 0) {
        console.log(existingUser);
        
      return res.status(409).send("Пользователь с таким email уже существует");
    }

    const hashedPassword = await hashPassword(password);

    // Insert the new user
    const newUser = {
      name,
      id,
      date,
      email,
      password: hashedPassword,
      role: "user",
    };

    await connection.query(
      'INSERT INTO user (name, id, date, email, password, role) VALUES (?, ?, ?, ?, ?, ?)', 
      [newUser.name, newUser.id, newUser.date, newUser.email, newUser.password, newUser.role]
    );

    const token = createToken(newUser.id);

    return res.status(201).json({ ...newUser, token });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).send(`${error}`);
  } finally {
    if (connection) {
      await connection.end(); // Close the MySQL connection
    }
  }
}

async function login(req, res) {
  let connection;

  try {
    connection = await createDbConnection(); // Create the MySQL connection

    const { email, password } = req.body;

    // Validate that email and password are provided
    if (!email || !password) {
      return res.status(400).send("Необходимо указать логин или пароль");
    }

    // Find the user by email
    const [user] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);

    // Check if the user exists
    if (user.length === 0) {
      return res.status(401).send("Неверный логин или пароль");
    }

    const userData = user[0]; // Get the user object

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(401).send("Неверный логин или пароль");
    }

    // Generate a token for the user
    const token = createToken(userData.id);

    // Return the token in the response
    return res.status(200).json({ ...userData, token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Ошибка сервера");
  } finally {
    if (connection) {
      await connection.end(); // Close the MySQL connection
    }
  }
}

module.exports = {
  signup,
  login,
};
