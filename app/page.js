
// "use client";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useState, useEffect } from "react";

// export default function Home() {
//   const [liveScore, setLiveScore] = useState([]);
//   const [schedule, setSchedule] = useState([]);
//   const [squad, setSquad] = useState("");
//   const [error, setError] = useState("");
//   const [selectedTeam, setSelectedTeam] = useState("mi");

//   const fetchData = async (type) => {
//     try {
//       let url = `/api/${type}`;
//       if (type === "squad" && selectedTeam) {
//         url += `?team=${selectedTeam}`;
//       }
  
//       const res = await fetch(url);
  
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
  
//       const data = await res.json();
  
//       if (type === "live-score") {
//         setLiveScore(data.matches ?? []);
//       } else if (type === "squad") {
//         setSquad(data.squad ?? []);
//       } else {
//         const sortedSchedule = Object.entries(data || {})
//           .sort(
//             (a, b) =>
//               Number(a[0].replace("Match ", "")) - Number(b[0].replace("Match ", ""))
//           )
//           .map(([match, details]) => ({ match, ...details }));
  
//         setSchedule(sortedSchedule);
//       }
//     } catch (error) {
//       console.error(error);
//       setError(`Failed to fetch ${type}: ${error.message}`);
//     }
//   };
  

//   useEffect(() => {
//     fetchData("live-score");
//     fetchData("schedule");
//   }, []);

//   return (
//     <div className="container mx-auto p-8 min-h-screen bg-gradient-to-r from-gray-900 text-white">
//       <h1 className="text-4xl font-bold mb-8 text-center">
//         🏏 IPL Live Score & Schedule
//       </h1>

//       <Tabs defaultValue="live-score" className="w-full">
//         <TabsList className="flex justify-center mb-8">
//         <TabsTrigger 
//              value="live-score" 
//              onClick={() => fetchData("live-score")}
//              className="px-6 py-3 text-lg font-semibold rounded-lg transition-all   focus:outline-none 
//              data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900 
//               data-[state=active]:shadow-lg">
//                Live Score
//         </TabsTrigger>


//         <TabsTrigger 
//              value="schedule" 
//              onClick={() => fetchData("schedule")}
//              className="px-6 py-3 text-lg font-semibold rounded-lg transition-all   focus:outline-none 
//              data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900 
//               data-[state=active]:shadow-lg">
//                schedule
//         </TabsTrigger>


//         <TabsTrigger 
//              value="squad" 
//              onClick={() => fetchData("squad")}
//              className="px-6 py-3 text-lg font-semibold rounded-lg transition-all   focus:outline-none 
//              data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900 
//               data-[state=active]:shadow-lg">
//                squad
//         </TabsTrigger>
//         </TabsList>




//         <TabsContent value="live-score">
//           {error ? (
//            <p className="text-red-500 text-center">{error}</p>
//           ):(
//             <div>
//               {liveScore.length===0 ? (
//                 <p className="text-yellow-300">No Live matches available</p>
//               ):(
//                 liveScore.map((match,index)=>(
//                   <div key={index} className="p-6 bg-gray-800 rounded-lg mb-6 shadow-lg border border-yellow-400">
//                     <h2 className="text-2xl font-bold mb-2">{match.name}</h2>
//                     <p className="text-gray-300">Venue:{match.venue}</p>
//                     <p className="text-gray-300">Date: {new Date(match.dateTimeGMT).toLocaleString()}</p>
//                     <p className="text-green-400 font-semibold">Status:{match.status}</p>

//                     {/* {Display score if available} */}
//                     {match.score && match.score.length > 0 ? (
//                       <div className="mt-4">
//                         {match.score.map((teamScore,i)=>(
//                           <p key={i} className="text-gray-300">
//                             <span className="font-bold">
//                               {teamScore.inning}
//                             </span> - {teamScore.r}/{teamScore.w} ({teamScore.o} Overs)
//                           </p>

//                         ))}
//                       </div>
//                     ):(
//                       <p className="text-yellow-300">No scores available</p>
//                     )}

//                     <p className="mt-4 text-yellow-400">Match Started: {match.matchStarted ?" ✅ Yes": " ❌ No"}</p>
//                     <p className="text-red-400">Match Ended: {match.matchEnded ? " ✅ Yes": " ❌ No"}</p>

