import { db } from "../drizzle/drizzle.js";
import { bookmarks, links } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

const bookmarkController = {
    getBookmarks: async (req, res) => {
        const { userEmail } = req.query;

        if (!userEmail) {
            return res.status(400).json({ message: "Missing email!" });
        }

        try {
            const data = await db
            .select()
            .from(bookmarks)
            .innerJoin(links, eq(bookmarks.linkId, links.id))
            .where(eq(bookmarks.userEmail, userEmail));

            if (!data.length) {
            return res.json({ data: [] });
            }

            const normalizedData = data.map((row) => ({
            id: row.bookmarks.id,
            linkId: row.bookmarks.linkId,
            userEmail: row.bookmarks.userEmail,
            link: {
                id: row.links.id,
                url: row.links.url,
                name: row.links.ref_name,
                description: row.links.description,
                semester: row.links.semester,
                session: row.links.session,
                category: row.links.category,
                email: row.links.owner_email,
            },
            }));

            res.json({ data: normalizedData });
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },


    createBookmark: async (req, res) => {
        const { userEmail, linkId } = req.body;

        if (!userEmail || !linkId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            const existingBookmark = await db
            .select()
            .from(bookmarks)
            .where(
                eq(bookmarks.userEmail, userEmail) && 
                eq(bookmarks.linkId, linkId)
            );

            if (existingBookmark.length) {
            return res.status(400).json({ message: "Bookmark already exists" });
            }

            const [newBookmark] = await db
            .insert(bookmarks)
            .values({ userEmail, linkId })
            .returning();

            res.status(201).json({ data: newBookmark });
        } catch (error) {
            console.error("Error creating bookmark:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    deleteBookmark: async (req, res) => {
        const { bookmarkId } = req.params;

        if (!bookmarkId) {
            return res.status(400).json({ message: "Missing bookmarkId" });
        }

        try {
            const deletedBookmark = await db
            .delete(bookmarks)
            .where(eq(bookmarks.id, bookmarkId))
            .returning();

            if (!deletedBookmark.length) {
                return res.status(404).json({ message: "Bookmark not found" });
            }

            res.json({ message: "Bookmark deleted successfully" });
        } catch (error) {
            console.error("Error deleting bookmark:", error);
            res.status(500).json({ message: "Error deleting bookmark" });
        }
    },
};

export default bookmarkController;
