'use client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AnimalService from "../../../services/animalService";
import Sale from "../../../models/sales";
import Animal from "../../../models/animal";
import salesService from "../../../services/salesService";
import { useEffect, useState } from "react";
import SaleFormSection from "../components/SaleFormSection";
import ButtonsBar from "../../components/ButtonsBar";

export default function Register() {

    const _animalService = new AnimalService();
    const _saleService = new salesService();

    const [saleFormData, setSaleFormData] = useState<Sale | undefined>()
    const [isValidSaleFormData, setIsValidSaleFormData] = useState(true)
    const [animals, setAnimals] = useState<Animal[]>([])
    const [updateList, setUpdateList] = useState(true)

    const getSaleFormData = (callback: ()=>Sale) => {
        setSaleFormData(callback());
    }

    const saleValidationForm = (callback:()=>boolean) => {
        setIsValidSaleFormData(callback())
    }

    const registerSale = async (e:any) => {
        e.preventDefault();
        if (isValidSaleFormData) {      
            saleFormData && await _saleService.register(saleFormData)
            .then(()=>{
                setUpdateList(updateList ? false : true)
            });        
        }else{
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    useEffect(()=>{
        _animalService.index()
            .then((data) => {
                data && setAnimals(data.listActive)
            })
    },[,updateList])

    return (
        <>
            <ButtonsBar />
            <section className="frontend row justify-content-center">
            <h1 className="titulo col-md-12">Registro de venta</h1>
            <div className="form col-lg-8" id='formDetailAnimal'>
            <form id="form-detail-update" onSubmit={registerSale} className="form_data form-group row">
                    <SaleFormSection
                        getSaleFormData={getSaleFormData}
                        saleValidationForm={saleValidationForm}
                        isFormDisabled={false}
                        animals={animals}
                    />
                    <input type="submit" className="btn btn-success btn-lg btn-block" value="Registrar" id="btnRegister" />
                </form>
                <ToastContainer />
            </div>
        </section>
        </>
    );
}