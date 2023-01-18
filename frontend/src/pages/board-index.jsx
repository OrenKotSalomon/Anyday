import { useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { loadCars, addCar, updateCar, removeCar, addToCart } from '../store/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { boardService } from '../services/board.service.js'
import { BoardDetails } from './board-details.jsx'

export function BoardIndex() {

    return (
        <div>
            <h3>Monday App</h3>
            <main>
                <BoardDetails />
            </main>
        </div>
    )
}
            // const cars = useSelector(storeState => storeState.carModule.cars)
        
            // useEffect(() => {
            //     loadCars()
            // }, [])
        
            // async function onRemoveCar(carId) {
            //     try {
            //         await removeCar(carId)
            //         showSuccessMsg('Car removed')            
            //     } catch (err) {
            //         showErrorMsg('Cannot remove car')
            //     }
            // }
        
            // async function onAddCar() {
            //     const car = carService.getEmptyCar()
            //     car.vendor = prompt('Vendor?')
            //     try {
            //         const savedCar = await addCar(car)
            //         showSuccessMsg(`Car added (id: ${savedCar._id})`)
            //     } catch (err) {
            //         showErrorMsg('Cannot add car')
            //     }        
            // }
        
            // async function onUpdateCar(car) {
            //     const price = +prompt('New price?')
            //     const carToSave = { ...car, price }
            //     try {
            //         const savedCar = await updateCar(carToSave)
            //         showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
            //     } catch (err) {
            //         showErrorMsg('Cannot update car')
            //     }        
            // }
        
            // function onAddToCart(car){
            //     console.log(`Adding ${car.vendor} to Cart`)
            //     addToCart(car)
            //     showSuccessMsg('Added to Cart')
            // }
        
            // function onAddCarMsg(car) {
            //     console.log(`TODO Adding msg to car`)
            // }