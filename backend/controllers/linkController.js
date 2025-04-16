import LinkService from "../services/link_service.js";

const linkController = {
  getLink: async (req, res) => {
    try {
      const { linkId } = req.params;
      const { userEmail } = req.query;

      const data = await LinkService.getLink(linkId, userEmail);
      res.json({ data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getLinks: async (req, res) => {
    try {
      const { userEmail, role } = req.query;

      const data = await LinkService.getLinks(userEmail, role);
      res.json({ data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  addLink: async (req, res) => {
    try {
      const { userEmail, link } = req.body;

      const data = await LinkService.addLink(userEmail, link);
      res.status(201).json({ message: "Link added successfully", data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteLink: async (req, res) => {
    try {
      const { userEmail } = req.query;
      const { linkId } = req.params;

      const data = await LinkService.deleteLink(linkId, userEmail);
      res.json({ data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateLink: async (req, res) => {
    try {
      const { userEmail, link } = req.body;
      const { linkId } = req.params;

      const data = await LinkService.updateLink(linkId, userEmail, link);
      res.json({ message: "Link updated successfully", data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllLinks: async (req, res) => {
    try {
      const { user } = req;

      const data = await LinkService.getAllLinks(user);
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default linkController;
