import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { RootState, useAppDispatch } from "../../redux/store";
import { NewCar } from "../../../types";
import { getOneNewCar } from "../../redux/slice/newCarSlice";
import ImageSwitcher from "../../utils/imageSwitcher";


const NewCarDeatils = () => {
const { newCarId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();



  useEffect(() => {
    if (newCarId) {

      dispatch(
        getOneNewCar({

          newCarId,
          extra: {
            navigate,
          },
        })
      );
    }
  }, [newCarId, dispatch, navigate]);

  const newCar = useSelector(
    (state: RootState) => state.newCar.oneNewCarData as NewCar
  );



  return (
    <div className="my-4 mx-3 p-4  bg-gray-200">
        <ImageSwitcher images={newCar.carImage} name={newCar.carName}/>

        <div className="bg-white shadow-xlmm mt-10 rounded-xl p-4">
              <h2 className="text-xl font-bold">{newCar.carName}</h2>
              <p>{newCar.carBrand}</p>
              <p>{newCar.carColor}</p>
              <p>{newCar.year}</p>
              <p>{newCar.energyType}</p>
              <p>{newCar.engineType}</p>
              <p>{newCar.engineNumber}</p>
              <p>{newCar.gearType}</p>
              <p>{newCar.price}</p>
              <p>{newCar.quantity}</p>
              <p>{newCar.discount}</p>
              <p>{newCar.description}</p>
        </div>
    </div>
  )
}

export default NewCarDeatils