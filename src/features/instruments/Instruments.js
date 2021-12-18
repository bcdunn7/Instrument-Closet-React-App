import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstruments } from "./instrumentsSlice";
import InstrumentCard from "./InstrumentCard";
import { Grid } from "@mui/material";
import SearchBar from "./SearchBar";

const Instruments = () => {
    const dispatch = useDispatch();
    const instruments = useSelector(st => st.instruments.entities);
   
    useEffect(() => {
        console.log('effect?')
        dispatch(getAllInstruments())
    }, [dispatch])

    return (
        <div className="Instruments">
            <SearchBar/>
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