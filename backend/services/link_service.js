import LinkRepository from "../repositories/link_repository.js";

const LinkService = {
  getLink: async (linkId, userEmail) => {
    if (!userEmail || !linkId) {
      throw new Error("Invalid input");
    }

    const data = await LinkRepository.getLinkById(linkId, userEmail);
    if (!data || data.length === 0) {
      throw new Error("No link found");
    }

    const sharedEmails = data
      .map((row) => row.link_share_details?.sharedEmail)
      .filter(Boolean);

    const [normalizedData] = data.map((row) => ({
      id: row.links.id,
      url: row.links.url,
      ref_name: row.links.ref_name,
      title: row.links.title,
      category: row.links.category,
      description: row.links.description,
      session: row.links.session,
      semester: row.links.semester,
      email: row.user.email,
      sharedEmail: sharedEmails,
      sharedWith: row.links.shared_with,
      username: row.user.name,
      hub_name: row.hubs?.name,
      hub_id: row.link_share_details?.sharedGroupId,
    }));

    return normalizedData;
  },

  getLinks: async (userEmail, role) => {
    if (!userEmail) {
      throw new Error("Unauthorized");
    }

    const data = await LinkRepository.getLinksByUser(userEmail, role);
    if (!data || data.length === 0) {
      throw new Error("No links found");
    }

    return data.map((row) => ({
      id: row.links.id,
      url: row.links.url,
      ref_name: row.links.ref_name,
      description: row.links.description,
      createdAt: row.links.createdAt,
      category: row.links.category,
      shared_with: row.links.shared_with,
      session: row.links.session,
      semester: row.links.semester,
      email: row.user.email,
      username: row.user.name,
    }));
  },

  addLink: async (userEmail, link) => {
    if (!userEmail || !link) {
      throw new Error("Invalid input");
    }

    const data = await LinkRepository.addLink({
      owner_email: userEmail,
      ...link,
      hubId: link.shared_details?.group || null,
    });

    return data;
  },

  deleteLink: async (linkId, userEmail) => {
    if (!userEmail || !linkId) {
      throw new Error("Invalid input");
    }

    const data = await LinkRepository.deleteLink(linkId, userEmail);
    if (!data) {
      throw new Error("No link found");
    }

    return data;
  },

  updateLink: async (linkId, userEmail, link) => {
    if (!userEmail || !linkId || !link) {
      throw new Error("Invalid input");
    }

    const data = await LinkRepository.updateLink(linkId, userEmail, {
      ...link,
      hubId: link.shared_details?.group || null,
    });

    if (!data) {
      throw new Error("No link found");
    }

    return data;
  },

  getAllLinks: async (user) => {
    if (!user || user.role.toLowerCase() !== "admin") {
      throw new Error("Forbidden");
    }

    return await LinkRepository.getAllLinks();
  },
};

export default LinkService;
