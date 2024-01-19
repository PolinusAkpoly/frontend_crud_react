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

export const filterInput = (column: any, getNameUser: any) => {
    let result: any = {}
    let excludeInput = ['created_at', 'updated_at', 'position', 'roles']

    if (excludeInput.includes(column.name.toLocaleLowerCase()) || column.name.toLocaleLowerCase().startsWith('created')) {
        return {
            input: null
        }
    }

    if (column.name.toLocaleLowerCase().includes('image')) {
        result = {
            input: 'input',
            type: 'file',
            name: `${column.name.toLocaleLowerCase()}`,
            placeholder: `${capitalizeFirstLetter(column.name)} ...`,
            className: 'form-control'
        };


        // = `<input onChange={formik.handleChange} class='form-control' type='file' name='${column.name}' placeholder='${capitalizeFirstLetter(column.name)}' ...'} />`
    } else if (column.name.toLocaleLowerCase().includes('content')) {
        result = {
            input: 'textarea',
            type: 'textarea',
            name: `${column.name.toLocaleLowerCase()}`,
            placeholder: `${capitalizeFirstLetter(column.name)} ...`,
            className: 'form-control'
        };

        //  `<textarea onChange={formik.handleChange} class='form-control' name='${column.name}' placeholder='${capitalizeFirstLetter(column.name)}' ...'} >
        // </textarea>`
    }
    else if (column.name.toLocaleLowerCase().startsWith('is')) {
        result = {
            input: 'select',
            type: 'select',
            name: `${column.name}`,
            options: [{ name: 'Yes', value: true }, { name: 'No', value: false }],
            className: 'form-control'
        }
    } 
    else if (column.name.toLocaleLowerCase().startsWith('author')) {
        result = {
            input: 'select',
            type: 'select',
            name: `${column.name}`,
            options: getNameUser,
            className: 'form-control'
        }
        
    } else if (column.name.toLocaleLowerCase().startsWith('email')) {
        result = {
            input: 'input',
            type: 'email',
            name: `${column.name.toLocaleLowerCase()}`,
            placeholder: `${capitalizeFirstLetter(column.name)}  ...`,
            className: 'form-control'
        }

    } else if (column.name.toLocaleLowerCase().startsWith('pass')) {
        result = {
            input: 'input',
            type: 'password',
            name: `${column.name.toLocaleLowerCase()}`,
            placeholder: `${capitalizeFirstLetter(column.name)}`,
            className: 'form-control'
        }

     } else {
        result = {
            input: 'input',
            type: 'text',
            name: `${column.name.toLocaleLowerCase()}`,
            placeholder: `${capitalizeFirstLetter(column.name)}`,
            className: 'form-control'
        }

        // `<input onChange={formik.handleChange} class='form-control' type='text' name='${column.name}' placeholder='${capitalizeFirstLetter(column.name)}' ...'} />`
    }
    return result;
}


export const validateForm = (values: any, columns: any[]) => {
    let errors: any = {};
    let excludeInput = ['created_at', 'updated_at', 'position', 'roles', 'imageurl']

    columns.forEach(column => {
        
        if (excludeInput.includes(column.name.toLowerCase()) || column.name.toLowerCase().startsWith('created') ) {
            // Omitir la iteración si se cumple alguna de las condiciones
            return;
        }
        if (!values[column.name]) {
            errors = {...errors, [column.name]: 'Required'};  
        }
        
    });
    
    console.log({errors});
    
    return errors;
}
export const validateCreactUsersForm = (values: any) => {

    const errors: any = {};
    if (!values.first_name) {
        errors.first_name = 'Required';
    } else if (values.first_name?.length > 15) {
        errors.first_name = 'Must be 15 characters or less';
    }

    if (!values.last_name) {
        errors.last_name = 'Required';
    } else if (values.last_name?.length > 15) {
        errors.last_name = 'Must be 15 characters or less';
    }


    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or more';
    } else if (values.password.length > 20) {
        errors.password = 'Must be 20 characters or less';
    }

    return errors;
};


export const generateFileUrl = (file: any) => {
    if (!file) {
      console.error("Le fichier est manquant.");
      return null;
    }
  
    try {
      const fileUrl = URL.createObjectURL(file);
      return fileUrl;
    } catch (error) {
      console.error("Erreur lors de la création de l'URL du fichier :", error);
      return null;
    }
  }
  


