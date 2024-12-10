import { UserService } from './../services/user.service';
import { EventService } from './../services/event.service';
import { Request, Response } from "express";


export class EventController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const pageNumber = Number(page);
      const pageSize = Number(limit);


      const { events, total, totalPages } = await EventService.getMany(
        { isActive: true },
        { page: pageNumber, limit: pageSize }
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
      const event = await EventService.create(req.body);
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
      const getUser = await UserService.getById(user?._id ?? '');
      if (!getUser) {
        throw new Error('User not found');
      }

      const eventId = req.body.eventId;
      if (!getUser.event_list.includes(eventId)) {
        const updated = await UserService.update(String(getUser._id), { event_list: [...getUser.event_list, eventId] });
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
