import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';

// Get all testimonials
export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort(
      'order'
    );
    res.status(200).json(testimonials);
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Erreur lors de la récupération des témoignages',
        error,
      });
  }
};

// Get single testimonial
export const getTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      res.status(404).json({ message: 'Témoignage non trouvé' });
      return;
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération du témoignage', error });
  }
};

// Create testimonial
export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Erreur lors de la création du témoignage', error });
  }
};

// Update testimonial
export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      res.status(404).json({ message: 'Témoignage non trouvé' });
      return;
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Erreur lors de la mise à jour du témoignage', error });
  }
};

// Delete testimonial
export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      res.status(404).json({ message: 'Témoignage non trouvé' });
      return;
    }
    res.status(200).json({ message: 'Témoignage supprimé avec succès' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erreur lors de la suppression du témoignage', error });
  }
};
