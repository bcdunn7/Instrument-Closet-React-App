const MyReservations = () => {
    // need to make a call for reservations on page load. Can do this in redux if we want, or we could just use local state. Consistency says redux (we get instruments into redux on each page load). But it seems like a fair bit of work. Especially once we start using this to patch instruments!

    return (
        <div>Reservations</div>
        // need to display user reservations with all relevant details fully visible, with an 'edit reservation' button for each. Edit should be able to change every small detail (times, timezone, quantity, etc.) I think we can reuse the form to create reservations if we want since it will be the same info. Logically, it's equivalent to deleting a reservation and editing it again. 
        // The only tricky part will be on quantity. When we make a call to see what quantity is or is not available we will need to SUBTRACT the original quantity from the reservation being edited. Since it won't matter once edited.
    )
}

export default MyReservations;