/**
 * Vercel Serverless Function - Health Check
 */

module.exports = async (req, res) => {
  return res.status(200).send('AI-Kurator API - Window Cleaning SaaS & Medicinregner');
};
