import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstruments } from "./instrumentsSlice";
import InstrumentCard from "./InstrumentCard";
import { Grid } from "@mui/material";
import SearchBar from "./SearchBar";
import TagFilters from "./TagFilters";

const Instruments = () => {
    const dispatch = useDispatch();
    const instruments = useSelector(st => st.instruments.entities);
    const selectedCategories = useSelector(st => st.instruments.selectedCategories);
   
    useEffect(() => {
        dispatch(getAllInstruments())
    }, [dispatch])

    return (
        <div className="Instruments">
            <SearchBar/>
            <TagFilters/>
            <div className="Instruments-list">
                <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                    {instruments.map(i => {
                        if (selectedCategories.length > 0) {
                            for (let catObj of i.categories) {
                                if (selectedCategories.includes(catObj.category)) {
                                    return (
                                        <InstrumentCard 
                                            inst={i} 
                                            key={i.id} 
                                            
                                        />
                                    )
                                }
                            }
                            return null;
                        }
                        return (
                            <InstrumentCard 
                                inst={i} 
                                key={i.id} 
                                
                            />
                        )
                    }
                    )}
                </Grid>
            </div>
        </div>
    )
}

export default Instruments;