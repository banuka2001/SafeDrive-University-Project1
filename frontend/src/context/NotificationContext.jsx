import React,{createContext, useContext, useState} from 'react';

const NotificationContext=createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications]=useState([
        {
            trip: {
                id: 1,
                pickup: "123 Main St",
                pickuptown: "Colombo",
                destination: "456 Beach Rd",
                datetime: "2025-07-23T10:00",
                status: "pending",
            },
            driverId: "D001",
            driverName: "John Perera",
            customerName: "John Perera",
            customerPhone: "0714567890"
        },
        {
            trip: {
                id: 2,
                pickup: "78 Lake View",
                pickuptown: "Kandy",
                destination: "Airport",
                datetime: "2025-07-24T15:30",
                status: "pending",
            },
            driverId: "D002",
            driverName: "Saman Kumara",
            customerName: "Saman Kumara",
            customerPhone: "0777123456"
        },
    ]);

    const [approvedTrips, setApprovedTrips] = useState([]);

    const sendNotification = (notification) => {
        setNotifications((prev) => [...prev, notification]);
    };

    const markAsApproved = (tripId) => {
        // Find the notification that's being approved
        const approvedNotification = notifications.find(n => n.trip.id === tripId);
        
        if (approvedNotification) {
            console.log('Found notification to approve:', approvedNotification);
            
            // Create a new upcoming trip from the notification
            const newUpcomingTrip = {
                id: `T${approvedNotification.trip.id}`, // Add T prefix to match mock data format
                pickup: approvedNotification.trip.pickup,
                destination: approvedNotification.trip.destination,
                datetime: approvedNotification.trip.datetime,
                completed: false,
                driver: {
                    id: approvedNotification.driverId,
                    name: approvedNotification.driverName
                },
                customer: {
                    id: `C${approvedNotification.trip.id}`,
                    name: approvedNotification.customerName,
                    phone: approvedNotification.customerPhone
                }
            };

            console.log('Created new upcoming trip:', newUpcomingTrip);

            // Add to approved trips
            setApprovedTrips(prev => {
                const updated = [...prev, newUpcomingTrip];
                console.log('Updated approved trips:', updated);
                return updated;
            });

            // Remove from notifications
            setNotifications(prev => {
                const updated = prev.filter(n => n.trip.id !== tripId);
                console.log('Updated notifications:', updated);
                return updated;
            });
        } else {
            console.warn('No notification found with ID:', tripId);
        }
    };

    const rejectNotification = (tripId) => {
        setNotifications(prev =>
            prev.filter((n) => n.trip.id !== tripId)
        );
    };

    return(
        <NotificationContext.Provider value={{
            notifications,
            sendNotification,
            markAsApproved,
            rejectNotification,
            approvedTrips
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
