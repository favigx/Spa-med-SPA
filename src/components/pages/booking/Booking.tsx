import React, { useState, useEffect } from 'react';
import bookingsData from '../../jsonbookings/db.json';
import Calendar from 'react-calendar';
import '../booking/booking.css';

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
    const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
    
    useEffect(() => {
        const bookings = bookingsData.bookings as unknown as { booking: Booking }[];
    
        if (bookings && bookings.length > 0) {
            const filteredBookings = bookings.map((booking: any) => ({
                type: booking.booking.type,
                time: booking.booking.time,
                date: new Date(booking.booking.date)
            }));
            setBookedSlots(() => filteredBookings);
        } else {
            setBookedSlots(() => []);
    }
    
    const availableCombinationsExist = ["Lyx", "Poormans-spa"].some(type =>
        ["Förmiddag", "Eftermiddag", "Kväll"].some(time =>
            !bookedSlots.some(slot =>
                slot.type === type &&
                slot.time === time &&
                slot.date.toDateString() === (selectedDate?.toDateString() ?? "")
            )
        )
    );
    
    setShowForm(availableCombinationsExist);
    }, [selectedDate, bookingsData]);

    const saveBooking = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const localDate = newBooking.date.toLocaleDateString("sv-SE");

        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ booking: { ...newBooking, date: localDate } })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Kunde inte spara bokningen!");
                }
                setBookingSuccess(true);
            })
            
            .catch(error => {
                console.error("Error saving booking:", error);
            });
    };

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        setNewBooking({ ...newBooking, date });
    };

    const handleTypeToggle = (type: string) => {
        if (newBooking.type === type) {
            setNewBooking({ ...newBooking, type: "" });
        } else {
            setNewBooking({ ...newBooking, type });
        }
    };

    const handleTimeToggle = (time: string) => {
        if (newBooking.time === time) {
            setNewBooking({ ...newBooking, time: "" });
        } else {
            setNewBooking({ ...newBooking, time });
        }
    };

    const handleResetForm = () => {
        setNewBooking({
            fname: "",
            lname: "",
            email: "",
            type: "",
            time: "",
            date: new Date()
        });

        setBookingSuccess(false);
    }

    return (
        <div className="form">
            {bookingSuccess ? (
                <div>
                    <h2>Bokning genomförd!</h2>
                    <p>Bokningsbekräftelse:</p>
                    <p>Förnamn: {newBooking.fname}</p>
                    <p>Efternamn: {newBooking.lname}</p>
                    <p>Email: {newBooking.email}</p>
                    <p>Typ: {newBooking.type}</p>
                    <p>Tid: {newBooking.time}</p>
                    <p>Datum: {newBooking.date.toLocaleDateString("sv-SE")}</p>
                    <p>Betalning sker på plats</p><br/><br/>
                    <button className="button" onClick={handleResetForm}>Gör en ny bokning</button>
                </div>
            ) : (
                    <>
                        {showForm ? (
                            <>
                                <div>
                                    <p>Välj datum för bokning:</p>
                                    <Calendar onChange={handleDateChange} value={selectedDate}/>
                                </div>

                                <form onSubmit={saveBooking}>
                                    <div>
                                        <p>Välj typ av bokning:</p>
                                        {["Lyx", "Poormans-spa"].map((type) => {
                                            const isTypeSelected = newBooking.type === type;
                                            const isTypeAvailable = ["Förmiddag", "Eftermiddag", "Kväll"].some(time =>
                                                !bookedSlots.some(slot =>
                                                    slot.type === type && slot.time === time && slot.date.toDateString() === newBooking.date.toDateString()
                                                )
                                            );
                                            if (!isTypeAvailable) {
                                                return null;
                                            }
                                            return (
                                                <button className='button'
                                                    key={type}
                                                    type="button"
                                                    onClick={() => handleTypeToggle(type)}
                                                    style={{ background: isTypeSelected ? "#583817" : "transparent" }}
                                                >
                                                    {type}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div>
                                        <p>Välj tid för bokning:</p>
                                        {["Förmiddag", "Eftermiddag", "Kväll"].map((time) => {
                                            const isTimeAvailable = !bookedSlots.some(slot =>
                                                slot.type === newBooking.type && slot.time === time && slot.date.toDateString() === newBooking.date.toDateString()
                                            );
                                            if (!isTimeAvailable) {
                                                return null;
                                            }
                                            return (
                                                <button className="button"
                                                    key={time}
                                                    type="button"
                                                    onClick={() => handleTimeToggle(time)}
                                                    style={{ background: newBooking.time === time ? "#583817" : "transparent" }}
                                                >
                                                    {time}
                                                </button>
                                            );
                                        })}
                                    </div><br />
                                    <div>
                                        <label>
                                            Förnamn<br />
                                            <input className="inputForm" type="text" value={newBooking.fname} onChange={(e) => setNewBooking({ ...newBooking, fname: e.target.value })}></input>
                                        </label><br /><br />
                                        <label>
                                            Efternamn<br />
                                            <input className="inputForm" type="text" value={newBooking.lname} onChange={(e) => setNewBooking({ ...newBooking, lname: e.target.value })}></input>
                                        </label><br /><br />
                                        <label>
                                            Email<br />
                                            <input  className="inputForm" type="email" value={newBooking.email} onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}></input>
                                        </label><br /><br />
                                    </div>
                                    <button className="button" type="submit">Boka behandling</button>
                                </form>
                            </>
                        ) : (
                                <div>
                                    <p>Välj datum för bokning:</p>
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={selectedDate}
                                    />
                                    <div>
                                        <p>Det finns tyvärr inga lediga tider för valt datum<br />
                                        Vänligen välj ett annat datum</p>
                                    </div>
                                </div>
                            )}
                    </>
                )}
        </div>
    );
}

export default Booking;