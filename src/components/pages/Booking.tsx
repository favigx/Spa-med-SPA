import React, { useState } from 'react';

interface Bookings {
    fname: string | null;
    lname: string | null;
    email: string | null;
    phonenr: number | null;
    type: "luxury" | "budget" | null;
    time: "morning" | "afternoon" | "evening" | null;
    booked: boolean;
}

function Booking() {

    const [newBooking, setNewBooking] = useState<Bookings>({
        fname: null,
        lname: null,
        email: null,
        phonenr: null,
        type: null,
        time: null,
        booked: false
    });

    const saveBooking = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
            
        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({booking: newBooking})
        })
        .then(() => {
               
            setNewBooking(prevBooking => ({
                ...prevBooking,
                booked: true
            }));
                
            setNewBooking({
                fname: null,
                lname: null,
                email: null,
                phonenr: null,
                type: null,
                time: null,
                booked: false
            });
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewBooking(prevBooking => ({
            ...prevBooking,
            [name]: value
        }));
    };

    return ( 
        <div>
            <h2>Fyll i dina uppgifter och välj sedan paket och tid</h2>
            <form onSubmit={saveBooking}>
            Förnamn:
            <input type="text" name="fname" value={newBooking.fname || ''} onChange={handleChange}/>
            Efternamn:
            <input type="text" name="lname" value={newBooking.lname || ''} onChange={handleChange} />
            Email:
            <input type="email" name="email" value={newBooking.email || ''} onChange={handleChange} />
            Telefonnummer:
            <input type="phonenr" name="phonenr" value={newBooking.phonenr || ''} onChange={handleChange} />

            <select name="type" value={newBooking.type || ''} onChange={handleChange}>
                <option value="">Välj typ</option>
                <option value="luxury">Lyx</option>
                <option value="budget">Budget</option>
            </select>

            <select name="time" value={newBooking.time || ''} onChange={handleChange}>
                <option value="">Välj tidpunkt</option>
                <option value="morning">Förmiddag</option>
                <option value="afternoon">Eftermiddag</option>
                <option value="evening">Kväll</option>
            </select>

            <button>Boka!</button>
        </form>  
        </div>
    );
}

export default Booking;