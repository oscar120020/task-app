import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { EntryModel, IEntry } from "../../../models";

type Data = { message: string } | IEntry[] | IEntry;

export default async function entries(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    
    case "POST":
      return addEntries(req, res)

    case "PUT":
      return addEntries(req, res)

    default:
      res.status(400).json({
        message: "Endpoint no existe",
      });
  }
  res.status(200).json({ message: "Example" });
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await EntryModel.find().sort({ createdAt: "ascending" });
  await db.disconnect();

  res.status(200).json(entries);
};

const addEntries = async(req: NextApiRequest, res: NextApiResponse) => {
  const {description} = req.body
  
  const newEntry = new EntryModel({
    description,
    createdAt: Date.now()
  })

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();

    res.status(201).json(newEntry)
  } catch (error) {
    await db.disconnect()
    console.log(error);
    return res.status(500).json({message: "Error en servidor, ver consola del servidor"})
  }

}
