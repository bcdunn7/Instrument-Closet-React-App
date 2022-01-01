const ReservationCard = ({ resvData }) => {
    return (
        <div>
            <b>Reservation for {resvData.instrumentId}</b>
            <p>Quantity: {resvData.quantity}. Start: {resvData.startTime}. End: {resvData.endTime}</p>
        </div>
    )
}

export default ReservationCard;