export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { password } = req.body;
  const correctPassword = process.env.CASE_STUDY_PASSWORD || 'changeme';

  if (password === correctPassword) {
    // Set authentication cookie (expires in 24 hours)
    res.setHeader(
      'Set-Cookie',
      'case-study-auth=authenticated; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400'
    );
    
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, message: 'Incorrect password' });
}
