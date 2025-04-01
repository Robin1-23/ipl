export default async function handler(req, res) {
    try {
      const response = await fetch(
        `https://api.cricapi.com/v1/currentMatches?apikey=ef215307-b74c-4e49-b45b-0c4df6995598&offset=0`
      );
      const data = await response.json();
  
      if (!data || !data.data) {
        return res.status(500).json({ message: "No data found" });
      }
  
      const iplTeams = [
        "Chennai Super Kings",
        "Delhi Capitals",
        "Gujarat Titans",
        "Kolkata Knight Riders",
        "Lucknow Super Giants",
        "Mumbai Indians",
        "Punjab Kings",
        "Rajasthan Royals",
        "Royal Challengers Bangalore",
        "Sunrisers Hyderabad",
      ];
  
      const iplMatches = data.data.filter((match) =>
        match?.teams?.some((team) => iplTeams.includes(team))
      );
  
      res.status(200).json({ matches: iplMatches });
    } catch (error) {
      console.error("Error fetching Live match data", error);
      res.status(500).json({ error: "Failed to fetch Live match data" });
    }
  }
  