import Home from '../components/Home';
import Login from '../components/Login';
import { useSelector } from "react-redux";

export default function Index() {
  const user = useSelector((state) => state.user.value);

  if (user.isConnected) {
    return <Home />;
  } else {
    return <Login />;
  }
}