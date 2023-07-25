'use client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Animal from "../../../models/animal";
import AnimalService from "../../../services/animalService";
import Purchase from "../../../models/purchases";
import PurchasesService from "../../../services/purchasesService";
import AnimalFormSection from "../../animals/components/formComponents/AnimalFormSection";
import { useState } from "react";
import PurchaseFormSection from "../components/PurchaseFormSection";
import ButtonsBar from "../../components/ButtonsBar";

export default function Register() {

    let _animalService = new AnimalService();
    let _purchaseService = new PurchasesService();

    const [animalForm, setAnimalForm] = useState<Animal | undefined>()
    const [isValidAnimalFormData, setIsValidAnimalFormData] = useState(true)
    const [purchaseFormData, setPurchaseFormData] = useState<Purchase | undefined>()
    const [isValidPurchaseFormData, setIsValidPurchaseFormData] = useState(true)

    let getAnimalFormData = (callback: () => Animal) => {
        setAnimalForm(callback());
    }

    let animalValidationFormData = (callback: () => boolean) => {
        setIsValidAnimalFormData(callback())
    }

    let getPurchaseFormData = (callback: () => Purchase) => {
        setPurchaseFormData(callback());
    }

    let purchaseValidationForm = (callback: () => boolean) => {
        setIsValidPurchaseFormData(callback())
    }

    const purchase = async (e: any) => {
        e.preventDefault();
        if (isValidAnimalFormData && isValidPurchaseFormData) {

            const animalData = animalForm && await _animalService.register(animalForm);
            if (purchaseFormData && animalData) {
                purchaseFormData.animal_id = animalData.id;
            }

            purchaseFormData && await _purchaseService.register(purchaseFormData);
        } else {
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    return (
        <>
            <ButtonsBar />
            <section className="frontend row justify-content-center">
                <h1 className="titulo col-md-12">Registro de compra</h1>
                <div className="form col-lg-8" id='formDetailAnimal'>
                    <form id="form-detail-update" onSubmit={purchase} className="form_data form-group row">
                        <AnimalFormSection
                            animals={[]}
                            getAnimalFormData={getAnimalFormData}
                            action={''}
                            animalValidationForm={animalValidationFormData}
                        />
                        <PurchaseFormSection
                            getPurchaseFormData={getPurchaseFormData}
                            purchaseValidationForm={purchaseValidationForm}
                            isFormDisabled={false}
                        />
                        <input type="submit" className="btn btn-success btn-lg btn-block" value="Registrar" id="btnRegister" />
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    );
}