import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";
import axios from "axios";
import { auth } from "@/app/firebase";

interface User {
  name: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchUsers(currentUser.email || "");
    });

    return () => unsubscribe();
  }, []);

  const fetchUsers = async (email: string) => {
    try {
      console.log("came here");
      const response = await axios.get(`/api/users?email=${email}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const addUser = async () => {
    try {
      console.log("clicked button");
      await axios.post("/api/users/add", { email: user.email, name });
      fetchUsers(user.email);
      setName("");
    } catch (error) {
      console.log("error catch");
      console.error("Failed to add user:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
      <button onClick={handleLogout}>Logout</button>

      <h2>Your Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
