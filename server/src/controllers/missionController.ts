import { Request, Response } from 'express';
import Mission from '../models/Mission';

// Get all missions
export const getAllMissions = async (req: Request, res: Response) => {
  try {
    const missions = await Mission.find({ isActive: true }).sort('order');
    res.status(200).json(missions);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des missions', error });
  }
};

// Get single mission
export const getMission = async (req: Request, res: Response) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      res.status(404).json({ message: 'Mission non trouvée' });
      return;
    }
    res.status(200).json(mission);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération de la mission', error });
  }
};

// Create mission
export const createMission = async (req: Request, res: Response) => {
  console.log('hello');
  try {
    console.log(req.body);
    const mission = new Mission(req.body);
    await mission.save();
    res.status(201).json(mission);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Erreur lors de la création de la mission', error });
  }
};

// Update mission
export const updateMission = async (req: Request, res: Response) => {
  try {
    const mission = await Mission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mission) {
      res.status(404).json({ message: 'Mission non trouvée' });
      return;
    }
    res.status(200).json(mission);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Erreur lors de la mise à jour de la mission', error });
  }
};

// Delete mission
export const deleteMission = async (req: Request, res: Response) => {
  try {
    const mission = await Mission.findByIdAndDelete(req.params.id);
    if (!mission) {
      res.status(404).json({ message: 'Mission non trouvée' });
      return;
    }
    res.status(200).json({ message: 'Mission supprimée avec succès' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erreur lors de la suppression de la mission', error });
  }
};
