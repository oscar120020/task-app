import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry } from "../../../interfaces";
import { EntryModel } from "../../../models";

type Data = 
| {message: string}
| Entry

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(401).json({
      message: "El id no es valido",
    });
  }

  switch (req.method) {
    case "GET":
      return getEntry(req, res);

    case "PUT":
      return updateEntry(req, res);

    case "DELETE":
      return deleteEntry(req, res);

    default:
      res.status(400).json({ message: "Metodo no existe" + req.method });
  }
}

const getEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id } = req.query;
  
  await db.connect();
  const entry = await EntryModel.findById(id);
  await db.disconnect();

  if(!entry){
    return res.status(400).json({message: "Entrada po id no encontrada"})
  }
  
  return res.status(200).json(entry!)
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await EntryModel.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "Entrada no encontrado" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const entryUpdated = await EntryModel.findByIdAndUpdate(id, {description, status}, {new: true, runValidators: true})
    await db.disconnect();
    res.status(200).json(entryUpdated!)
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({
      message: error.errors.status.message
    })
  }
};

const deleteEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
    await EntryModel.findByIdAndDelete(id)
    await db.disconnect();
    
    res.status(200).json({
      message: `Entrada con eliminada con exito!`
    })
  } catch (error) {
    res.status(400).json({message: "bad request"})
  }
  

}
