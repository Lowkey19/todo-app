import { Request, Response, Express } from 'express';

import ToDo from '../models/todo';

const routes = (app: Express) => {
  app.get('/todo', async (req: Request, res: Response) => {
    try {
      const allToDos = await ToDo.find({}).exec();
      res.status(200).send(allToDos);
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error getting To do data",
      })
    }
  });

  app.post('/todo/create', async (req: Request, res: Response) => {
    const { text, isCompleted } = req.body;
    const newToDo = new ToDo({
      text, isCompleted,
    })

    try {
      await newToDo.save();

      res.status(200).json({
        message: "Todo Data successfully created",
      })
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error creating To do data",
      })
    }
  });

  app.patch('/todo/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedToDo = req.body;

    try {
      await ToDo.findByIdAndUpdate(id, updatedToDo).exec();

      res.status(200).json({
        message: 'To do data successfully updated',
      });
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error updating To do data",
      })
    }
  });

  app.delete('/todo/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      await ToDo.findByIdAndDelete(id).exec();

      res.status(200).json({
        message: 'To do data successfully deleted',
      });
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error deleting To do data",
      })
    }
  });
}

export default routes;
