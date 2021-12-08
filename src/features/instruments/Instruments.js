import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstruments } from "./instrumentsSlice";

const Instruments = () => {
    const dispatch = useDispatch();
    const instruments = useSelector(st => st.instruments.entities)
   
    useEffect(() => {
        dispatch(getAllInstruments)
    }, [dispatch])

    return (
        <div className="Instruments">
            <h2>Instruments</h2>
            <div className="Instruments-list">
                {instruments.map(i => <div>{i.name}</div>)}
            </div>
        </div>
    )
}

export default Instruments;