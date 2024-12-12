import { UserService } from './../services/user.service';
import { EventService } from './../services/event.service';
import { Request, Response } from "express";


export class EventController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const search = req.query.search as string | undefined;
      const pageNumber = Number(page);
      const pageSize = Number(limit);
      const options = {
        population: [
          {
            path: 'createdBy',
            select: 'username email',
          },
        ],
        select: []
      };
      const query: {
        isActive: boolean;
        name?: { $regex: string; $options: string };
      } = { isActive: true };

      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }
      const { events, total, totalPages } = await EventService.getMany(
        query,
        { page: pageNumber, limit: pageSize },
        options
      );

      return res.status(200).json({
        message: "Events list!",
        isSuccess: true,
        data: events,
        pagination: {
          page: pageNumber,
          limit: pageSize,
          total,
          totalPages,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message, isSuccess: false });
      } else {
        return res
          .status(500)
          .json({ message: "An unexpected error occurred", isSuccess: false });
      }
    }
  };

  static createEvent = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const event = await EventService.create({ ...req.body, createdBy: user?._id });
      return res.status(201).json({ message: "event created !", data: event, isSuccess: true })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message, isSuccess: false });
      } else {
        return res
          .status(500)
          .json({ message: "An unexpected error occurred", isSuccess: false });
      }
    }
  }


  static joinEvent = async (req: Request, res: Response) => {
    try {
      const user = req['user'];
      const eventId = req.body.eventId;
      const event = await EventService.getById(eventId);
      if (!event) {
        throw new Error('event not found');
      }

      if (!event.participants.includes(user?._id || "")) {
        const updated = await EventService.update(String(eventId), { participants: [...event.participants, user?._id] });
        return res.status(201).json({ message: "event join !", data: updated, isSuccess: true })
      }
      return res.status(200).json({ message: "you already  join the event!", isSuccess: true })

    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message, isSuccess: false });
      } else {
        return res
          .status(500)
          .json({ message: "An unexpected error occurred", isSuccess: false });
      }
    }
  }

  static deleteEvent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const event = await EventService.update(id, { isActive: false })
      return res.status(200).json({ message: "event deleted !", data: event, isSuccess: true })

    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message, isSuccess: false });
      } else {
        return res
          .status(500)
          .json({ message: "An unexpected error occurred", isSuccess: false });
      }
    }
  }

  static approvedEvent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const event = await EventService.update(id, req.body)
      return res.status(200).json({ message: "event approved !", data: event, isSuccess: true })

    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message, isSuccess: false });
      } else {
        return res
          .status(500)
          .json({ message: "An unexpected error occurred", isSuccess: false });
      }
    }
  }
}
