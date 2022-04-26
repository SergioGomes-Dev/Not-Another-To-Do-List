import dotenv from "dotenv";
import users from "./data/sampleUsers.js";
import lists from "./data/sampleLists.js";
import User from "./models/userModel.js";
import List from "./models/listModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await List.deleteMany();

    const createdUsers = await User.insertMany(users);

    const sampleLists = lists.map((list) => {
      return { ...list, user: createdUsers[0] };
    });

    await List.insertMany(sampleLists);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await List.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
