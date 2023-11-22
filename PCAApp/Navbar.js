import React, { useContext } from 'react';
import { Button } from 'react-native';
import { AuthContext } from './store/auth-context';

function Navbar({ showLogout = false }) {
  const { logout } = useContext(AuthContext);

  return (
    <>
      {showLogout && <Button title="Logout" onPress={logout} />}
    </>
  );
}

export default Navbar;
