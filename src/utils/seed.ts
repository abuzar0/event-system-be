import mongoose from 'mongoose';
import { Role } from '../models/role.model';
import { Event } from '../models/event.model';
import { IUser } from './IUser';
import { User } from '../models/user.model';
import { IEvent } from './IEvent';
import { hashPassword } from './password-util';



export const seedDatabase = async () => {
    try {

        // Seed Roles
        const roles = [
            {
                type: 'admin',
                permissions: ['delete_event', 'approved_event', 'view_event'],
                isActive: true,
            },
            {
                type: 'user',
                permissions: ['create_event', 'join_event','view_event'],
                isActive: true,
            },
        ];

        const createdRoles = await Role.insertMany(roles);

        console.log('Roles seeded:', createdRoles);

        // Seed Users
        const adminRole = createdRoles.find(role => role.type === 'admin');
        const userRole = createdRoles.find(role => role.type === 'user');

        if (!adminRole || !userRole) {
            throw new Error('Roles not found. Ensure roles are seeded correctly.');
        }

        const users: any[] = [];
        for (let i = 0; i < 5; i++) {
            users.push({
                email: `admin${i + 1}@example.com`,
                username: `admin${i + 1}`,
                password: await hashPassword('password'), // Use hashed passwords in production
                role: adminRole._id,
            });
            users.push({
                email: `user${i + 1}@example.com`,
                username: `user${i + 1}`,
                password: await hashPassword('password'), // Use hashed passwords in production
                role: userRole._id,
            });
        }

        const createdUsers = await User.insertMany(
            users.map(user => ({ ...user, isActive: true }))
        );

        console.log('Users seeded:', createdUsers);

        // Seed Events
        const UserId = createdUsers.find(user => user.role == userRole._id);

        const events: any[] = [];
        for (let i = 0; i < 50; i++) {
            events.push({
                name: `Event ${i + 1}`,
                description: `Description for event ${i + 1}`,
                isApprove: i % 2 === 0,
                event_date: new Date(Date.now() + i * 86400000), // Future dates
                createdBy: UserId?._id as string,
                participants: createdUsers.slice(0, 5).map(user => String(user._id)),
            });
        }

        const createdEvents = await Event.insertMany(events);

        console.log('Events seeded:', createdEvents);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

