import HubRepository from "../repositories/hub_repository.js";

const HubService = {
  getHubs: async (userEmail) => {
    if (!userEmail) {
      throw new Error("Missing email");
    }

    const data = await HubRepository.getHubsByUser(userEmail);

    if (!data || data.length === 0) {
      return [];
    }

    const normalizedData = data.reduce((acc, row) => {
      const existingHub = acc.find((hub) => hub.id === row.hubs.id);

      if (existingHub) {
        if (
          row.group_participants?.email &&
          !existingHub.participants.includes(row.group_participants.email)
        ) {
          existingHub.participants.push(row.group_participants.email);
        }
      } else {
        acc.push({
          id: row.hubs.id,
          name: row.hubs.name,
          description: row.hubs.description,
          semester: row.hubs.semester,
          session: row.hubs.session,
          userId: row.hubs.userId,
          createdAt: row.hubs.createdAt,
          email: row.user.email,
          username: row.user.name,
          participants: row.group_participants?.email
            ? [row.group_participants.email]
            : [],
        });
      }

      return acc;
    }, []);

    return normalizedData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  getHubDetail: async (hubId) => {
    if (!hubId) {
      throw new Error("Missing hubId");
    }

    const { hubData, sharedEmails } = await HubRepository.getHubDetails(hubId);

    if (!hubData || hubData.length === 0) {
      throw new Error("No group found");
    }

    const hubLinks = hubData
      .filter((row) => row.links?.id)
      .map((row) => ({
        id: row.links.id,
        url: row.links.url,
        name: row.links.ref_name,
        email: row.links.owner_email,
        description: row.links.description,
        semester: row.links.semester,
        session: row.links.session,
        category: row.links.category,
      }));

    const {
      hubs: { id, name, description, semester, session, userId },
      user: { email, name: username },
    } = hubData[0];

    return {
      id,
      name,
      description,
      semester,
      session,
      userId,
      email,
      username,
      links: hubLinks,
      shared_email: sharedEmails,
    };
  },

  createHub: async (owner_email, hub) => {
    if (!owner_email || !hub) {
      throw new Error("Invalid input");
    }

    const sharedEmails = hub.shared_email
      ? hub.shared_email.split(",").map((email) => email.trim())
      : [];
    return await HubRepository.createHub({ owner_email, ...hub }, sharedEmails);
  },

  deleteHub: async (hubId, userEmail) => {
    if (!hubId || !userEmail) {
      throw new Error("Invalid input");
    }

    return await HubRepository.deleteHub(hubId, userEmail);
  },

  editHub: async (hubId, userEmail, hub) => {
    if (!hubId || !userEmail || !hub) {
      throw new Error("Invalid input");
    }

    const sharedEmails = hub.shared_email
      ? hub.shared_email.split(",").map((email) => email.trim())
      : [];
    return await HubRepository.updateHub(hubId, userEmail, hub, sharedEmails);
  },
};

export default HubService;
