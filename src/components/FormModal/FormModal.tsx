/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 15/01/2024 18:51:03
*/
import React, { FC, useEffect, useState } from 'react';
import './FormModal.css';
import { Button, Modal } from 'react-bootstrap';
import { capitalizeFirstLetter, filterInput, validateForm } from '../../helpers/utils';
import { useFormik } from 'formik';
import InputField from '../InputField/InputField';
import TextareaField from '../TextareaField/TextareaField';
import SelectField from '../SelectField/SelectField';
import { addDataWithFile, getDatasById, updateDatasById, updateDatasWithFile } from '../../api/entity';

// import SelectUser from '../SelectUser/SelectUser';




interface FormModalProps {
  entityName?: string
  columns: any[]
  handleClose: () => void
  modelId?: string
}


const FormModal: FC<FormModalProps> = ({ entityName, columns, handleClose, modelId }) => {


  const validate = (values: any) => validateForm(values, columns)
  // const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileSource, setFileSource] = useState<File | null>(null)
  const [columnData, setColumnData] = useState<any>(null)







  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      let newColumn = columns
      console.log({ newColumn, modelId });

      if (modelId && entityName) {
        let oneData = await getDatasById(entityName, modelId)
        let data = oneData.result
        newColumn = newColumn.map((column: any) => {
          column.value = data[column.name]
          return column
        })
        console.log({ newColumn });
      }

      let datas = await Promise.all(newColumn.map((column) => filterInput(column)))
      console.log({datas});
      
      setColumnData(datas);

    }
    runLocalData()
  }, [modelId, columns])

  const getInitValues = () => {
    const result: any = {}
    let excludeInput = ['created_at', 'updated_at', 'position', 'roles', 'imageurl']

    columns.forEach((column) => {
      if (excludeInput.includes(column.name.toLowerCase()) || column.name.toLowerCase().startsWith('created')) {
        // Omitir la iteración si se cumple alguna de las condiciones
        return;
      }

      result[column.name] = ""

      if (modelId) {
        result[column.name] = column.value
      }


    })

    console.log({ initValue: result });

    return result

  }

  const getModel = (name: string) => {
    let value = name.slice(0, name.length - 1)
    return capitalizeFirstLetter(value)
  }

  // console.log(getNameUsers(entityNameDatas));

  const formik = useFormik({

    initialValues: getInitValues(),
    validate,
    onSubmit: async (data) => {
      if (entityName) {
        const model = getModel(entityName)
        let result: any = undefined
        const formData = new FormData()

        if(modelId){
          // update
          if (fileSource) {
            formData.append("file", fileSource)
            formData.append("Post", JSON.stringify(data))
            result = await updateDatasWithFile(entityName,modelId, formData )
          }else{
           
            result = await updateDatasById(entityName, {Post: data}, modelId)
          }

        }else{
          //create 
          
          formData.append(model, JSON.stringify(data))
          if (fileSource) {
            formData.append("file", fileSource)
          }
          result = await addDataWithFile(entityName, formData)
          
        }
        console.log({ result });
        // if (fileSource) {

        //   formData.append("file", fileSource)

        //   formData.append(model, JSON.stringify(data))

        //   result = await addDataWithFile(entityName, formData)
        // } else if (fileSource && modelId) {
        //   result = await updateDatasById(entityName, formData, modelId)
        // } else {
        //   result = await createData(entityName, { [model]: data })
        // }
        // console.log({ result });
      }
    },
  });




  const uploadImage = async (e: any) => {
    const { files } = e.target
    if (files.length) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        try {
          // const url = await convertImageToDataURL(file)
          setFileSource(file)
          // console.log(url);

          // setFileUrl(url)

        } catch (error) {

        }
      }


    }

  }



  return (
    <div className="FormModal">
      <div>

        <Modal size='lg'
          scrollable
          centered show={true}
          onHide={handleClose}>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              {
                columnData?.map((result: any, index: number) => {

                  //  result contient columns et valeur associée
                  if (result.input == 'input' && result.type != 'file') {
                    return (<div>
                      <InputField key={index} defaultValue={formik.values[result.name]} onChange={formik.handleChange} type={result.type} name={result.name} className={result.className} placeholder={result.placeholder} />
                      {
                        formik.errors[result.name] ?
                          (
                            <div className="text-danger">{formik.errors[result.name] as any}</div>
                          )
                          : null
                      }
                    </div>
                    )

                  } else if (result.input == 'input' && result.type == 'file') {
                    // console.log(result);

                    return (<div className='d-flex row '>

                      <div className={`${modelId ? 'col-9' : ''}`}>
                        <label htmlFor={result.name}> {capitalizeFirstLetter(result.name)} :</label>
                        <input
                          onChange={uploadImage}
                          className={result.className}
                          type={result.type}
                          name={result.name}
                          placeholder={result.placeholder}
                          // defaultValue={result.value}
                          // value={result.value || ''}
                        />
                      </div>

                      <div className={`${modelId ? 'col-3' : ''}`}>
                        {
                          modelId ? (
                            <img src={result.value} width={170} height={120} alt={capitalizeFirstLetter(result.name)} className='mt-2' />
                          ) : (
                            null
                          )

                        }
                      </div>
                    </div>)

                  } else if (result.input == 'textarea') {
                    return (<div>
                      <TextareaField key={index} defaultValue={formik.values[result.name]} onChange={formik.handleChange} name={result.name} className={result.className} />
                      {
                        formik.touched[result.name] && formik.errors[result.name] ?
                          (
                            <div>{formik.errors[result.name] as any}</div>
                          )
                          : null
                      }
                    </div>)
                  } else if (result.input == 'select') {
                    return (<div>
                      <SelectField key={index} defaultValue={result.value} options={result.options} onChange={formik.handleChange} name={result.name} className={result.className} />
                      {
                        formik.touched[result.name] && formik.errors[result.name] ?
                          (
                            <div>{formik.errors[result.name] as any}</div>
                          )
                          : null
                      }
                    </div>)
                  }
                  //  pourquoi result.value ??????

                })}
              <Modal.Footer>
                <Button type='submit' variant="success" >
                  {modelId ? 'Update' : 'Save'}
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Fermer
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>

        </Modal>
      </div>
    </div>
  );
}

