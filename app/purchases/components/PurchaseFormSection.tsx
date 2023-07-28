'use client'
import Purchase from "../../../models/purchases";
import { useState, useEffect } from "react";
import Validations from "../../../helpers/validations";
import InputText from "../../components/formComponents/InputText";
import InputDate from "../../components/formComponents/InputDate";
import InputSelect from "../../components/formComponents/InputSelect";
import InputTextArea from "../../components/formComponents/InputTextArea";
import UpdateSection from "../../components/formComponents/UpdateSection";
import Animal from "../../../models/animal";
import PurchasesService from "../../../services/purchasesService";
import { useRouter } from 'next/navigation';

interface PurchaseFormSectionProps{
    getPurchaseFormData: (fn:() => Purchase)=>void
    purchaseValidationForm: (fn:()=>boolean)=>void
    purchase?: Purchase | undefined
    animal?: Animal
    action?:string 
    isFormDisabled: boolean 
}

const EmptyPurchase = new Purchase(null,null,null,null,null,null,null,null,null,null,null,null,null)

export default function PurchaseFormSection({ getPurchaseFormData, purchaseValidationForm, purchase=EmptyPurchase, animal, action="register", isFormDisabled = false }: PurchaseFormSectionProps) {

    const _purchaseService = new PurchasesService()
    const validate = new Validations();
    const router = useRouter()

    const [purchase_type, setPurchase_type] = useState(purchase['purchase_type']);
    const [weight, setWeight] = useState(purchase['weight']);
    const [price_total, setPrice_total] = useState(purchase['price_total']);
    const [price_kg, setPrice_kg] = useState(purchase['price_kg']);
    const [auction_commission, setAuction_commission] = useState(purchase['auction_commission']);
    const [auction_name, setAuction_name] = useState(purchase['auction_name']);
    const [description, setDescription] = useState(purchase['description']);
    const [purchase_date, setPurchase_date] = useState(purchase['purchase_date']);
    const [isAuction, setIsAuction] = useState(true)

    const [isDisabled, setIsDisabled] = useState(isFormDisabled);

    useEffect(() => {
        getPurchaseFormData(() => {
            return new Purchase(purchase.id, purchase_type, weight, price_total, price_kg, auction_commission, auction_name, description, purchase_date,null,null,null,null)
        })
        let isValid = validateForm()
        purchaseValidationForm(() => {
            return isValid
        })
    }, [, purchase_type, weight, price_total, price_kg, auction_commission, auction_name, description, purchase_date])

    useEffect(() => {
        purchase_type && purchase_type === "Subasta" ? setIsAuction(true) : setIsAuction(false)
    }, [, purchase_type])

    const purchaseTypeOptions = [
        "Subasta",
        "Particular",
        "Intercambio",
        "Otro"
    ]

    const auctionOptions = [
        "Subasta Ganadera Rio Blanco",
        "Subasta Expococi (Guapiles)",
        "Subasta de Valle la Estrella",
        "Camara de Ganaderos Unidos del Sur",
        "Subasta Ganadera UPAP",
        "Subasta Ganadera Sancarleña S.A.",
        "Subasta Ganadera Maleco Guatuso S.A.",
        "Subasta Ganadera Montecillos, Upala",
        "Grupo de Subastas Sarapiqui PJ",
        "Subasta Ganadera El Progreso de Nicoya",
        "Subasta Camara de Ganaderos de Santa Cruz",
        "Subasta Camara de Ganaderos de Cañas",
        "Subasta Limonal",
        "Subasta de Tilaran",
        "Subasta Camara de Ganaderos de Hojancha",
        "Subasta de Ganadera Liberia 07",
        "Subasta Ganadera AGAINPA",
        "Subasta Ganadera El Progreso",
        "Subasta Ganadera de Parrita",
        "Subasta Salama (Neilly)",
        "Subasta San Vito (Cotobruceña)",
        "Otro"
    ];


    let validateForm = () => {
        return validate.validarNumerico("weight", weight || 0) && validate.validarNumerico("price_total", price_total || 0) && validate.validarNumerico("price_kg", price_kg || 0) && validate.validarNumerico("auction_commission", auction_commission || 0) && validate.validarAlfaNumericoTextarea("description", description || "")
    }

    const enableInputs = () => {
        setIsDisabled(false);
    }

    let delete_purchase = (e:any) => {
        e.preventDefault()
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");

        if (confirmDelete) {
            animal && purchase.id && _purchaseService.delete(purchase.id, animal.id)
            .finally(()=>{ router.push('/purchases/index')})               
        }
    }

    return (
        <>           
            { animal && <InputText title="Nombre" setData={()=>{}} entity={animal} name={'nickname'} isDisabled={true} />}
            <InputSelect title="Tipo de compra" setData={setPurchase_type} entity={purchase} name={'purchase_type'} options={purchaseTypeOptions} isDisabled={isDisabled} />
            <InputText title="Peso de compra" setData={setWeight} entity={purchase} name={'weight'} isDisabled={isDisabled} />
            <InputText title="Monto total de la compra" setData={setPrice_total} entity={purchase} name={'price_total'} isDisabled={isDisabled} />
            { isAuction ? (
                <>
                    <InputText title="Monto por kilogramo" setData={setPrice_kg} entity={purchase} name={'price_kg'} isDisabled={isDisabled} />
                    <InputText title="Comisión de la subasta (Porcentaje)" setData={setAuction_commission} entity={purchase} name={'auction_commission'} isDisabled={isDisabled} />
                    <InputSelect title="Nombre de la subasta" setData={setAuction_name} entity={purchase} name={'auction_name'} options={auctionOptions} isDisabled={isDisabled} />
                </>
                ) : ''
            }
            <InputDate title="Fecha de la compra" setData={setPurchase_date} entity={purchase} name={'purchase_date'} isDisabled={isDisabled} />
            <InputTextArea title="Descripción de la compra" setData={setDescription} entity={purchase} name={'description'} isDisabled={isDisabled} />
            {action === 'update' &&
                <>
                    <UpdateSection enableInputs={enableInputs} delete_function={delete_purchase} />
                </>
            }
        </>
    )
}