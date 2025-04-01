export default async function handler(req, res) {
    const { team } = req.query;
  
    if (!team) {
      return res.status(400).json({ message: "Team is required" });
    }
  
    try {
      const response = await fetch(`https://ipl-okn0.onrender.com/squad/${team}`);
      const data = await response.json();
  
      res.status(200).json(data); // ✅ Fixed incorrect response object
    } catch (error) {
      console.error("Error fetching squad", error);
      res.status(500).json({ error: "Failed to fetch squad" }); // ✅ Fixed typo
    }
  }
  