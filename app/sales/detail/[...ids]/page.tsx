'use client'
import { useEffect, useState } from "react";
import Sale from "../../../../models/sales";
import Animal from "../../../../models/animal";
import AnimalService from "../../../../services/animalService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SalesService from "../../../../services/salesService";
import SaleFormSection from "../../components/SaleFormSection";
import Carousel from "../../../animals/components/Carousel";
import SpinnerLoading from "../../../components/SpinnerLoading";
import SaleInfo from "../../components/SaleInfo";
import ButtonsBar from "../../../components/ButtonsBar";

interface DetailProps {
    params: any
}
export default function SalePageDetail({ params }: DetailProps) {

    const [sale, setSale] = useState<Sale | undefined>()
    const [animal, setAnimal] = useState<Animal>()

    const [saleForm, setSaleForm] = useState<Sale | undefined>()
    const [isValidSaleForm, setIsValidSaleForm] = useState(true)
    const [isVisible, setIsVisible] = useState(true)
    const [updateTrigger, setUpdateTrigger] = useState(true)
    const [listImages, setListImages] = useState();

    const showElement = {
        "display": "block"
    }

    const hideElement = {
        "display": "none"
    }

    const _animalService = new AnimalService()
    const _saleService = new SalesService()

    useEffect(() => {
        const getData = async () => {
            const saleData = await _saleService.detail(params.ids[1])
            saleData && setSale(saleData.sale);
            saleData && setAnimal(saleData.animal);
        }
        getData()

        const fetchData = async () => {
            const imagesData = await _animalService.getImages(params.ids[0]);
            imagesData && setListImages(imagesData.images_list);
        }
        fetchData();

    }, [params.ids, updateTrigger])

    let getSaleFormData = (callback: () => Sale) => {
        setSaleForm(callback());
    }

    let SaleValidationForm = (callback: () => boolean) => {
        setIsValidSaleForm(callback())
    }

    const updateSale = async (e: any) => {
        e.preventDefault();
        if (isValidSaleForm) {
            saleForm && await _saleService.update(saleForm)
                .then(() => {
                    showUpdateForm();
                    setUpdateTrigger(updateTrigger ? false : true);
                })
        } else {
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    const showUpdateForm = () => {
        setIsVisible(isVisible ? false : true)
    }

    return (
        <>
            <ButtonsBar />
            <div className="row mt-4 justify-content-center">
                <div className="col-md-7">
                    {animal && <Carousel resourceUrl="/api/animals/image/" listImages={listImages} />}
                </div>
            </div>
            <div style={isVisible ? showElement : hideElement}>
                <SaleInfo animal={animal} sale={sale} />
            </div>
            <button className="btn btn-primary btn-md btn-block mt-3" onClick={showUpdateForm} id="btnEnableForm" style={isVisible ? showElement : hideElement}>Habilitar actualización de datos</button>
            <section className="frontend row justify-content-center" style={!isVisible ? showElement : hideElement}>
                <h1 className="titulo col-md-12">Actualización de datos de la venta</h1>
                <div className="form col-lg-12" id='formDetailAnimal'>
                    <form id="form-detail-update" onSubmit={updateSale} className="form_data form-group row">
                        {sale ? <SaleFormSection
                            getSaleFormData={getSaleFormData}
                            saleValidationForm={SaleValidationForm}
                            sale={sale}
                            animal={animal}
                            isFormDisabled={true}
                            action={"update"}
                        /> :
                            <SpinnerLoading />
                        }
                    </form>
                </div>
            </section>
            <ToastContainer />
        </>
    );

}