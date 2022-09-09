export default function handler(req, res) {
  return res.status(200).json("Getting product id: " + req.query.id);
}
