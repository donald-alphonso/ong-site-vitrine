import { Request, Response } from 'express';
import News from '../models/News';

// Get all news
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const news = await News.find({ isPublished: true })
      .sort('-publishDate')
      .select('-content');  // Exclude full content for list view
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des actualités', error });
  }
};

// Get single news article
export const getNewsArticle = async (req: Request, res: Response) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      res.status(404).json({ message: 'Article non trouvé' });
      return;
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'article", error });
  }
};

// Create news article
export const createNewsArticle = async (req: Request, res: Response) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de l'article", error });
  }
};

// Update news article
export const updateNewsArticle = async (req: Request, res: Response) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!news) {
      res.status(404).json({ message: 'Article non trouvé' });
      return;
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de l'article", error });
  }
};

// Delete news article
export const deleteNewsArticle = async (req: Request, res: Response) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      res.status(404).json({ message: 'Article non trouvé' });
      return;
    }
    res.status(200).json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'article", error });
  }
};

// Get latest news
export const getLatestNews = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 3;
    const news = await News.find({ isPublished: true })
      .sort('-publishDate')
      .limit(limit)
      .select('-content');
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des dernières actualités', error });
  }
};
