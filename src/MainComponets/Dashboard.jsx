import React, { useEffect, useState } from 'react';
import useAdminHandler from '../LogicHandles/Handleadmin';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const handleAdmin = useAdminHandler();

  useEffect(() => {
    const verifyAdmin = async () => {
      const result = await handleAdmin(); 
      setIsAdmin(result); 
    };

    verifyAdmin();
  }, [handleAdmin]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
