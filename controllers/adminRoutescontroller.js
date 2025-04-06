import { supabase } from "../supabase.js";

const AdminRoutesController = {
  createSong(req, res) {
    res.status(201).send({ message: "Song created successfully" });
  },

  updateSong(req, res) {
    res
      .status(200)
      .send({ message: `Song with ID ${req.params.id} updated successfully` });
  },

  deleteSong(req, res) {
    res
      .status(200)
      .send({ message: `Song with ID ${req.params.id} deleted successfully` });
  },

  getUsers: async (req, res) => {
    try {
      console.log("Incoming request to /all-users");

      const { data, error } = await supabase.auth.admin.listUsers({ perPage: 100 });

      if (error) {
        console.error("Error fetching users:", error.message);
        return res.status(500).json({ error: "Failed to fetch users" });
      }

      if (!data || !data.users) {
        console.error("No users found in the response");
        return res.status(404).json({ error: "No users found" });
      }

  
      res.status(200).json(data.users); // ✅ return only the users array
    } catch (error) {
      console.error("Unexpected error fetching users:", error.message);
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  },
};

export default AdminRoutesController;
