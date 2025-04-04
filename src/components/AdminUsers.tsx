import { useEffect, useState } from "react";
import axios from "axios";
import {Table} from "antd";
type SupabaseUser = {
  id: string;
  email: string;
  role?: string;
  created_at?: string;
};

const AllUsers = () => {
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/v1/adminroutes/all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!Array.isArray(response.data)) {
          console.log(response.data);
          throw new Error("Expected an array of users from server");
        }

        setUsers(response.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
 
  
  const columns = [
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'uid',
      dataIndex: 'uid',
      key: 'uid',
    },  {
      title: 'providers',
      dataIndex: 'providers',
      key: 'providers',
    },  {
    },
  ];

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Users</h1>
      <ul className="space-y-2">
       
         <Table dataSource={users} columns={columns} />;
        
      </ul>
    </div>
  );
};

export default AllUsers;