//                    </div>

//                 ))
//               )}
//             </div>
            
//           )}
//         </TabsContent>

//         <TabsContent value="schedule">
//   {error ? (
//     <p className="text-red-500 text-center">{error}</p>
//   ) : (
//     <div>
//       {schedule.length === 0 ? (
//         <p className="text-yellow-300">No schedule available</p>
//       ) : (
//         schedule.map((game, index) => (
//           <div key={index} className="p-6 bg-gray-800 rounded-lg mb-6 shadow-lg border border-yellow-400">
//             <h2 className="text-2xl font-bold mb-2">{game.match}</h2>
//             <p className="text-gray-300">📅 Date: {game.Date}</p>
//             <p className="text-gray-300">📍 Location: {game.Location}</p>
//             <p className="text-yellow-300">⚡ Rival: {game.Rival}</p>
//             <p className="text-yellow-300">⏰ Time: {game.Time}</p>
//           </div>
//         ))
//       )}
//     </div>
//   )}
// </TabsContent>

// <TabsContent value="squad">
//   <div className="mb-4">
//     <label className="mr-4">Select Team: </label>
//     <select
//       className="bg-gray-800 text-white border border-yellow-400 p-2 rounded-lg"
//       value={selectedTeam}
//       onChange={(e) => setSelectedTeam(e.target.value)}
//     >
//       <option value="mi">Mumbai Indians (MI)</option>
//       <option value="rcb">Royal Challengers Bangalore (RCB)</option>
//       <option value="csk">Chennai Super Kings (CSK)</option>
//       <option value="dc">Delhi Capitals (DC)</option>
//       <option value="kkr">Kolkata Knight Riders (KKR)</option>
//       <option value="srh">Sunrisers Hyderabad (SRH)</option>
//       <option value="rr">Rajasthan Royals (RR)</option>
//       <option value="lsg">Lucknow Super Giants (LSG)</option>
//       <option value="pbks">Punjab Kings (PBKS)</option>
//       <option value="gt">Gujarat Titans (GT)</option>
//     </select>
//     <button onClick={() => fetchData("squad")} className="ml-4 px-4 py-2 bg-green-500 text-gray-800 rounded-lg">
//       Fetch Squad
//     </button>
//   </div>

//   {error ? (
//     <p className="text-red-500 text-center">{error}</p>
//   ) : (
//     <div>
//       {Object.keys(squad).length === 0 ? (
//         <p className="text-yellow-300">No Team available</p>
//       ) : (
//         Object.entries(squad)
//           .sort(([a],[b]) => Number(a.replace("Player ", "")) - Number(b.replace("Player ", "")))
//           .map(([playerName, details], index) => (
//             <div key={index} className="p-6 bg-gray-800 rounded-lg mb-6 shadow-lg border border-yellow-400">
//               <h2 className="text-2xl font-bold mb-2">{playerName}</h2>
//               <p className="text-gray-300">📅 Name: {details.Name}</p>
//               <p className="text-gray-300">📅 Role: {details.Role}</p>
//               <p className="text-gray-300">📅 Style: {details.Style}</p>
//             </div>
//           ))
//       )}
//     </div>
//   )}
// </TabsContent>

// </Tabs>

      
// </div>
// );
// }





"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

