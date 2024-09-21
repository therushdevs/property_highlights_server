// src/routes/propertyHighlight.ts
import express, { Request, Response } from "express";
import PropertyHighlight from "../models/PropertyHighlight";

const propertyHighlightRoutes = express.Router();

// Create new property highlight
propertyHighlightRoutes.post("/", async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    // Get the current highest order
    const highestOrder = await PropertyHighlight.findOne()
      .sort("-order")
      .exec();

    const newHighlight = new PropertyHighlight({
      title,
      created_at,
      updated_at,
      order: (highestOrder?.order || 0) + 1, // Set order based on existing entries
    });

    await newHighlight.save();
    res.status(201).json(newHighlight);
  } catch (error) {
    res.status(500).json({ error: "Error creating property highlight" });
  }
});

// Get all property highlights ordered by 'order' field
propertyHighlightRoutes.get("/", async (req: Request, res: Response) => {
  console.log("get all highlights");
  try {
    const highlights = await PropertyHighlight.find().sort("order").exec();
    res.status(200).json(highlights);
  } catch (error) {
    res.status(500).json({ error: "Error fetching property highlights" });
  }
});

// Update property highlight
// propertyHighlightRoutes.put("/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { title } = req.body;

//   try {
//     const highlight = await PropertyHighlight.findById(id);
//     if (!highlight) {
//       return res.status(404).json({ error: "Property highlight not found" });
//     }

//     highlight.title = title || highlight.title;
//     highlight.updated_at = new Date().toISOString();
//     await highlight.save();

//     res.status(200).json(highlight);
//   } catch (error) {
//     res.status(500).json({ error: "Error updating property highlight" });
//   }
// });

// Delete property highlight
propertyHighlightRoutes.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const highlight = await PropertyHighlight.findByIdAndDelete(id);
    if (!highlight) {
      return res.status(404).json({ error: "Property highlight not found" });
    }
    res.status(200).json({ message: "Property highlight deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting property highlight" });
  }
});

propertyHighlightRoutes.put("/reorder", async (req: Request, res: Response) => {
  const { reorderedIds } = req.body;
  console.log(`data: ${JSON.stringify(reorderedIds)}`);

  try {
    await Promise.all(
      reorderedIds.map((id: any, index: number) =>
        PropertyHighlight.findByIdAndUpdate(id, { order: index + 1 })
      )
    );

    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error updating order of property highlights" });
  }
});

export default propertyHighlightRoutes;
