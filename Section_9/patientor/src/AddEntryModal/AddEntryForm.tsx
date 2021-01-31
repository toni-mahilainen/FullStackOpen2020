import React from 'react';
import * as yup from "yup";

import { Type, EntryFormValues, HealthCheckRating } from '../types';
import ChangingForm from './ChangingForm';

interface Props {
    type: string;
    onSubmit: (values: EntryFormValues) => void;
    onClose: () => void;
}

const AddEntryForm = ({ type, onSubmit, onClose }: Props) => {
    const baseinitialValues = {
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: []
    };

    const hospitalinitialValues: EntryFormValues = {
        ...baseinitialValues,
        type: Type.Hospital,
        discharge: {
            date: "",
            criteria: ""
        }
    };

    const occupationalHealthcareInitialValues: EntryFormValues = {
        ...baseinitialValues,
        type: Type.OccupationalHealthcare,
        employerName: '',
        sickLeave: {
            startDate: "",
            endDate: ""
        }
    };

    const healthCheckInitialValues: EntryFormValues = {
        ...baseinitialValues,
        type: Type.HealthCheck,
        healthCheckRating: HealthCheckRating['Healthy']
    };

    const baseSchema = yup.object().shape({
        description: yup.string().min(12).required(),
        date: yup
          .string()
          .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
          .required(),
        specialist: yup.string().min(6).required(),
        diagnosisCodes: yup.array().of(yup.string()),
      });
      
      const healthCheckSchema = baseSchema.concat(
        yup.object().shape({
          healthCheckRating: yup
            .number()
            .typeError("health check rating must be a number")
            .min(0)
            .max(3)
            .required("Please enter a rating from 0(great) - 3(critical)"),
        })
      );
      
      const occupationalHealthCareSchema = baseSchema.concat(
        yup.object().shape({
          employerName: yup.string().min(3).required(),
          sickLeave: yup.object().shape({
            startDate: yup
              .string()
              .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
            endDate: yup
              .string()
              .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
          }),
        })
      );
      
      const hospitalSchema = baseSchema.concat(
        yup.object().shape({
          discharge: yup
            .object({
              date: yup
                .string()
                .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
                .required("discharge date is a required field"),
              criteria: yup
                .string()
                .min(12)
                .required("discharge criteria is a required field"),
            })
            .required(),
        })
      );

    // const hospitalValidation = (values: EntryFormValues): object => {
    //     const hospitalEntryValues = values as HospitalEntryFormValues;
    //     const requiredError = "Field is required";
    //     const invalidDateError = "Invalid date format";
    //     const dateRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i;
    //     const errors = {
    //         type: '',
    //         date: '',
    //         description: '',
    //         specialist: '',
    //         discharge: {
    //             date: '',
    //             criteria: ''
    //         }
    //     };

    //     if (!hospitalEntryValues.date) {
    //         errors.date = requiredError;
    //     } else if (!dateRegex.test(values.date)) {
    //         errors.date = invalidDateError;
    //     }
    //     if (!hospitalEntryValues.description) {
    //         errors.description = requiredError;
    //     }
    //     if (!hospitalEntryValues.specialist) {
    //         errors.specialist = requiredError;
    //     }
    //     if (!hospitalEntryValues.discharge.date) {
    //         errors.discharge.date = requiredError;
    //     } else if (!dateRegex.test(hospitalEntryValues.discharge.date)) {
    //         errors.discharge.date = invalidDateError;
    //     }
    //     if (!hospitalEntryValues.discharge.criteria) {
    //         errors.discharge.criteria = requiredError;
    //     }

    //     return errors;
    // };

    // const occupationalHealthcareValidation = (values: EntryFormValues) => {
    //     const occupationalHealthcareEntryValues = values as OccupationalEntryFormValues;
    //     const requiredError = "Field is required";
    //     const invalidDateError = "Invalid date format";
    //     const dateRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i;
    //     const errors = {
    //         type: '',
    //         date: '',
    //         description: '',
    //         specialist: '',
    //         employerName: '',
    //         sickLeave: {
    //             startDate: "",
    //             endDate: ""
    //         }
    //     };

    //     if (!occupationalHealthcareEntryValues.date) {
    //         errors.date = requiredError;
    //     } else if (!dateRegex.test(occupationalHealthcareEntryValues.date)) {
    //         errors.date = invalidDateError;
    //     }
    //     if (!occupationalHealthcareEntryValues.description) {
    //         errors.description = requiredError;
    //     }
    //     if (!occupationalHealthcareEntryValues.specialist) {
    //         errors.specialist = requiredError;
    //     }
    //     if (!occupationalHealthcareEntryValues.employerName) {
    //         errors.employerName = requiredError;
    //     }
    //     if (!occupationalHealthcareEntryValues.sickLeave.startDate) {
    //         errors.sickLeave.startDate = requiredError;
    //     } else if (!dateRegex.test(occupationalHealthcareEntryValues.sickLeave.startDate)) {
    //         errors.sickLeave.startDate = invalidDateError;
    //     }
    //     if (!occupationalHealthcareEntryValues.sickLeave.endDate) {
    //         errors.sickLeave.endDate = requiredError;
    //     } else if (!dateRegex.test(occupationalHealthcareEntryValues.sickLeave.endDate)) {
    //         errors.sickLeave.endDate = invalidDateError;
    //     }
    //     return errors;
    // };

    // const healthCheckValidation = (values: EntryFormValues) => {
    //     const healthCheckEntryValues = values as HealthCheckEntryFormValues;
    //     const requiredError = "Field is required";
    //     const invalidDateError = "Invalid date format";
    //     const dateRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i;
    //     const errors = {
    //         type: '',
    //         date: '',
    //         description: '',
    //         specialist: '',
    //         healthCheckRating: ''
    //     };

    //     if (!healthCheckEntryValues.date) {
    //         errors.date = requiredError;
    //     } else if (!dateRegex.test(healthCheckEntryValues.date)) {
    //         errors.date = invalidDateError;
    //     }
    //     if (!healthCheckEntryValues.description) {
    //         errors.description = requiredError;
    //     }
    //     if (!healthCheckEntryValues.specialist) {
    //         errors.specialist = requiredError;
    //     }
    //     if (!healthCheckEntryValues.healthCheckRating) {
    //         errors.healthCheckRating = requiredError;
    //     }
    //     return errors;
    // };

    const entryForm = () => {
        switch (type) {
            case Type.Hospital:
                return (
                    <ChangingForm
                        initialValues={hospitalinitialValues}
                        onSubmit={onSubmit}
                        onClose={onClose}
                        validationSchema={hospitalSchema}
                    />
                );

            case Type.OccupationalHealthcare:
                return (
                    <ChangingForm
                        initialValues={occupationalHealthcareInitialValues}
                        onSubmit={onSubmit}
                        onClose={onClose}
                        validationSchema={occupationalHealthCareSchema}
                    />
                );

            case Type.HealthCheck:
                return (
                    <ChangingForm
                        initialValues={healthCheckInitialValues}
                        onSubmit={onSubmit}
                        onClose={onClose}
                        validationSchema={healthCheckSchema}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <>
            {entryForm()}
        </>
    );
};

export default AddEntryForm;