export default function Home() {
  const [liveScore, setLiveScore] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [squad, setSquad] = useState("");
  const [error, setError] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("mi");

  const fetchData = async (type) => {
    try {
      let url = `/api/${type}`;
      if (type === "squad" && selectedTeam) {
        url += `?team=${selectedTeam}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      if (type === "live-score") {
        setLiveScore(data.matches ?? []);
      } else if (type === "squad") {
        setSquad(data.squad ?? []);
      } else {
        const sortedSchedule = Object.entries(data || {})
          .sort(
            (a, b) =>
              Number(a[0].replace("Match ", "")) - Number(b[0].replace("Match ", ""))
          )
          .map(([match, details]) => ({ match, ...details }));
        setSchedule(sortedSchedule);
      }
    } catch (error) {
      console.error(error);
      setError(`Failed to fetch ${type}: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData("live-score");
    fetchData("schedule");
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
        🏏 IPL Live Score & Schedule
      </h1>

      <Tabs defaultValue="live-score" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 gap-2 mb-8 bg-gray-800 p-0.1 rounded-xl">
          {["live-score", "schedule", "squad"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              onClick={() => fetchData(tab)}
              className="px-4 py-2 text-sm sm:text-base font-medium rounded-lg transition-all 
                hover:bg-gray-700 
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 
                data-[state=active]:to-orange-500 data-[state=active]:text-gray-900 
                data-[state=active]:shadow-md"
            >
              {tab.split("-")[0].charAt(0).toUpperCase() + tab.split("-")[0].slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="live-score" className="space-y-4">
          {error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : liveScore.length === 0 ? (
            <p className="text-yellow-300 text-center">No Live matches available</p>
          ) : (
            liveScore.map((match, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700 hover:border-yellow-500 transition-all"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-3">{match.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                  <p className="text-gray-300">Venue: {match.venue}</p>
                  <p className="text-gray-300">
                    Date: {new Date(match.dateTimeGMT).toLocaleString()}
                  </p>
                  <p className="text-green-400 font-medium">Status: {match.status}</p>
                </div>
                {match.score && match.score.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    {match.score.map((teamScore, i) => (
                      <p key={i} className="text-gray-300">
                        <span className="font-bold">{teamScore.inning}</span> -{" "}
                        {teamScore.r}/{teamScore.w} ({teamScore.o} Overs)
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-yellow-300">No scores available</p>
                )}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <p className="text-yellow-400">
                    Match Started: {match.matchStarted ? " ✅ Yes" : " ❌ No"}
                  </p>
                  <p className="text-red-400">
                    Match Ended: {match.matchEnded ? " ✅ Yes" : " ❌ No"}
                  </p>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          {error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : schedule.length === 0 ? (
            <p className="text-yellow-300 text-center">No schedule available</p>
          ) : (
            schedule.map((game, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700 hover:border-yellow-500 transition-all"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-3">{game.match}</h2>
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-gray-300">📅 Date: {game.Date}</p>
                  <p className="text-gray-300">📍 Location: {game.Location}</p>
                  <p className="text-yellow-300">⚡ Rival: {game.Rival}</p>
                  <p className="text-yellow-300">⏰ Time: {game.Time}</p>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="squad" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
            <label className="text-sm sm:text-base">Select Team:</label>
            <select
              className="w-full sm:w-auto bg-gray-800 text-white border border-gray-700 p-2 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="mi">Mumbai Indians (MI)</option>
              <option value="rcb">Royal Challengers Bangalore (RCB)</option>
              <option value="csk">Chennai Super Kings (CSK)</option>
              <option value="dc">Delhi Capitals (DC)</option>
              <option value="kkr">Kolkata Knight Riders (KKR)</option>
              <option value="srh">Sunrisers Hyderabad (SRH)</option>
              <option value="rr">Rajasthan Royals (RR)</option>
              <option value="lsg">Lucknow Super Giants (LSG)</option>
              <option value="pbks">Punjab Kings (PBKS)</option>
              <option value="gt">Gujarat Titans (GT)</option>
            </select>
            <button
              onClick={() => fetchData("squad")}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
            >
              Fetch Squad
            </button>
          </div>
          {error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : Object.keys(squad).length === 0 ? (
            <p className="text-yellow-300 text-center">No Team available</p>
          ) : (
            Object.entries(squad)
              .sort(([a], [b]) => Number(a.replace("Player ", "")) - Number(b.replace("Player ", "")))
              .map(([playerName, details], index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700 hover:border-yellow-500 transition-all"
                >
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">{playerName}</h2>
                  <div className="space-y-2 text-sm sm:text-base">
                    <p className="text-gray-300">📋 Name: {details.Name}</p>
                    <p className="text-gray-300">🏃 Role: {details.Role}</p>
                    <p className="text-gray-300">🏏 Style: {details.Style}</p>
                  </div>
                </div>
              ))
          )}
        </TabsContent>
      </Tabs>

      <footer className="mt-8 py-4 text-center text-gray-400 text-sm sm:text-base border-t border-gray-800">
        Made by Robin Jain
      </footer>



    </div>
  );
}





