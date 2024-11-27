import { db } from "../drizzle/drizzle.js"

const hubsController = {
  getHubs: async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'Missing userId' });
    }

    const hubs = db.select('hubs', {
      where: {
        user_id: userId
      }
    })

    res.json(hubs);
  }
}

export default hubsController;