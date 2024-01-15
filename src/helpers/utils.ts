export const convertImageToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            // `reader.result` contient l'URL de données de l'image
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Impossible de convertir le fichier en URL de données.'));
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        // Lire le contenu du fichier en tant qu'URL de données
        reader.readAsDataURL(file);
    });
}

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export const filterTableData = (name: string, value: string) => {
    if (name.toLocaleLowerCase().includes('image')) {
        return "<img width='100' src='" + value + "' alt=''/>"
    }
    if (name.toLocaleLowerCase().startsWith('is')) {
        return `<div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
         ${value ? 'checked' : ''}>
             </div>`
    }
    return value;
}
export const filterInput = (column: any) => {
    let result: any = ""
    let excludeInput = ['created_at', 'updated_at' , 'position', 'roles']

    if (excludeInput.includes(column.name.toLocaleLowerCase()) || column.name.toLocaleLowerCase().startsWith('created')) {
        return ''
    }
 
    if (column.name.toLocaleLowerCase().includes('image')) {
        result = `<input class='form-control' type='file' name='${column.name}' placeholder='${capitalizeFirstLetter(column.name)}' ...'} />`
    } else if (column.name.toLocaleLowerCase().includes('content')) {
        result = `<textarea class='form-control' name='${column.name}' placeholder='${capitalizeFirstLetter(column.name)}' ...'} >
        </textarea>`
    }
    else if (column.name.toLocaleLowerCase().startsWith('is')) {
        result =  `<select class='form-control' name='${column.name}'  >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>`
    }
    else {
        result =  `<input class='form-control' type='text' name='${column.name}' placeholder='${capitalizeFirstLetter(column.name)}' ...'} />`
    }
    return result;
}
