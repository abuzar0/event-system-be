import { Event } from "../models/event.model";
import { IEvent } from "../utils/IEvent";
import { IOptions } from "../utils/IOption";

export class EventService {

  static async isExists(findDto: any): Promise<IEvent | Boolean> {
    return await Event.findOne(findDto) || false
  };
  static async create(createDto: any): Promise<IEvent> {
    const events = await Event.create(createDto);
    return events.save();
  }

  static async getById(userId: string, { population = [] } = { population: [] }): Promise<IEvent> {
    const event = await Event.findById(userId).populate(population).exec();
    if (!event) {
      throw Error('event not found');
    }
    return event;
  };

  static async getMany(
    findDto: any,
    pagination = { limit: 10, page: 1 },
    options: IOptions = { population: [], select: [] }
  ): Promise<{ events: IEvent[]; total: number; totalPages: number }> {

    const skip = (pagination.page - 1) * pagination.limit;
    const limit = pagination.limit;

    const events = await Event.find(findDto, options.select)
      .populate(options.population || [])
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total number of events for calculating total pages
    const total = await Event.countDocuments(findDto).exec();
    const totalPages = Math.ceil(total / limit);

    return { events, total, totalPages };
  }

  static async update(
    EventId: string,
    updateDto: any,
    { lean = false, upsert = false, returnNew = true, population = [], session = undefined } = {},
    flatten = true
  ) {

    try {
      const updatedEvent = Event.findByIdAndUpdate(EventId, flatten ? { $set: updateDto } : updateDto, { lean, upsert, new: returnNew });
      return updatedEvent;
    } catch (error) {
      throw Error('problem in update');
    }

  }
}
