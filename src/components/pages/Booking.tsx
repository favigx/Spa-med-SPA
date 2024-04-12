import React, { useState, useEffect } from 'react';
import bookingsData from '../jsonbookings/db.json';
import Calendar from 'react-calendar';

interface Booking {
    fname: string;
    lname: string;
    email: string;
    type: string; 
    time: string;
    date: Date;
}

function Booking() {
    const [newBooking, setNewBooking] = useState<Booking>({
        fname: "",
        lname: "",
        email: "",
        type: "",
        time: "",
        date: new Date()
    });

    const [bookedSlots, setBookedSlots] = useState<{ type: string, time: string, date: any }[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showForm, setShowForm] = useState<boolean>(true);

    const bookings = bookingsData.bookings;

    useEffect(() => {
        const filteredBookings = bookings.map((booking) => ({
            type: booking.booking.type,
            time: booking.booking.time,
            date: new Date(booking.booking.date)
        }));
        setBookedSlots(filteredBookings);
        console.log(filteredBookings);

        const availableCombinationsExist = ['luxury', 'budget'].some(type =>
            ['morning', 'afternoon', 'evening'].some(time =>
                !bookedSlots.some(slot =>
                    slot.type === type &&
                    slot.time === time &&
                    slot.date.toDateString() === selectedDate?.toDateString()
                )
            )
        );

        setShowForm(availableCombinationsExist);
    }, [selectedDate]);

    const saveBooking = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({booking: newBooking})
                
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Kunde inte spara bokningen!');
            }
            setNewBooking({
                fname: "",
                lname: "",
                email: "",
                type: "",
                time: "",
                date: new Date()
            });
            console.log('Bokningen sparades!');
        })
        .catch(error => {
            console.error('Error saving booking:', error);
        });
    };

    const handleTypeChange = (type: string) => {
        setNewBooking({ ...newBooking, type });
    };

    const handleTimeChange = (time: string) => {
        setNewBooking({ ...newBooking, time });
    };

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        setNewBooking({ ...newBooking, date });
    };

    return ( 
        <div>
            {showForm ? (
                <>
                    <h2>Fyll i dina uppgifter och välj sedan paket och tid</h2>
                    <form onSubmit={saveBooking}>
                        <label>
                            Förnamn:
                            <input type="text" value={newBooking.fname} onChange={(e) => setNewBooking({ ...newBooking, fname: e.target.value })}></input>
                        </label>
                        <label>
                            Efternamn:
                            <input type="text" value={newBooking.lname} onChange={(e) => setNewBooking({ ...newBooking, lname: e.target.value })}></input>
                        </label>
                        <label>
                            Email:
                            <input type="text" value={newBooking.email} onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}></input>
                        </label>

                        <div>
                            <p>Välj datum för bokning:</p>
                            <Calendar onChange={handleDateChange} value={selectedDate} />
                        </div>

                        <div>
                            <p>Välj typ av bokning:</p>
                            {['luxury', 'budget'].map((type) => (
                                !bookedSlots.some(slot => slot.type === type && slot.time === newBooking.time && slot.date.toDateString() === newBooking.date.toDateString()) && (
                                    <button key={type} type="button" onClick={() => handleTypeChange(type)}>{type}</button>
                                )
                            ))}
                        </div>

                        <div>
                            <p>Välj tid för bokning:</p>
                            {['morning', 'afternoon', 'evening'].map((time) => (
                                !bookedSlots.some(slot => slot.type === newBooking.type && slot.time === time && slot.date.toDateString() === newBooking.date.toDateString()) && (
                                    <button key={time} type="button" onClick={() => handleTimeChange(time)}>{time}</button>
                                )
                            ))}
                        </div>
                        <button type="submit">Boka</button>
                    </form>
                </>
            ) : (
                <div>
                    <p>Inga lediga tider.</p>
                    <p>Vänligen välj ett annat datum.</p>
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>
            )}
        </div>
    );
}

export default Booking;