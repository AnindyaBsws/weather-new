import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useFlash } from './../FlashContext';

const Profile = () => {
  const { success, error, currUser, setSuccess, setError, setCurrUser } = useFlash();
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('http://localhost:8080/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      const data = await res.json();
      console.log(data);
      setProfile({
        name: data.username,
        mobile: data.mobile,
        email: data.email,
        image: data.image ? data.image : '',
        oldpassword: data.oldpassword ? data.oldpassword : '',
        newpassword: data.newpassword ? data.newpassword : ''
      });
      setLoading(false);
    }
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const res = await fetch('http://localhost:8080/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(profile),
    });

    const data = await res.json();
    console.log(data);

    if(data.user) {
      setProfile({
        name: data.user.username,
        mobile: data.user.mobile,
        email: data.user.email,
        image: data.user.image ? data.user.image : '',
        oldpassword: data.user.oldpassword ? data.oldpassword : '',
        newpassword: data.user.newpassword ? data.newpassword : ''
      });
      
      setCurrUser(data.user);
    }
    alert(data.message || data.error);
  };
  
  function update() {
    console.log(profile);
    handleUpdate();
    setEditable(false);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <input type="text" name="name" value={profile.name} onChange={handleChange} disabled={!editable} />
      <input type="text" name="mobile" value={profile.mobile} onChange={handleChange} disabled={!editable} />
      <input type="email" name="email" value={profile.email} onChange={handleChange} disabled={!editable} />
      <input type="password" name="oldpassword" value={profile.oldpassword} placeholder='Current Password! Required only for changing password' onChange={handleChange} disabled={!editable} />
      <input type="password" name="newpassword" value={profile.newpassword} placeholder='New Password! Required only for changing password' onChange={handleChange} disabled={!editable} />
      <input type="file" name="image" disabled={!editable} />
      <div>
        {!editable ? (
          <button onClick={() => setEditable(true)}>Edit</button>
        ) : (
          <button onClick={() => update()}>Save</button>
        )}
      </div>
    </div>
  );
};

export default Profile;