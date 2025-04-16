import HubService from "../services/hub_service.js";

const hubsController = {
  getHubs: async (req, res) => {
    try {
      const { userEmail } = req.query;
      const data = await HubService.getHubs(userEmail);
      res.json({ data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getHubDetail: async (req, res) => {
    try {
      const { hubId } = req.params;
      const data = await HubService.getHubDetail(hubId);
      res.json({ data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  createHub: async (req, res) => {
    try {
      const { owner_email, hub } = req.body;
      const data = await HubService.createHub(owner_email, hub);
      res.status(201).json({ data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteHub: async (req, res) => {
    try {
      const { userEmail } = req.query;
      const { hubId } = req.params;
      const data = await HubService.deleteHub(hubId, userEmail);
      res.json({ data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  editHub: async (req, res) => {
    try {
      const { userEmail, hub } = req.body;
      const { hubId } = req.params;
      const data = await HubService.editHub(hubId, userEmail, hub);
      res.json({ data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default hubsController;
