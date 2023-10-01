import { useRef } from "react";
import styles from './styles.module.scss';

type ImageUploaderProps = {
    handleFile: (file: File) => void;
};

const ImageUploader = ({ handleFile }: ImageUploaderProps) => {
    const hiddenFileInput = useRef<any>(null);

    const handleClick = () => {
        if(!hiddenFileInput.current) return;

        hiddenFileInput.current.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) return;

        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    };
    return (
        <>
            <button className={styles.uploadBtn} onClick={handleClick}>
                Edit Image
            </button>
            <input
                type="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
            />
        </>
    );
};

export default ImageUploader;