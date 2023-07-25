'use client'
import { setCookie } from "cookies-next"
import Constants from "../../../helpers/constants"

interface UploadPictureProps {
    fnUploadPicture: (formData: FormData) => Promise<any>
    refreshData?: () => void
    className?: string
}

export default function UploadPicture({ fnUploadPicture, refreshData, className }: UploadPictureProps) {
    const constants = new Constants()
    const formData = new FormData();

    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            formData.append('file0', file);
            fnUploadPicture(formData).then((data: any) => {
                if (data && data.status === 'success') {
                    data.token && setCookie('token', JSON.stringify(data.token), { maxAge: constants.getTokenExpirationTime() });
                }
                refreshData && refreshData()
            });
        }
    };

    return (
        <div className="profile-btn-container">
            <label htmlFor="fileInput" className="profile-avatar-btn">Subir imagen</label>
            <input type="file" id="fileInput" name="file0" className="file-input" onChange={handleFileInputChange} />
        </div>

    )
}