import { NestCamWiredStandTwoTone } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
//TypeScript can correctly handle circular imports for types so it's okay to import from store. Needed for writing selector functions
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


const initialState = {
    mode: "dark"
};
interface scheduleType{
    dateFrom: Date,
    dateTo: Date,
    id: number
}
interface pricingType{
    category: String,
    price: number,
    quantity: number,
    uri: String
}
interface royaltiesType{
    address?: String,
    share?: number,
    name?: String
}
interface formStateType{
    performer: String,
    title: String,
    symbol: String,
    description: String,
    location: String,
    schedules: scheduleType[],
    pricing: pricingType[],
    royalties: royaltiesType[],
    available: Boolean
}
const formInitialState: formStateType = {
    performer: "",
    title: "",
    symbol: "",
    description:"",
    location:"",
    schedules: [{dateFrom: new Date(), dateTo: new Date(), id: 0}],
    pricing: [],
    royalties: [],
    available: false
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: state => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
});

export const formSlice = createSlice({
    name: "formSlice",
    initialState: formInitialState,
    reducers: {
        setFormSymb: (prevState, action: PayloadAction<String>) => {
            prevState.symbol = action.payload;
        },
        setFormPerformer: (prevState, action: PayloadAction<String>) => {
            prevState.performer = action.payload;
        },
        setFormTitle: (prevState, action: PayloadAction<String>) => {
            prevState.title = action.payload;
        },
        setFormDesc: (prevState, action: PayloadAction<String>) => {
            prevState.description = action.payload;
        },
        setFormLocation: (prevState, action: PayloadAction<String>) => {
            prevState.location = action.payload;
        },
        setFormSchedules: (prevState, action: PayloadAction<scheduleType>) => {
            prevState.schedules = [...prevState.schedules, action.payload];
        },
        setFormPricing: (prevState, action: PayloadAction<pricingType>) => {
            prevState.pricing = [...prevState.pricing, action.payload];
        },
        setFormRoyalties: (prevState, action: PayloadAction<royaltiesType>) => {
            prevState.royalties = [...prevState.royalties, action.payload];
        },
        deleteFormSchedules: (prevState, action: PayloadAction<number>) =>{
            prevState.schedules = [...prevState.schedules].filter((el) => el.id != action.payload);
        },
        setFormAvailable: (prevState, action: PayloadAction<Boolean>) => {
            prevState.available = !prevState.available;
        }
        
    }
})

export const { setMode } = globalSlice.actions;
export const { setFormSymb, setFormPerformer, setFormDesc, setFormLocation, setFormPricing, setFormSchedules, setFormRoyalties, setFormTitle, deleteFormSchedules, setFormAvailable } = formSlice.actions;
// export const { setFormDesc, setFormLocation, setFormTitle } = formSlice.actions;

export const selectFormSlice = (state: RootState) => state.formSlice;

export const formSliceReducer = formSlice.reducer;
export default globalSlice.reducer;