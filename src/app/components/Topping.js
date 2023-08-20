import {useEffect, useState} from "react";
import Image from "next/image";
import {IoMdCheckmark} from "react-icons/io";

const Topping = ({topping, additionalTopping, setAdditionalTopping}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckBox = () => {
        setIsChecked(!isChecked);
    }

    const handleAddTopping = () => {
        if (isChecked){
            const newToppings = new Set([...additionalTopping, {...topping}]);
            setAdditionalTopping(Array.from(newToppings));
        } else {
            const newToppings = additionalTopping.filter(toppingObj => toppingObj.name !== topping.name);
            setAdditionalTopping(newToppings);
        }
    }

    useEffect(() => {
        handleAddTopping();
    }, [isChecked])

    return (
        <div className={`${isChecked && 'border-orange'} w-full max-w-[110px] h-[140px] p-1 flex flex-col items-center
        justify-center border rounded-md bg-white relative`}>
            <Image
                src={topping.image}
                alt={""}
                width={70}
                height={70}
                className={"mb-2"}
            />
            {/*  topping name  */}
            <div className={"text-sm capitalize text-center font-medium"}>{topping.name}</div>
            {/*  checkbox  */}
            <input
                type="checkbox"
                checked={isChecked}
                className={"absolute w-full h-full opacity-0 cursor-pointer"}
                onChange={handleCheckBox}
            />
            {/*  checkmark icon  */}
            <div className={`${isChecked ? 'opacity-100' : 'opacity-0'} absolute top-1 right-1`}>
                <IoMdCheckmark className={"text-orange text-xl"}/>
            </div>
        </div>
    )
};

export default Topping;