export default FormModal;


/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 15/01/2024 18:51:03
*/
// import React, { FC, useEffect } from 'react';
// import './FormModal.css';
// import { Button, Modal } from 'react-bootstrap';
// import { filterInput, validateForm } from '../../helpers/utils';
// import { useFormik } from 'formik';
// import InputField from '../InputField/InputField';
// import TextareaField from '../TextareaField/TextareaField';
// import SelectField from '../SelectField/SelectField';

// interface FormModalProps {
//   columns: any[];
//   handleClose: () => void;
// }

// const FormModal: FC<FormModalProps> = ({ columns, handleClose }) => {
//   const validate = (values: any) => validateForm(values, columns);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const runLocalData = async () => {
//       // console.log({ columns });
//     };
//     runLocalData();
//   }, []);

//   const getInitValues = () => {
//     const result: any = {};
//     columns.forEach((column) => {
//       result[column.name] = '';
//     });
//     return result;
//   };
// console.log(getInitValues());

//   const formik = useFormik({
//     initialValues: getInitValues(),
//     validate,
//     onSubmit: (data) => {
//       console.log({ data });
//     },
//   });

//   console.log(formik.errors);



//   return (
//     <div className="FormModal">
//       <div>
//         <Modal size="lg" scrollable centered show={true} onHide={handleClose}>
//           <Modal.Body>
//             <form onSubmit={formik.handleSubmit}>
//               {columns?.map((column) => {
//                 let result: any = filterInput(column);

//                 return (
//                   <div key={index}>
//                     {result.input === 'input' && (
//                       <>
//                         <InputField
//                           defaultValue={formik.values[result.name]}
//                           onChange={formik.handleChange}
//                           type={result.type}
//                           name={result.name}
//                           className={result.className}
//                           placeholder={result.placeholder}
//                         />
//                         {formik.touched[result.name] && formik.errors[result.name] && (
//                           <div className="text-danger">{formik.errors[result.name] as any}</div>
//                         )}
//                       </>
//                     )}

//                     {result.input === 'textarea' && (
//                       <>
//                         <TextareaField
//                           value={formik.values[result.name]}
//                           onChange={formik.handleChange}
//                           name={result.name}
//                           className={result.className}
//                         />
//                         {formik.touched[result.name] && formik.errors[result.name] && (
//                           <div className="text-danger">{formik.errors[result.name] as any}</div>
//                         )}
//                       </>
//                     )}

//                     {result.input === 'select' && (
//                       <>
//                         <SelectField
//                           value={formik.values[result.name]}
//                           options={result.options}
//                           onChange={formik.handleChange}
//                           name={result.name}
//                           className={result.className}
//                         />
//                         {formik.touched[result.name] && formik.errors[result.name] && (
//                           <div className="text-danger">{formik.errors[result.name] as any}</div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 );
//               })}
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={(event: any)=>formik.handleSubmit(event)} type="submit" variant="success">
//               Save
//             </Button>
//             <Button variant="secondary" onClick={handleClose}>
//               Fermer
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default FormModal;




