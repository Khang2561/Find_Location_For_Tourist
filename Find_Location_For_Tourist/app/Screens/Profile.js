import React, { useState, useEffect } from 'react';
import Login from '../Components/Profile/Login';
import SignUp from '../Components/Profile/SignUp';
import ForgotPassword from '../Components/Profile/ForgotPassword';
import UserProfile from '../Components/Profile/UserProfile';
import { fetchUserSession, fetchUserProfile } from '../Services/UserServices';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [profile, setProfile] = useState(null);

  const fetchUser = async () => {
    const user = await fetchUserSession();
    if (user) {
      setUser(user);
      const profileData = await fetchUserProfile(user.id);
      setProfile(profileData);
    } else {
      setUser(null);
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    if (isForgotPasswordMode) {
      return (
        <ForgotPassword
          onBackToLogin={() => setIsForgotPasswordMode(false)}
        />
      );
    }

    return isSignupMode ? (
      <SignUp onLoginSwitch={() => setIsSignupMode(false)} />
    ) : (
      <Login
        onSignupSwitch={() => setIsSignupMode(true)}
        onLoginSuccess={fetchUser}
        onForgotPassword={() => setIsForgotPasswordMode(true)} // Pass forgot password handler
      />
    );
  }

  return <UserProfile profile={profile} onLogout={fetchUser} />;
}
