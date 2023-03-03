import { useAppDispatch, useAppSelector } from "../state/hooks";

import CategoryCard from "./CategoryCard";


const CategoryCardParent = () => {
    const dispatch = useAppDispatch();
    const formSelected = useAppSelector(state => state.formSlice);
    const formPricingSegment = formSelected.pricing;

    return (
        <>
        {formPricingSegment.map(el => {
            if (!(el.category === "") && el.price != 0 && el.quantity != 0){
                return(
                    <CategoryCard category = {el.category} seat = {el.quantity} price = {el.price} image = {el.uri}/>)
            }
        })}
        </>
    )
}

export default CategoryCardParent;