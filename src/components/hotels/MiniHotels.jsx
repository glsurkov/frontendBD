import React from 'react';
import cl from "../flights/miniFlights.module.css";
import MiniHotel from "../hotels/MiniHotel";

const MiniHotels = (props) => {
    return (
        <div className = {cl.container}>
            {props.hotels.map((hotel) =>
                <MiniHotel hotel = {hotel} key={hotel["hotels.users_hotel.hotel_order"]}/>
            )}
        </div>
    );
};

export default MiniHotels;