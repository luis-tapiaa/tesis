import { useEffect, useState } from 'react';

import _ from './validator';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const useForm = (initialValues, validate, onChangeForm) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (validate) {
      const errors = {};
      Object.keys(validate).forEach(val => {
        if (validate[val]) {
          if (validate[val].includes('req')) {
            errors[val] = _.isReq(values[val]);
          }
          if (validate[val].includes('money')) {
            errors[val] = _.isMoney(values[val]);
          }
          if (validate[val].includes('int')) {
            errors[val] = _.isInt(values[val]);
          }
        }
      });
      setErrors(errors);
    }
    // eslint-disable-next-line
  }, [values, touched]);

  const onChange = ({ target: { name, value, files } }) => {
    if (onChangeForm) onChangeForm(name, value, setValue);
    if (files?.length) {
      getBase64(files[0]).then(data => {
        setValue(name, data);
      });
    } else {
      setValue(name, value);
    }
  };

  const setValue = (name, value) => setValues(prev => ({ ...prev, [name]: value }));

  const onBlur = ({ target: { name } }) => setTouched({ ...touched, [name]: true });

  return { errors, touched, values, onChange, onBlur, setValue };
};
