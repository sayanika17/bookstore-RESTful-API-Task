import { Router, Request, Response } from 'express';
import { Book } from '../models/book.model';
import { authMiddleware } from '../middleware/auth';
const router = Router();
/**
 * @route POST /books
 * @desc Add a new book
 */
router.post('/books', authMiddleware, async (req: Request, res: Response) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error adding book', error: err });
  }
});
/**
 * @route GET /books
 * @desc Get all books
 */
router.get('/books', async (req: Request, res: Response) => {
  const books = await Book.find();
  res.json({ books });
});
/**
 * @route GET /books/:isbn
 * @desc Get book by ISBN
 */
router.get('/books/:isbn', async (req: Request, res: Response) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ book });
});
/**
 * @route PUT /books/:isbn
 * @desc Update book by ISBN
 */
router.put('/books/:isbn', authMiddleware, async (req: Request, res: Response) => {
  const book = await Book.findOneAndUpdate({ isbn: req.params.isbn }, req.body, { new: true });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book updated successfully' });
});
/**
 * @route DELETE /books/:isbn
 * @desc Delete book by ISBN
 */
router.delete('/books/:isbn', authMiddleware, async (req: Request, res: Response) => {
  const result = await Book.findOneAndDelete({ isbn: req.params.isbn });
  if (!result) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted successfully' });
});
export default router;
