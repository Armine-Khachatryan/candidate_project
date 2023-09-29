import {useRef} from "react";
import s from "./UploadFile.module.css";
import {toast} from "react-toastify";



export const UploadFile = ({
                               onChange,
                               name,
                               children = <></>,
                               acceptFiles = ["image/*"],
                               className,
                               maxSize = 2, //MB
                               multiple = true,
                           }) => {
    const inputRef = useRef();

    const onDragOver = (e) => {
        e.currentTarget.classList.add(s.hover);
        e.preventDefault();
    };

    const onDragEnter = (e) => {
        e.currentTarget.classList.add(s.hover);
        e.preventDefault();
    };

    const onDragLeave = (e) => {
        e.currentTarget.classList.remove(s.hover);
        e.preventDefault();
    };

    const onDrag = (e) => {
        e.currentTarget.classList.remove(s.hover);
        e.preventDefault();
        if (!validateFileFormat(e.dataTransfer.files, acceptFiles)) {
            return toast.error("Invalid File Type");
        }
        if (validateSize(e.dataTransfer.files, maxSize)) {
            return toast.error(`File size exceeds ${maxSize} MiB`);
        }

        onChange &&
        onChange({
            target: {value: Array.from(e.dataTransfer.files), name},
        });
    };

    const onChangeInput = (e) => {
        if (validateSize(e.target.files, maxSize)) {
            return toast.error(`File size exceeds ${maxSize} MiB`);
        }
        onChange &&
        onChange({target: {value: Array.from(e.target.files), name}});
    };

    return (
        <label
            className={[s.container, className].join(" ")}
            onDragOver={onDragOver}
            onDrop={onDrag}
            draggable={true}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            name={name}
        >
            <input
                type="file"
                id={"file"}
                onChange={onChangeInput}
                multiple={multiple}
                ref={inputRef}
                className={s.file}
                name={name}
                accept={Array.isArray(acceptFiles) ? acceptFiles.join(",") : acceptFiles}
            />
            {children}
        </label>
    );
};

function validateFileFormat(files, validTypes) {
    return [...files].every(_file => {
        if (Array.isArray(validTypes)) {
            if (validTypes.find(item => item.includes('/*'))) {
                return !!validTypes.filter(item => _file.type.includes(item.replace('/*', ''))).length
            }
            return validTypes.includes(_file.type)
        }
        if (validTypes.includes('/*')) {
            return _file.type.includes(validTypes.replace('/*', ''))
        }
        return _file.type.includes(validTypes)
    })
}

function validateSize(files, maxSize) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const fileSize = +(file.size / (1024 * 1024)).toFixed(2); // in MiB
        if (fileSize > maxSize) {
            return true;
        }
        return false;
    }
}
