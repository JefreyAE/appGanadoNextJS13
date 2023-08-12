'use client'
import { useEffect, useState } from "react";
import Purchase from "../../../../models/purchases";
import Animal from "../../../../models/animal";
import AnimalService from "../../../../services/animalService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PurchasesService from "../../../../services/purchasesService";
import PurchaseFormSection from "../../components/PurchaseFormSection";
import Carousel from "../../../animals/components/Carousel";
import PurchaseInfo from "../../components/PurchaseInfo";
import ButtonsBar from "../../../components/ButtonsBar";

interface DetailProps {
    params: any
}
export default function PurchasePageDetail({ params }: DetailProps) {

    const [purchase, setPurchase] = useState<Purchase | undefined>()
    const [animal, setAnimal] = useState<Animal>()
    const [purchaseForm, setPurchaseForm] = useState<Purchase | undefined>()
    const [isValidPurchaseForm, setIsValidPurchaseForm] = useState(true)
    const [isVisible, setIsVisible] = useState(true)
    const [updateTrigger, setUpdateTrigger] = useState(true)
    const [listImages, setListImages] = useState();

    const _animalService = new AnimalService()
    const _purchaseService = new PurchasesService()

    useEffect(() => {
        const getData = async () => {
            const purchaseData = await _purchaseService.detail(params.ids[1])
            purchaseData && setPurchase(purchaseData.purchase);           
            purchaseData && setAnimal(purchaseData.animal);
        }
        getData()

        const fetchData = async () => {
            const imagesData = await _animalService.getImages(params.ids[0]);
            imagesData && setListImages(imagesData.images_list);
        }
        fetchData()

    }, [params.ids, updateTrigger])

    let getPurchaseFormData = (callback: () => Purchase) => {
        setPurchaseForm(callback());
    }

    const purchaseValidationForm = (callback: () => boolean) => {
        setIsValidPurchaseForm(callback())
    }

    const purchaseFunction = async (e: any) => {
        e.preventDefault();
        if (isValidPurchaseForm) {
            purchaseForm && await _purchaseService.update(purchaseForm) 
            .then(()=>{
                showUpdateForm(); 
                setUpdateTrigger(updateTrigger?false:true); 
            }) ;
        } else {
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    const showUpdateForm = () => {
        setIsVisible(!isVisible)
    }

    return (
        <>
            <ButtonsBar />
            <div className="row mt-4 justify-content-center">
                <div className="col-md-7">
                    {animal && <Carousel resourceUrl="/api/animals/image/" listImages={listImages} />}
                </div>
            </div>
            {isVisible && <PurchaseInfo animal={animal} purchase={purchase}/>}
            {isVisible  && <button className="btn btn-primary btn-md btn-block mt-3" onClick={showUpdateForm} id="btnEnableForm" >Habilitar actualización de datos</button>}
            {!isVisible && <section className="frontend row justify-content-center">
                <h1 className="titulo col-md-12">Actualización de datos de la compra</h1>
                <div className="form col-lg-12" id='formDetailAnimal'>
                    <form id="form-detail-update" onSubmit={purchaseFunction} className="form_data form-group row">
                        {purchase && <PurchaseFormSection
                            getPurchaseFormData={getPurchaseFormData}
                            purchaseValidationForm={purchaseValidationForm}
                            purchase={purchase}
                            animal={animal}
                            isFormDisabled={true}
                            action={"update"}
                        />}
                    </form>            
                </div>
            </section>}
            <ToastContainer />
        </>
    );

}