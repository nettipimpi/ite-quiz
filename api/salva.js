const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://ydfioyuwqaqhiscwgpok.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZmlveXV3cWFxaGlzY3dncG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MzU4NTcsImV4cCI6MjA5MjMxMTg1N30.CRj5KxytTuWP7PPupR-xywZTdssKDkRCwldg89GOnHE'
);
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { error } = await supabase.from('risposte').insert(req.body);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ ok: true });
};
