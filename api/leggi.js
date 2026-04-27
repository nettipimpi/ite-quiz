module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const r = await fetch('https://ydfioyuwqaqhiscwgpok.supabase.co/rest/v1/risposte?select=*', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZmlveXV3cWFxaGlzY3dncG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MzU4NTcsImV4cCI6MjA5MjMxMTg1N30.CRj5KxytTuWP7PPupR-xywZTdssKDkRCwldg89GOnHE',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZmlveXV3cWFxaGlzY3dncG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MzU4NTcsImV4cCI6MjA5MjMxMTg1N30.CRj5KxytTuWP7PPupR-xywZTdssKDkRCwldg89GOnHE'
      }
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
