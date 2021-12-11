import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstruments } from "./instrumentsSlice";
import InstrumentCard from "./InstrumentCard";

const Instruments = () => {
    const dispatch = useDispatch();
    const instruments = useSelector(st => st.instruments.entities);
   
    useEffect(() => {
        dispatch(getAllInstruments)
    }, [dispatch])

    return (
        <div className="Instruments">
            <h2>Instruments</h2>
            <div>Searchbar</div>
            <div>Tag filters</div>
            <div className="Instruments-list">
                {instruments.map(i => <InstrumentCard inst={i} />)}
            </div>
        </div>
    )
}

export default Instruments;