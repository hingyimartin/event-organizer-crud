import { useAuth } from '../context/AuthContext';

const Homepage = () => {
  const { user } = useAuth();
  return (
    <div>
      Homepage
      {user && (
        <>
          <p>{user.email}</p>
          <p>{user._id}</p>
        </>
      )}
    </div>
  );
};

export default Homepage;
