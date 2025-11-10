import "./App.css";
import { useQueryAllUsers } from "./core/user/ui/hooks/useQueryAllUsers";

function App() {
  const { data: users, isLoading } = useQueryAllUsers();

  return (
    <ul>
      {isLoading
        ? "Loading..."
        : users?.map((user) => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

export default App;
