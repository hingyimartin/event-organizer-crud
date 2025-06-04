import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  return <div>{user && <h1>{user._id}</h1>}</div>;
};

export default Profile;
