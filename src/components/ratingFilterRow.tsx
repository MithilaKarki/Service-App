import Pill from "./Pill";
import {RATING_OPTIONS, type RatingFilterValue} from "../types";

interface RatingFilterRowProps{
    selected : RatingFilterValue;
    onSelect : (value: RatingFilterValue) => void;

}

export default function RatingFilterRow({ selected, onSelect}: RatingFilterRowProps) {
    return (
        <div className = "flex flex-wrap gap-2">
            {RATING_OPTIONS.map((option) =>
            (<Pill
                key = {option.label}
                label= {option.label}
                active = {selected === option.value}
                onClick={ () => onSelect(option.value)}
            />
            ))}
        </div>
    );
}
