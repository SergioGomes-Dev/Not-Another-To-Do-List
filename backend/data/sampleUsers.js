import bcrypt from "bcryptjs";

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    verified: true,
  },
  {
    name: "Jane User",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    verified: true,
  },
];

export default users;
