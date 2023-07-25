'use client'

import Validations from "../../../helpers/validations";
import InputText from "../../components/formComponents/InputText";
import InputDate from "../../components/formComponents/InputDate";
import InputSelect from "../../components/formComponents/InputSelect";
import InputTextArea from "../../components/formComponents/InputTextArea";
import UpdateSection from "../../components/formComponents/UpdateSection";
import Animal from "../../../models/animal";
import Sale from "../../../models/sales";
import SalesService from "../../../services/salesService";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

interface SaleFormSectionProps{
    getSaleFormData: (fn:() => Sale)=>void
    saleValidationForm: (fn:()=>boolean)=>void
    sale?: Sale | undefined
    animal?: Animal
    animals?: Animal[]
    action?:string 
    isFormDisabled: boolean 
}

type OptionObject = {
    value: string | null | number
    description: string | null
}

const Emptysale = new Sale(null,null,null,null,null,null,null,null,null,null,null,null,null)

export default function SaleFormSection({ getSaleFormData, saleValidationForm, sale=Emptysale, animal, animals, action="register", isFormDisabled = false }: SaleFormSectionProps) {

    const _saleService = new SalesService()
    const validate = new Validations();

    const router = useRouter()

    const [sale_type, setsale_type] = useState(sale['sale_type'])
    const [weight, setWeight] = useState(sale['weight'])
    const [price_total, setPrice_total] = useState(sale['price_total'])
    const [price_kg, setPrice_kg] = useState(sale['price_kg'])
    const [auction_commission, setAuction_commission] = useState(sale['auction_commission'])
    const [auction_name, setAuction_name] = useState(sale['auction_name'])
    const [description, setDescription] = useState(sale['description'])
    const [sale_date, setsale_date] = useState(sale['sale_date'])
    const [isAuction, setIsAuction] = useState(true)
    const [animal_id, setAnimal_Id] = useState(sale.animal_id)
    const [animalDataOptions, setAnimalDataOptions] = useState<OptionObject[]>()

    const [isDisabled, setIsDisabled] = useState(isFormDisabled);

    useEffect(() => {
        animals && generateAnimalsDataOptions(animals)
    }, [animals])

    useEffect(() => {
        saleValidationForm(() => {
            return validateForm()
        })

        getSaleFormData(() => {
            return new Sale(sale.id, sale_type, weight, price_total, price_kg, auction_commission, auction_name, description, sale_date,null,null,animal_id,null)
        })
    }, [, sale_type, weight, price_total, price_kg, auction_commission, auction_name, description, sale_date, animal_id])

    useEffect(() => {
        sale_type && sale_type === "Subasta" ? setIsAuction(true) : setIsAuction(false)
    }, [, sale_type])

    const saleTypeOptions = [
        "Subasta",
        "Particular",
        "Intercambio",
        "Otro"
    ]

    const auctionOptions = [
        "Subasta Ganadera Rio Blanco",
        "Subasta Expococí (Guápiles)",
        "Subasta de Valle la Estrella",
        "Cámara de Ganaderos Unidos del Sur",
        "Subasta Ganadera UPAP",
        "Subasta Ganadera Sancarleña S.A.",
        "Subasta Ganadera Maleco Guatuso S.A.",
        "Subasta Ganadera Montecillos, Upala",
        "Grupo de Subastas Sarapiquí PJ",
        "Subasta Ganadera El Progreso de Nicoya",
        "Subasta Cámara de Ganaderos de Santa Cruz",
        "Subasta Cámara de Ganaderos de Cañas",
        "Subasta Limonal",
        "Subasta de Tilarán",
        "Subasta Cámara de Ganaderos de Hojancha",
        "Subasta de Ganadera Liberia 07",
        "Subasta Ganadera AGAINPA",
        "Subasta Ganadera El Progreso",
        "Subasta Ganadera de Parrita",
        "Subasta Salamá (Neilly)",
        "Subasta San Vito (Cotobruceña)",
        "Otro"
    ];


    let validateForm = () => {
        return validate.validarNumerico("weight", weight || 0) && validate.validarNumerico("price_total", price_total || 0) && validate.validarNumerico("price_kg", price_kg || 0) && validate.validarNumerico("auction_commission", auction_commission || 0) && validate.validarAlfaNumericoTextarea("description", description || "")
    }

    const enableInputs = () => {
        setIsDisabled(false);
    }

    let delete_sale = (e:any) => {
        e.preventDefault()
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");

        if (confirmDelete) {
            animal && sale.id && _saleService.delete(sale.id, animal.id)
            .finally(()=>{ router.push('/sales/index')})               
        }
    }

    const generateAnimalsDataOptions = (animals:Animal[])=>{
        let options:any[] = []
        animals.map((animal, key)=>{
            options.push({"value":animal.id, "description":`${animal.certification_name} ${animal.nickname}`})
        })
        options && setAnimalDataOptions(options)
    }

    return (
        <>     
            {animals && <InputSelect title="Seleccione el animal" setData={setAnimal_Id} entity={sale} name={'animal_id'} options={animalDataOptions || []} isDisabled={isDisabled} />      }
            { animal && <InputText title="Nombre" setData={()=>{}} entity={animal} name={'nickname'} isDisabled={true} />}
            <InputSelect title="Tipo de venta" setData={setsale_type} entity={sale} name={'sale_type'} options={saleTypeOptions} isDisabled={isDisabled} />
            <InputText title="Peso de venta" setData={setWeight} entity={sale} name={'weight'} isDisabled={isDisabled} />
            <InputText title="Monto total de la venta" setData={setPrice_total} entity={sale} name={'price_total'} isDisabled={isDisabled} />
            { isAuction ? (
                <>
                    <InputText title="Monto por kilogramo" setData={setPrice_kg} entity={sale} name={'price_kg'} isDisabled={isDisabled} />
                    <InputText title="Comisión de la subasta (Porcentaje)" setData={setAuction_commission} entity={sale} name={'auction_commission'} isDisabled={isDisabled} />
                    <InputSelect title="Nombre de la subasta" setData={setAuction_name} entity={sale} name={'auction_name'} options={auctionOptions} isDisabled={isDisabled} />
                </>
                ) : ''
            }
            <InputDate title="Fecha de la venta" setData={setsale_date} entity={sale} name={'sale_date'} isDisabled={isDisabled} />
            <InputTextArea title="Descripción de la venta" setData={setDescription} entity={sale} name={'description'} isDisabled={isDisabled} />
            {action === 'update' &&
                <>
                    <UpdateSection enableInputs={enableInputs} delete_function={delete_sale} />
                </>
            }
        </>
    )
}