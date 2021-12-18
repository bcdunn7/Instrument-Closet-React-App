import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstruments } from "./instrumentsSlice";
import InstrumentCard from "./InstrumentCard";
import { Grid } from "@mui/material";

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
                <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                    {instruments.map(i => <InstrumentCard inst={i} key={i.id} />)}
                </Grid>
            </div>
        </div>
    )
}

export default Instruments;