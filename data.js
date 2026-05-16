const locations = [
  "Saddar", "Clifton", "DHA", "Gulshan-e-Iqbal", "North Nazimabad", 
  "Korangi", "Lyari", "Malir", "Tariq Road", "Shahrah-e-Faisal",
  "NIPA", "Johar Mor", "Defence View", "Seaview", "Burns Road",
  "Soamr Goth", "Orangi Town", "Keamari", "Baldia Town", "Site Area"
];

const incidentTypes = [
  { type: "fire", keywords: ["fire", "huge smoke", "burning", "blaze", "fire brigade needed"] },
  { type: "accident", keywords: ["crash", "collision", "severe accident", "traffic jam due to crash", "ambulance needed"] },
  { type: "robbery", keywords: ["mobile snatching", "armed robbery", "gunpoint mugging", "stolen car", "bike snatched"] },
  { type: "protest", keywords: ["protest", "strike", "roadblock", "chanting crowd", "political rally"] },
  { type: "power_outage", keywords: ["load shedding", "no electricity since hours", "power cut", "K-Electric blackout", "wires sparking"] }
];

const templates = [
  "Just saw a terrible {incident} at {location}. Stay safe everyone! #Karachi #{type}",
  "Avoid {location} right now. Huge {incident} reported. #{type} #KarachiUpdate",
  "Can anyone confirm the {incident} near {location}? Hearing sirens. #Karachi",
  "Another day, another {incident} in {location}. When will things improve? #{type}",
  "Emergency at {location}! Looks like a major {incident}. Prayers for everyone involved. #Karachi",
  "Stuck in traffic near {location} because of a {incident}. Use alternative routes. #KarachiTraffic",
  "Warning: Reports of {incident} around {location}. Be careful if you are commuting.",
  "Police and Ambulance rushing towards {location}. Seems like a serious {incident}.",
  "Getting reports of {incident} happening at {location}. Pls verify anyone? #Karachi #{type}",
  "Is it true about the {incident} at {location}? I have family there."
];

const usernames = [
  "karachi_alerts", "citizen_khi", "ali_khi99", "sara_tweets", "khi_updates",
  "traffic_khi", "news_karachi", "anonymous_khi", "ahmed_reports", "zara_daily",
  "khi_watcher", "pak_news_now", "karachi_insider", "live_khi"
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePost() {
  const location = getRandomItem(locations);
  const incidentObj = getRandomItem(incidentTypes);
  const incident = getRandomItem(incidentObj.keywords);
  let text = getRandomItem(templates)
    .replace("{incident}", incident)
    .replace("{location}", location)
    .replace("{type}", incidentObj.type);

  // Generate a random timestamp within the last 2 hours
  const pastTime = new Date(Date.now() - Math.floor(Math.random() * 2 * 60 * 60 * 1000));

  return {
    id: "post_" + Math.random().toString(36).substr(2, 9),
    username: getRandomItem(usernames),
    timestamp: pastTime.toISOString(),
    location: location,
    incident_type: incidentObj.type,
    text: text,
    likes: Math.floor(Math.random() * 100),
    retweets: Math.floor(Math.random() * 50)
  };
}

module.exports = { generatePost };
