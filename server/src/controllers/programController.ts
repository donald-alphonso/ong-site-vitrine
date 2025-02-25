import { Request, Response } from 'express';
import Program from '../models/Program';

// Get all programs
export const getAllPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await Program.find({ isActive: true }).sort('order');
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des programmes', error });
  }
};

// Get single program
export const getProgram = async (req: Request, res: Response) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      res.status(404).json({ message: 'Programme non trouvé' });
      return;
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du programme', error });
  }
};

// Create program
export const createProgram = async (req: Request, res: Response) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du programme', error });
  }
};

// Update program
export const updateProgram = async (req: Request, res: Response) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!program) {
      res.status(404).json({ message: 'Programme non trouvé' });
      return;
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du programme', error });
  }
};

// Delete program
export const deleteProgram = async (req: Request, res: Response) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      res.status(404).json({ message: 'Programme non trouvé' });
      return;
    }
    res.status(200).json({ message: 'Programme supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du programme', error });
  }
};
