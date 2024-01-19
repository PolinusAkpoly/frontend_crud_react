import React from 'react';
import { Formik, Field, Form } from 'formik';

const MyForm = () => {
  const handleSubmit = (values: any) => {
    // Gérer la soumission du formulaire ici
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ file: null }}
      onSubmit={handleSubmit}
    >
      <Form>
        <label htmlFor="file">Sélectionnez un fichier :</label>
        <Field type="file" id="file" name="file" />
      </Form>
    </Formik>
  );
};

export default MyForm;
