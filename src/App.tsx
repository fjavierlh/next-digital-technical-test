import { Link } from "react-router-dom";
import "./App.css";
import { useQueryAllUsers } from "./core/user/ui/hooks/useQueryAllUsers";

function App() {
  const { data: users, isLoading } = useQueryAllUsers();

  return (
    <ul>
      {isLoading
        ? "Loading..."
        : users?.map((user) => (
            <Link to={`/user/${user.id}`} key={user.id}>
              <li key={user.id}>{user.name}</li>
            </Link>
          ))}
    </ul>
  );
}

export default App;
